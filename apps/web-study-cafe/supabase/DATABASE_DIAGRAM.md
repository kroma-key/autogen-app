# Study Cafe Database Schema Diagram

## Entity Relationship Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          USER & PROFILE DOMAIN                               │
└─────────────────────────────────────────────────────────────────────────────┘

    auth.users (Supabase Auth)
         │
         ├──> profiles
         │         ├──> user_stats (1:1)
         │         ├──> study_sessions (1:N)
         │         ├──> study_rooms (creator, 1:N)
         │         ├──> study_room_participants (1:N)
         │         ├──> community_posts (1:N)
         │         ├──> post_likes (1:N)
         │         ├──> post_comments (1:N)
         │         ├──> friendships (1:N)
         │         ├──> user_achievements (1:N)
         │         ├──> flame_transactions (1:N)
         │         ├──> premium_subscriptions (1:N)
         │         ├──> study_notes (creator, 1:N)
         │         ├──> study_note_purchases (1:N)
         │         └──> user_themes (1:N)

┌─────────────────────────────────────────────────────────────────────────────┐
│                          STUDY TRACKING DOMAIN                               │
└─────────────────────────────────────────────────────────────────────────────┘

    subjects
         ├──> study_sessions (N:1)
         └──> study_notes (N:1)

    study_sessions
         ├──> profiles (N:1)
         ├──> subjects (N:1)
         ├──> study_rooms (N:1)
         └──> flame_transactions (1:N via trigger)

    study_rooms
         ├──> profiles (creator, N:1)
         └──> study_room_participants (1:N)
              └──> profiles (N:1)

┌─────────────────────────────────────────────────────────────────────────────┐
│                          RANKING DOMAIN                                      │
└─────────────────────────────────────────────────────────────────────────────┘

    daily_rankings ──> profiles (N:1)
    weekly_rankings ──> profiles (N:1)
    monthly_rankings ──> profiles (N:1)
    exam_rankings ──> profiles (N:1)

    VIEW: leaderboard_view
          ├─ daily_rankings
          └─ profiles

┌─────────────────────────────────────────────────────────────────────────────┐
│                          COMMUNITY DOMAIN                                    │
└─────────────────────────────────────────────────────────────────────────────┘

    community_posts
         ├──> profiles (N:1)
         ├──> post_likes (1:N)
         │         └──> profiles (N:1)
         ├──> post_comments (1:N)
         │         └──> profiles (N:1)
         └──> post_shares (1:N)
                   └──> profiles (N:1)

    friendships
         ├──> profiles (user_id, N:1)
         └──> profiles (friend_id, N:1)

┌─────────────────────────────────────────────────────────────────────────────┐
│                          ACHIEVEMENTS DOMAIN                                 │
└─────────────────────────────────────────────────────────────────────────────┘

    achievement_definitions
         └──> user_achievements (1:N)
                   └──> profiles (N:1)

┌─────────────────────────────────────────────────────────────────────────────┐
│                          STORE & MONETIZATION DOMAIN                         │
└─────────────────────────────────────────────────────────────────────────────┘

    flame_transactions ──> profiles (N:1)

    premium_subscriptions ──> profiles (N:1)

    study_notes
         ├──> profiles (creator, N:1)
         ├──> subjects (N:1)
         ├──> study_note_purchases (1:N)
         │         └──> profiles (N:1)
         └──> study_note_ratings (1:N)
                   └──> profiles (N:1)

    themes
         └──> user_themes (1:N)
                   └──> profiles (N:1)
```

## Detailed Table Relationships

### Core Tables

#### profiles
- **Primary Key**: `id` (UUID, references auth.users)
- **Relationships**:
  - Has one `user_stats`
  - Has many `study_sessions`
  - Has many `study_rooms` (as creator)
  - Has many `community_posts`
  - Has many `user_achievements`
  - Has many `flame_transactions`

#### user_stats
- **Primary Key**: `user_id` (UUID)
- **Foreign Keys**:
  - `user_id` → `profiles.id`

### Study Domain

#### subjects
- **Primary Key**: `id` (UUID)
- **Relationships**:
  - Has many `study_sessions`
  - Has many `study_notes`

#### study_sessions
- **Primary Key**: `id` (UUID)
- **Foreign Keys**:
  - `user_id` → `profiles.id`
  - `subject_id` → `subjects.id`
  - `study_room_id` → `study_rooms.id`
- **Triggers**:
  - Auto-calculates `duration_minutes` on completion
  - Awards flame points on completion

#### study_rooms
- **Primary Key**: `id` (UUID)
- **Foreign Keys**:
  - `creator_id` → `profiles.id`
- **Relationships**:
  - Has many `study_room_participants`
  - Has many `study_sessions`

#### study_room_participants
- **Primary Key**: `id` (UUID)
- **Foreign Keys**:
  - `room_id` → `study_rooms.id`
  - `user_id` → `profiles.id`
- **Unique Constraint**: `(room_id, user_id, left_at)`

### Ranking Domain

#### daily_rankings / weekly_rankings / monthly_rankings
- **Primary Key**: `id` (UUID)
- **Foreign Keys**:
  - `user_id` → `profiles.id`
- **Unique Constraints**:
  - `daily_rankings`: `(user_id, date)`
  - `weekly_rankings`: `(user_id, week_start_date)`
  - `monthly_rankings`: `(user_id, year, month)`

### Community Domain

#### community_posts
- **Primary Key**: `id` (UUID)
- **Foreign Keys**:
  - `user_id` → `profiles.id`
- **Relationships**:
  - Has many `post_likes`
  - Has many `post_comments`
  - Has many `post_shares`
- **Triggers**:
  - Auto-updates counts on like/comment/share

#### post_likes / post_comments / post_shares
- **Primary Key**: `id` (UUID)
- **Foreign Keys**:
  - `post_id` → `community_posts.id`
  - `user_id` → `profiles.id`
- **Unique Constraints**:
  - `post_likes`: `(post_id, user_id)`
  - `post_shares`: `(post_id, user_id)`

### Store Domain

#### study_notes
- **Primary Key**: `id` (UUID)
- **Foreign Keys**:
  - `creator_id` → `profiles.id`
  - `subject_id` → `subjects.id`
- **Relationships**:
  - Has many `study_note_purchases`
  - Has many `study_note_ratings`
- **Triggers**:
  - Auto-updates `rating` on new review
  - Auto-increments `sales_count` on purchase

#### themes
- **Primary Key**: `id` (UUID)
- **Relationships**:
  - Has many `user_themes`

## Key Indexes

### Performance-Critical Indexes

```sql
-- Study Sessions
idx_study_sessions_user_date (user_id, start_time DESC)
idx_study_sessions_status (status)

-- Community Posts
idx_community_posts_type_date (post_type, created_at DESC)

-- Rankings
idx_daily_rankings_date (date)
idx_daily_rankings_rank (rank)

-- Transactions
idx_flame_transactions_user_date (user_id, created_at DESC)

-- Study Notes
idx_study_notes_subject_rating (subject_id, rating DESC)
```

## Views

### leaderboard_view
Joins `daily_rankings` with `profiles` to provide complete leaderboard data with user info.

```sql
SELECT rank, date, study_minutes, user_id, username, display_name, avatar_url, location
FROM daily_rankings dr
JOIN profiles p ON dr.user_id = p.id
ORDER BY dr.date DESC, dr.rank ASC
```

### user_study_summary
Aggregates user study statistics with achievements count and current ranking.

```sql
SELECT
  user_id, username, total_study_minutes, current_streak_days,
  flame_points, achievements_count, current_daily_rank
FROM profiles p
LEFT JOIN user_stats us ON p.id = us.user_id
LEFT JOIN user_achievements ua ON p.id = ua.user_id
LEFT JOIN daily_rankings dr ON p.id = dr.user_id AND dr.date = CURRENT_DATE
GROUP BY ...
```

## Data Flow Examples

### Study Session Flow
```
1. User starts timer
   └─> INSERT INTO study_sessions (status='in_progress')

2. User stops timer
   └─> UPDATE study_sessions SET status='completed', end_time=NOW()
       ├─> TRIGGER: calculate_session_duration()
       │   └─> Sets duration_minutes
       └─> TRIGGER: award_flame_points_for_session()
           ├─> INSERT INTO flame_transactions
           └─> UPDATE user_stats SET flame_points += earned
```

### Community Post Interaction Flow
```
1. User likes a post
   └─> INSERT INTO post_likes (post_id, user_id)
       └─> TRIGGER: update_post_likes_count()
           └─> UPDATE community_posts SET likes_count += 1

2. User unlikes a post
   └─> DELETE FROM post_likes WHERE post_id AND user_id
       └─> TRIGGER: update_post_likes_count()
           └─> UPDATE community_posts SET likes_count -= 1
```

### Ranking Calculation Flow (Scheduled Job)
```
Daily (00:00 KST):
1. Calculate total study minutes per user for yesterday
2. INSERT INTO daily_rankings (user_id, date, study_minutes)
3. Calculate ranks based on study_minutes DESC
4. UPDATE daily_rankings SET rank = calculated_rank

Weekly (Monday 00:00 KST):
1. Calculate total study minutes per user for last week
2. INSERT INTO weekly_rankings (user_id, week_start_date, study_minutes)
3. Calculate ranks
4. UPDATE weekly_rankings SET rank = calculated_rank
```

## Security Model

### Row Level Security (RLS)

#### Public Read Tables
- `profiles` (SELECT)
- `subjects` (SELECT)
- `daily_rankings` (SELECT)
- `weekly_rankings` (SELECT)
- `monthly_rankings` (SELECT)
- `exam_rankings` (SELECT)
- `community_posts` (SELECT)
- `post_likes` (SELECT)
- `study_notes` (SELECT WHERE status='active')
- `achievement_definitions` (SELECT)

#### User-Scoped Tables (Own Data Only)
- `user_stats` (SELECT, UPDATE)
- `study_sessions` (SELECT, INSERT, UPDATE)
- `flame_transactions` (SELECT)
- `premium_subscriptions` (SELECT)
- `user_achievements` (SELECT)
- `user_themes` (SELECT, INSERT, UPDATE)

#### Creator-Scoped Tables
- `study_rooms` (SELECT public, UPDATE own)
- `community_posts` (INSERT, UPDATE own, DELETE own)
- `study_notes` (INSERT, UPDATE own)

## Backup & Maintenance

### Regular Tasks

1. **Daily** (Automated):
   - Calculate and update daily rankings
   - Update user streaks
   - Clean up expired sessions

2. **Weekly** (Automated):
   - Calculate weekly rankings
   - Generate weekly reports

3. **Monthly** (Automated):
   - Calculate monthly rankings
   - Archive old data
   - Database vacuum/analyze

4. **On-Demand** (Manual):
   - Backup database
   - Restore from backup
   - Data migration

## Future Enhancements (P2)

Planned tables for future features:

- `ai_summaries` - AI-generated study summaries
- `meme_templates` - Meme generator templates
- `user_memes` - User-generated memes
- `locations` - Location-based features (PostGIS)
- `device_sync` - Wear OS synchronization
- `analytics_events` - Detailed analytics tracking
- `content_moderation` - Auto-moderation logs
