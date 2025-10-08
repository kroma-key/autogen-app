# Study Cafe App - Supabase Setup Guide

Quick guide to set up the Supabase database for the Study Cafe app.

## Prerequisites

- Node.js 18+ installed
- Supabase account ([sign up](https://supabase.com))
- Supabase CLI installed: `npm install -g supabase`

## Step-by-Step Setup

### 1. Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in project details:
   - Name: `study-cafe-app`
   - Database Password: (save this securely)
   - Region: Choose closest to your users (e.g., Seoul for Korean users)
4. Wait for project to initialize (~2 minutes)

### 2. Get API Keys

1. In your project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhb...`
   - **service_role key**: `eyJhb...` (keep this secret!)

### 3. Configure Environment Variables

```bash
cd apps/web-study-cafe

# Copy example env file
cp .env.example .env.local

# Edit .env.local and add your keys
```

Update `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 4. Apply Database Schema

#### Option A: Using SQL Editor (Recommended for first-time setup)

1. Go to **SQL Editor** in Supabase Dashboard
2. Click **New Query**
3. Copy entire contents of `supabase/schema.sql`
4. Paste into SQL Editor
5. Click **Run** (bottom right)
6. Wait for success message (~30 seconds)

#### Option B: Using Supabase CLI

```bash
# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Apply migration
supabase db push

# Or directly run the schema
psql $DATABASE_URL < supabase/schema.sql
```

### 5. Verify Installation

#### Check Tables Created

1. Go to **Table Editor** in Supabase Dashboard
2. You should see tables like:
   - profiles
   - user_stats
   - study_sessions
   - subjects
   - community_posts
   - etc.

#### Run Test Query

In SQL Editor, run:
```sql
SELECT * FROM subjects;
```

You should see 6 default subjects (math, english, science, history, korean, other).

### 6. Enable Realtime (Optional but Recommended)

For live updates in study rooms:

```sql
ALTER PUBLICATION supabase_realtime ADD TABLE study_room_participants;
ALTER PUBLICATION supabase_realtime ADD TABLE community_posts;
```

### 7. Test Connection from App

Create a test page or component:

```typescript
import { createClient } from '@/lib/supabase/client'

export default async function TestPage() {
  const supabase = createClient()
  const { data, error } = await supabase.from('subjects').select('*')

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Subjects</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
```

## Common Issues & Solutions

### Issue: "relation does not exist" error

**Solution**: Schema not applied correctly. Re-run the schema SQL in SQL Editor.

### Issue: RLS policy prevents access

**Solution**:
1. Check if user is authenticated
2. Verify RLS policies match your use case
3. For testing, temporarily disable RLS:
   ```sql
   ALTER TABLE your_table DISABLE ROW LEVEL SECURITY;
   ```
   (Re-enable after testing!)

### Issue: Migration fails with foreign key constraint

**Solution**: Tables must be created in correct order. Use the provided `schema.sql` or `migrations/001_initial_schema.sql` which has correct ordering.

### Issue: "permission denied for schema public"

**Solution**: Ensure you're using the correct database credentials. Service role key may be needed for certain operations.

## Next Steps

### Set Up Authentication

1. Go to **Authentication** in Supabase Dashboard
2. Enable providers (Email, OAuth, etc.)
3. Configure email templates
4. Add auth UI to your app:
   ```bash
   npm install @supabase/auth-ui-react @supabase/auth-ui-shared
   ```

### Set Up Storage

For user avatars, study notes, images:

1. Go to **Storage** in Supabase Dashboard
2. Create buckets:
   - `avatars` (public)
   - `study-notes` (private)
   - `post-images` (public)
3. Configure policies for each bucket

### Set Up Edge Functions

For scheduled tasks (ranking updates, streak calculations):

```bash
# Create edge function
supabase functions new update-rankings

# Deploy function
supabase functions deploy update-rankings

# Set up cron job in Supabase Dashboard
```

### Set Up Database Functions for Rankings

Create scheduled jobs to calculate rankings:

```sql
-- Function to calculate daily rankings
CREATE OR REPLACE FUNCTION calculate_daily_rankings(target_date DATE DEFAULT CURRENT_DATE - INTERVAL '1 day')
RETURNS void AS $$
BEGIN
  -- Clear existing rankings for the date
  DELETE FROM daily_rankings WHERE date = target_date;

  -- Calculate and insert new rankings
  WITH daily_totals AS (
    SELECT
      user_id,
      target_date as date,
      SUM(duration_minutes) as study_minutes
    FROM study_sessions
    WHERE DATE(start_time) = target_date
      AND status = 'completed'
    GROUP BY user_id
  ),
  ranked_users AS (
    SELECT
      user_id,
      date,
      study_minutes,
      ROW_NUMBER() OVER (ORDER BY study_minutes DESC) as rank
    FROM daily_totals
  )
  INSERT INTO daily_rankings (user_id, date, study_minutes, rank)
  SELECT user_id, date, study_minutes, rank
  FROM ranked_users;

  -- Update user_stats
  UPDATE user_stats us
  SET
    total_study_minutes = (
      SELECT COALESCE(SUM(duration_minutes), 0)
      FROM study_sessions
      WHERE user_id = us.user_id AND status = 'completed'
    ),
    last_study_date = target_date
  WHERE user_id IN (SELECT user_id FROM daily_totals);
END;
$$ LANGUAGE plpgsql;

-- Schedule via pg_cron or Edge Function
-- Run daily at midnight KST
```

### Monitor Performance

1. Go to **Reports** in Supabase Dashboard
2. Monitor:
   - API usage
   - Database size
   - Query performance
   - Active connections

### Backup Strategy

1. **Automatic backups** (Pro plan):
   - Supabase handles daily backups
   - 7-day retention

2. **Manual backups**:
   ```bash
   # Dump database
   supabase db dump -f backup-$(date +%Y%m%d).sql

   # Restore from backup
   psql $DATABASE_URL < backup-20251009.sql
   ```

3. **Point-in-time recovery** (Pro plan):
   - Available in Supabase Dashboard
   - Can restore to any point in last 7 days

## Production Checklist

Before going live:

- [ ] All environment variables configured in production
- [ ] RLS policies tested and verified
- [ ] Indexes created for all frequently queried columns
- [ ] Edge functions deployed for background tasks
- [ ] Storage buckets created with proper policies
- [ ] Authentication providers configured
- [ ] Email templates customized
- [ ] Database backups scheduled
- [ ] Monitoring and alerts set up
- [ ] Rate limiting configured (Supabase middleware)
- [ ] Content moderation strategy in place
- [ ] GDPR/data privacy compliance verified

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security Deep Dive](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli/introduction)
- [Database Functions](https://supabase.com/docs/guides/database/functions)

## Getting Help

- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/supabase)

---

**Note**: This guide assumes you're using the Next.js App Router with TypeScript. Adjust paths and imports as needed for your setup.
