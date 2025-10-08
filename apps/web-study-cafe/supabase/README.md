# Study Cafe App - Supabase Database

## Overview

This database schema supports the Study Cafe app MVP features based on the PRD at `apps-prd/study-cafe/prd.md`.

## Database Structure

### Core Tables

#### User Management
- **profiles** - User profile information (extends Supabase auth.users)
- **user_stats** - Cached statistics for performance (total hours, streaks, flame points)

#### Study Tracking
- **subjects** - Study subject categories (Math, English, Science, etc.)
- **study_sessions** - Individual study session records with timer data
- **study_rooms** - Virtual study rooms (max 10 participants)
- **study_room_participants** - User participation in study rooms with real-time status

#### Ranking System
- **daily_rankings** - Daily leaderboards
- **weekly_rankings** - Weekly leaderboards
- **monthly_rankings** - Monthly leaderboards
- **exam_rankings** - Rankings grouped by exam type (수능, TOEIC, etc.)

#### Community
- **community_posts** - User posts (achievements, tips, general content)
- **post_likes** - Post like interactions
- **post_comments** - Post comments
- **post_shares** - Post share tracking
- **friendships** - User friend connections

#### Achievements
- **achievement_definitions** - Available achievements and their requirements
- **user_achievements** - User's unlocked achievements

#### Store & Monetization
- **flame_transactions** - Flame point earning/spending history
- **premium_subscriptions** - Premium membership tracking
- **study_notes** - Marketplace for study materials
- **study_note_purchases** - User purchases of study notes
- **study_note_ratings** - Ratings and reviews for study notes
- **themes** - UI theme customization options
- **user_themes** - User's purchased/active themes

## Setup Instructions

### 1. Initialize Supabase Project

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project (or create new one)
supabase init
supabase link --project-ref your-project-ref
```

### 2. Apply Database Schema

```bash
# Run the schema migration
supabase db push

# Or apply via SQL editor in Supabase Dashboard
# Copy contents of schema.sql and run in SQL Editor
```

### 3. Configure Environment Variables

Create `.env.local` in the app root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Enable Realtime (Optional)

For live study room updates:

```sql
-- Enable realtime for specific tables
ALTER PUBLICATION supabase_realtime ADD TABLE study_room_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE community_posts;
```

## Key Features

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **Public Read**: Rankings, community posts, study rooms
- **User-Scoped**: Study sessions, stats, transactions (users can only access their own)
- **Creator-Only**: Study room management, study notes management

### Automatic Triggers

1. **updated_at** - Auto-updates timestamp on record changes
2. **calculate_session_duration** - Calculates study duration when session ends
3. **update_post_*_count** - Updates like/comment/share counts on posts
4. **award_flame_points** - Awards points when study session completes (1 point per 10 min)
5. **update_study_note_rating** - Recalculates average rating on new review

### Performance Optimizations

- **Indexes** on frequently queried columns (user_id, dates, status)
- **Composite Indexes** for common query patterns
- **Materialized Views** for leaderboards (consider refresh strategy)
- **Cached Stats** in user_stats table

## Common Queries

### Get User Profile with Stats

```sql
SELECT * FROM user_study_summary WHERE user_id = 'user-uuid';
```

### Get Daily Leaderboard

```sql
SELECT *
FROM leaderboard_view
WHERE date = CURRENT_DATE
ORDER BY rank
LIMIT 50;
```

### Get User's Study Sessions Today

```sql
SELECT
  ss.*,
  s.name as subject_name
FROM study_sessions ss
LEFT JOIN subjects s ON ss.subject_id = s.id
WHERE ss.user_id = 'user-uuid'
  AND DATE(ss.start_time) = CURRENT_DATE
ORDER BY ss.start_time DESC;
```

### Get Active Study Rooms

```sql
SELECT
  sr.*,
  p.username as creator_name,
  COUNT(srp.id) as participant_count
FROM study_rooms sr
JOIN profiles p ON sr.creator_id = p.id
LEFT JOIN study_room_participants srp ON sr.id = srp.room_id
  AND srp.left_at IS NULL
WHERE sr.status = 'active'
GROUP BY sr.id, p.username
HAVING COUNT(srp.id) < sr.max_participants
ORDER BY sr.created_at DESC;
```

### Get Community Feed

```sql
SELECT
  cp.*,
  p.username,
  p.display_name,
  p.avatar_url,
  EXISTS(
    SELECT 1 FROM post_likes pl
    WHERE pl.post_id = cp.id AND pl.user_id = 'current-user-uuid'
  ) as user_has_liked
FROM community_posts cp
JOIN profiles p ON cp.user_id = p.id
WHERE cp.post_type = 'all' OR cp.post_type = 'achievement'
ORDER BY cp.created_at DESC
LIMIT 20;
```

## Flame Points System

Users earn flame points through:
- **Study Sessions**: 1 point per 10 minutes of study
- **Achievements**: Variable points based on achievement
- **Daily Bonuses**: Streaks and milestones

Users can spend flame points on:
- Study notes from marketplace
- UI themes
- Premium features

## Migration Strategy

### Phase 1: MVP (Current)
- Core tables for P0 features
- Basic RLS policies
- Essential triggers and functions

### Phase 2: P1 Features
- Enhanced friendships
- Advanced achievements
- Photo uploads for posts

### Phase 3: P2 Features (Future)
- AI summarization tables
- Meme generator
- Location-based features (PostGIS)
- Wear OS sync
- Advanced analytics events

## Backup and Maintenance

### Regular Backups

```bash
# Backup database
supabase db dump -f backup.sql

# Restore database
supabase db reset
psql $DATABASE_URL < backup.sql
```

### Ranking Refresh Jobs

Set up cron jobs or edge functions to:

1. **Daily Rankings** - Recalculate at midnight
2. **Weekly Rankings** - Recalculate every Monday
3. **Monthly Rankings** - Recalculate on 1st of month
4. **Streak Updates** - Check and update daily

Example Edge Function (Deno):

```typescript
// supabase/functions/update-rankings/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  // Calculate daily rankings
  await supabase.rpc('calculate_daily_rankings')

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  })
})
```

## Security Notes

1. **Never expose service role key** in client-side code
2. **Validate file uploads** for study notes and images
3. **Rate limit** API endpoints (Supabase Edge Functions)
4. **Content moderation** for community posts
5. **Secure payment processing** for premium features

## Troubleshooting

### RLS Issues
If queries fail with permission errors, check:
- User is authenticated (`auth.uid()` returns value)
- RLS policies match your query pattern
- Use service role key for admin operations

### Performance Issues
- Add indexes for slow queries
- Use `EXPLAIN ANALYZE` to debug query plans
- Consider materialized views for complex aggregations
- Implement caching layer (Redis/Upstash)

### Migration Conflicts
- Always backup before migrations
- Test migrations in staging environment
- Use Supabase migration versioning

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime Documentation](https://supabase.com/docs/guides/realtime)
