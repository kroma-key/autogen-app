-- Study Cafe App - Supabase Database Schema
-- Based on PRD: apps-prd/study-cafe/prd.md
-- MVP Version with P0 and P1 features

-- Enable pgcrypto extension for gen_random_uuid() - available in PostgreSQL 13+
-- This is preferred over uuid-ossp for modern PostgreSQL
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- USERS & PROFILES
-- ============================================================================

-- User profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  location VARCHAR(100),
  exam_target VARCHAR(100), -- e.g., "수능", "TOEIC", "공무원"
  target_date DATE, -- D-day calculation
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User statistics (cached data for performance)
CREATE TABLE user_stats (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  total_study_minutes INTEGER DEFAULT 0,
  current_streak_days INTEGER DEFAULT 0,
  longest_streak_days INTEGER DEFAULT 0,
  flame_points INTEGER DEFAULT 0,
  premium_until TIMESTAMPTZ,
  last_study_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- STUDY SESSIONS & TIMER
-- ============================================================================

-- Subjects for categorization
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  color VARCHAR(20),
  icon VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Study sessions (timer records)
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration_minutes INTEGER, -- calculated on end
  status VARCHAR(20) DEFAULT 'in_progress', -- 'in_progress', 'completed', 'cancelled'
  study_room_id UUID REFERENCES study_rooms(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Indexes for performance
  INDEX idx_study_sessions_user_id (user_id),
  INDEX idx_study_sessions_start_time (start_time),
  INDEX idx_study_sessions_status (status)
);

-- ============================================================================
-- STUDY ROOMS (P0 - Basic Study Room)
-- ============================================================================

CREATE TABLE study_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  max_participants INTEGER DEFAULT 10,
  is_public BOOLEAN DEFAULT true,
  password_hash TEXT, -- for private rooms
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'closed'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  INDEX idx_study_rooms_status (status),
  INDEX idx_study_rooms_creator (creator_id)
);

-- Study room participants
CREATE TABLE study_room_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ,
  current_status VARCHAR(20) DEFAULT 'idle', -- 'studying', 'short-break', 'long-break', 'idle'
  current_subject VARCHAR(100),
  current_study_time_minutes INTEGER DEFAULT 0,

  UNIQUE (room_id, user_id, left_at),
  INDEX idx_room_participants_room (room_id),
  INDEX idx_room_participants_user (user_id)
);

-- ============================================================================
-- RANKING SYSTEM (P0)
-- ============================================================================

-- Daily rankings (materialized for performance)
CREATE TABLE daily_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  study_minutes INTEGER NOT NULL,
  rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (user_id, date),
  INDEX idx_daily_rankings_date (date),
  INDEX idx_daily_rankings_rank (rank)
);

-- Weekly rankings
CREATE TABLE weekly_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  study_minutes INTEGER NOT NULL,
  rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (user_id, week_start_date),
  INDEX idx_weekly_rankings_week (week_start_date),
  INDEX idx_weekly_rankings_rank (rank)
);

-- Monthly rankings
CREATE TABLE monthly_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  study_minutes INTEGER NOT NULL,
  rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (user_id, year, month),
  INDEX idx_monthly_rankings_year_month (year, month),
  INDEX idx_monthly_rankings_rank (rank)
);

-- Exam-based rankings
CREATE TABLE exam_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_type VARCHAR(100) NOT NULL, -- e.g., "수능", "TOEIC"
  study_minutes INTEGER NOT NULL,
  rank INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (user_id, exam_type),
  INDEX idx_exam_rankings_exam_type (exam_type),
  INDEX idx_exam_rankings_rank (rank)
);

-- ============================================================================
-- COMMUNITY FEATURES (P0 - Basic Feed)
-- ============================================================================

CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  post_type VARCHAR(20) DEFAULT 'general', -- 'general', 'achievement', 'tip', 'meme'
  image_urls TEXT[], -- array of image URLs
  badge_type VARCHAR(50), -- achievement badge earned
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  INDEX idx_community_posts_user (user_id),
  INDEX idx_community_posts_type (post_type),
  INDEX idx_community_posts_created (created_at DESC)
);

-- Post interactions
CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (post_id, user_id),
  INDEX idx_post_likes_post (post_id),
  INDEX idx_post_likes_user (user_id)
);

CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  INDEX idx_post_comments_post (post_id),
  INDEX idx_post_comments_user (user_id)
);

CREATE TABLE post_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (post_id, user_id),
  INDEX idx_post_shares_post (post_id)
);

-- ============================================================================
-- FRIENDSHIPS (P1)
-- ============================================================================

CREATE TABLE friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'accepted', 'blocked'
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,

  UNIQUE (user_id, friend_id),
  CHECK (user_id != friend_id),
  INDEX idx_friendships_user (user_id),
  INDEX idx_friendships_friend (friend_id),
  INDEX idx_friendships_status (status)
);

-- ============================================================================
-- ACHIEVEMENTS (P1)
-- ============================================================================

CREATE TABLE achievement_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  badge_color VARCHAR(20),
  requirement_type VARCHAR(50), -- 'total_hours', 'streak', 'ranking', 'study_count'
  requirement_value INTEGER,
  flame_points_reward INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievement_definitions(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (user_id, achievement_id),
  INDEX idx_user_achievements_user (user_id),
  INDEX idx_user_achievements_unlocked (unlocked_at DESC)
);

-- ============================================================================
-- STORE & MONETIZATION (P0 - Basic Store)
-- ============================================================================

-- Flame point transactions
CREATE TABLE flame_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- positive for earned, negative for spent
  transaction_type VARCHAR(50) NOT NULL, -- 'study_reward', 'purchase', 'package_buy', 'achievement'
  reference_id UUID, -- reference to study session, purchase, etc.
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  INDEX idx_flame_transactions_user (user_id),
  INDEX idx_flame_transactions_created (created_at DESC)
);

-- Premium subscriptions
CREATE TABLE premium_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan_type VARCHAR(50) NOT NULL, -- 'monthly', 'yearly'
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  INDEX idx_premium_subs_user (user_id),
  INDEX idx_premium_subs_status (status)
);

-- Study notes marketplace
CREATE TABLE study_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  cover_image_url TEXT,
  file_url TEXT,
  preview_url TEXT,
  price_krw INTEGER,
  price_flame_points INTEGER,
  rating DECIMAL(2,1) DEFAULT 0.0,
  sales_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'pending_review'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  INDEX idx_study_notes_creator (creator_id),
  INDEX idx_study_notes_subject (subject_id),
  INDEX idx_study_notes_rating (rating DESC),
  INDEX idx_study_notes_sales (sales_count DESC)
);

-- Study note purchases
CREATE TABLE study_note_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  note_id UUID NOT NULL REFERENCES study_notes(id) ON DELETE CASCADE,
  payment_method VARCHAR(20), -- 'cash', 'flame_points'
  amount_paid INTEGER,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (user_id, note_id),
  INDEX idx_note_purchases_user (user_id),
  INDEX idx_note_purchases_note (note_id)
);

-- Study note ratings
CREATE TABLE study_note_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  note_id UUID NOT NULL REFERENCES study_notes(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (user_id, note_id),
  INDEX idx_note_ratings_note (note_id)
);

-- Themes for customization
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  css_variables JSONB, -- color scheme definitions
  price_krw INTEGER,
  price_flame_points INTEGER,
  is_premium_only BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User theme purchases
CREATE TABLE user_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  theme_id UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT false,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE (user_id, theme_id),
  INDEX idx_user_themes_user (user_id)
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_room_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE flame_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_note_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_themes ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all, but only update their own
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- User Stats: Users can only see and update their own
CREATE POLICY "Users can view own stats"
  ON user_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON user_stats FOR UPDATE
  USING (auth.uid() = user_id);

-- Study Sessions: Users can only see and manage their own
CREATE POLICY "Users can view own sessions"
  ON study_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON study_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON study_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Study Rooms: Public rooms viewable by all, users can create
CREATE POLICY "Public study rooms are viewable by everyone"
  ON study_rooms FOR SELECT
  USING (is_public = true OR auth.uid() = creator_id);

CREATE POLICY "Users can create study rooms"
  ON study_rooms FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their rooms"
  ON study_rooms FOR UPDATE
  USING (auth.uid() = creator_id);

-- Community Posts: All can read, users can manage their own
CREATE POLICY "Community posts are viewable by everyone"
  ON community_posts FOR SELECT
  USING (true);

CREATE POLICY "Users can create posts"
  ON community_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON community_posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON community_posts FOR DELETE
  USING (auth.uid() = user_id);

-- Post Likes: Users can manage their own
CREATE POLICY "Anyone can view likes"
  ON post_likes FOR SELECT
  USING (true);

CREATE POLICY "Users can like posts"
  ON post_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts"
  ON post_likes FOR DELETE
  USING (auth.uid() = user_id);

-- Rankings: All rankings are public
CREATE POLICY "Daily rankings are viewable by everyone"
  ON daily_rankings FOR SELECT
  USING (true);

CREATE POLICY "Weekly rankings are viewable by everyone"
  ON weekly_rankings FOR SELECT
  USING (true);

CREATE POLICY "Monthly rankings are viewable by everyone"
  ON monthly_rankings FOR SELECT
  USING (true);

CREATE POLICY "Exam rankings are viewable by everyone"
  ON exam_rankings FOR SELECT
  USING (true);

-- Study Notes: Public marketplace
CREATE POLICY "Study notes are viewable by everyone"
  ON study_notes FOR SELECT
  USING (status = 'active');

CREATE POLICY "Users can create study notes"
  ON study_notes FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their notes"
  ON study_notes FOR UPDATE
  USING (auth.uid() = creator_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_sessions_updated_at BEFORE UPDATE ON study_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_rooms_updated_at BEFORE UPDATE ON study_rooms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON community_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_study_notes_updated_at BEFORE UPDATE ON study_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function: Calculate study session duration on completion
CREATE OR REPLACE FUNCTION calculate_session_duration()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND NEW.end_time IS NOT NULL THEN
    NEW.duration_minutes = EXTRACT(EPOCH FROM (NEW.end_time - NEW.start_time)) / 60;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_study_session_duration BEFORE UPDATE ON study_sessions
  FOR EACH ROW EXECUTE FUNCTION calculate_session_duration();

-- Function: Update post interaction counts
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_likes_count AFTER INSERT OR DELETE ON post_likes
  FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();

CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_comments_count AFTER INSERT OR DELETE ON post_comments
  FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();

CREATE OR REPLACE FUNCTION update_post_shares_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts SET shares_count = shares_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts SET shares_count = shares_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_shares_count AFTER INSERT OR DELETE ON post_shares
  FOR EACH ROW EXECUTE FUNCTION update_post_shares_count();

-- Function: Update study note rating on new rating
CREATE OR REPLACE FUNCTION update_study_note_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE study_notes
  SET rating = (
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM study_note_ratings
    WHERE note_id = NEW.note_id
  )
  WHERE id = NEW.note_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_note_rating AFTER INSERT OR UPDATE ON study_note_ratings
  FOR EACH ROW EXECUTE FUNCTION update_study_note_rating();

-- Function: Update study note sales count on purchase
CREATE OR REPLACE FUNCTION update_study_note_sales()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE study_notes
  SET sales_count = sales_count + 1
  WHERE id = NEW.note_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_note_sales AFTER INSERT ON study_note_purchases
  FOR EACH ROW EXECUTE FUNCTION update_study_note_sales();

-- Function: Award flame points for completed study sessions
CREATE OR REPLACE FUNCTION award_flame_points_for_session()
RETURNS TRIGGER AS $$
DECLARE
  points_earned INTEGER;
BEGIN
  IF NEW.status = 'completed' AND NEW.duration_minutes IS NOT NULL THEN
    -- Award 1 point per 10 minutes of study
    points_earned = FLOOR(NEW.duration_minutes / 10);

    IF points_earned > 0 THEN
      INSERT INTO flame_transactions (user_id, amount, transaction_type, reference_id, description)
      VALUES (NEW.user_id, points_earned, 'study_reward', NEW.id,
              'Earned from ' || NEW.duration_minutes || ' minutes of study');

      UPDATE user_stats
      SET flame_points = flame_points + points_earned
      WHERE user_id = NEW.user_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_flame_points AFTER UPDATE ON study_sessions
  FOR EACH ROW EXECUTE FUNCTION award_flame_points_for_session();

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Insert default subjects
INSERT INTO subjects (name, color, icon) VALUES
  ('math', '#FF6B6B', '🧮'),
  ('english', '#4ECDC4', '📚'),
  ('science', '#95E1D3', '🔬'),
  ('history', '#F38181', '📜'),
  ('korean', '#AA96DA', '📖'),
  ('other', '#FCBAD3', '✏️');

-- Insert default achievement definitions
INSERT INTO achievement_definitions (name, description, icon, badge_color, requirement_type, requirement_value, flame_points_reward) VALUES
  ('First Study', 'Complete your first study session', '🌱', 'green', 'study_count', 1, 10),
  ('Natural Color', 'Study for 10 hours total', '🌿', 'green', 'total_hours', 10, 20),
  ('True Love', 'Study for 50 hours total', '💚', 'green', 'total_hours', 50, 50),
  ('Mineral Natural', 'Study for 100 hours total', '💎', 'blue', 'total_hours', 100, 100),
  ('Safe Safe', 'Maintain a 7-day streak', '🛡️', 'blue', 'streak', 7, 30),
  ('Night Owl', 'Study after midnight 5 times', '🦉', 'purple', 'study_count', 5, 25),
  ('Early Bird', 'Study before 6 AM 5 times', '🐦', 'yellow', 'study_count', 5, 25),
  ('Marathon', 'Study for 8 hours in one day', '🏃', 'red', 'daily_hours', 8, 40),
  ('Scholar', 'Reach top 10 in weekly ranking', '🎓', 'gold', 'ranking', 10, 50);

-- Insert default themes
INSERT INTO themes (name, description, preview_image_url, price_krw, price_flame_points, is_premium_only) VALUES
  ('Sunset Vibes', 'Warm orange gradients', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 5000, 20, false),
  ('Ocean Breeze', 'Cool blue tones', 'https://images.unsplash.com/photo-1439066615861-d1af74d74000', 5000, 20, false),
  ('Forest Green', 'Natural green shades', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', 5000, 20, false),
  ('Midnight Dark', 'Dark mode theme', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 7000, 25, false),
  ('Premium Gold', 'Luxury golden theme', 'https://images.unsplash.com/photo-1508138221679-760a23a2285b', 10000, 40, true);

-- ============================================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ============================================================================

-- Additional composite indexes for common queries
CREATE INDEX idx_study_sessions_user_date ON study_sessions(user_id, start_time DESC);
CREATE INDEX idx_community_posts_type_date ON community_posts(post_type, created_at DESC);
CREATE INDEX idx_flame_transactions_user_date ON flame_transactions(user_id, created_at DESC);
CREATE INDEX idx_study_notes_subject_rating ON study_notes(subject_id, rating DESC);

-- ============================================================================
-- VIEWS FOR COMMON QUERIES
-- ============================================================================

-- View: User leaderboard with profile info
CREATE OR REPLACE VIEW leaderboard_view AS
SELECT
  dr.rank,
  dr.date,
  dr.study_minutes,
  p.id as user_id,
  p.username,
  p.display_name,
  p.avatar_url,
  p.location
FROM daily_rankings dr
JOIN profiles p ON dr.user_id = p.id
ORDER BY dr.date DESC, dr.rank ASC;

-- View: User study summary
CREATE OR REPLACE VIEW user_study_summary AS
SELECT
  p.id as user_id,
  p.username,
  us.total_study_minutes,
  us.current_streak_days,
  us.flame_points,
  COUNT(DISTINCT ua.achievement_id) as achievements_count,
  COALESCE(dr.rank, 9999) as current_daily_rank
FROM profiles p
LEFT JOIN user_stats us ON p.id = us.user_id
LEFT JOIN user_achievements ua ON p.id = ua.user_id
LEFT JOIN daily_rankings dr ON p.id = dr.user_id AND dr.date = CURRENT_DATE
GROUP BY p.id, p.username, us.total_study_minutes, us.current_streak_days, us.flame_points, dr.rank;

-- ============================================================================
-- NOTES
-- ============================================================================

-- P2 Features (To be implemented later):
-- - AI summarization: Add ai_summary table and integration
-- - Meme generator: Add meme_templates and user_memes tables
-- - Location-based features: Add PostGIS extension and location columns
-- - Wear OS support: Add device_sync table for wearable data
-- - Advanced analytics: Add analytics_events table for detailed tracking

-- Performance Considerations:
-- - Use materialized views for rankings (refresh daily/hourly)
-- - Consider partitioning study_sessions table by date for large datasets
-- - Implement caching layer (Redis) for frequently accessed data
-- - Use Supabase Realtime for live study room updates

-- Security Considerations:
-- - Add rate limiting for API endpoints
-- - Implement content moderation for community posts
-- - Secure file uploads with virus scanning
-- - Add audit logging for sensitive operations
