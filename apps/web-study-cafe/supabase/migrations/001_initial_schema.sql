-- Migration: 001_initial_schema
-- Description: Initial database schema for Study Cafe MVP
-- Created: 2025-10-09

-- This migration file is identical to schema.sql but organized for Supabase migrations
-- Run with: supabase migration new initial_schema

-- Enable pgcrypto extension for gen_random_uuid() - available in PostgreSQL 13+
-- This is preferred over uuid-ossp for modern PostgreSQL
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

BEGIN;

-- ============================================================================
-- USERS & PROFILES
-- ============================================================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  location VARCHAR(100),
  exam_target VARCHAR(100),
  target_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  color VARCHAR(20),
  icon VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration_minutes INTEGER,
  status VARCHAR(20) DEFAULT 'in_progress',
  study_room_id UUID,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_study_sessions_user_id ON study_sessions(user_id);
CREATE INDEX idx_study_sessions_start_time ON study_sessions(start_time);
CREATE INDEX idx_study_sessions_status ON study_sessions(status);
CREATE INDEX idx_study_sessions_user_date ON study_sessions(user_id, start_time DESC);

-- ============================================================================
-- STUDY ROOMS
-- ============================================================================

CREATE TABLE study_rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  max_participants INTEGER DEFAULT 10,
  is_public BOOLEAN DEFAULT true,
  password_hash TEXT,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_study_rooms_status ON study_rooms(status);
CREATE INDEX idx_study_rooms_creator ON study_rooms(creator_id);

-- Add foreign key constraint for study_sessions
ALTER TABLE study_sessions
  ADD CONSTRAINT fk_study_room
  FOREIGN KEY (study_room_id)
  REFERENCES study_rooms(id)
  ON DELETE SET NULL;

CREATE TABLE study_room_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  left_at TIMESTAMPTZ,
  current_status VARCHAR(20) DEFAULT 'idle',
  current_subject VARCHAR(100),
  current_study_time_minutes INTEGER DEFAULT 0,
  UNIQUE (room_id, user_id, left_at)
);

CREATE INDEX idx_room_participants_room ON study_room_participants(room_id);
CREATE INDEX idx_room_participants_user ON study_room_participants(user_id);

-- ============================================================================
-- RANKING SYSTEM
-- ============================================================================

CREATE TABLE daily_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  study_minutes INTEGER NOT NULL,
  rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, date)
);

CREATE INDEX idx_daily_rankings_date ON daily_rankings(date);
CREATE INDEX idx_daily_rankings_rank ON daily_rankings(rank);

CREATE TABLE weekly_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  study_minutes INTEGER NOT NULL,
  rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, week_start_date)
);

CREATE INDEX idx_weekly_rankings_week ON weekly_rankings(week_start_date);
CREATE INDEX idx_weekly_rankings_rank ON weekly_rankings(rank);

CREATE TABLE monthly_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  study_minutes INTEGER NOT NULL,
  rank INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, year, month)
);

CREATE INDEX idx_monthly_rankings_year_month ON monthly_rankings(year, month);
CREATE INDEX idx_monthly_rankings_rank ON monthly_rankings(rank);

CREATE TABLE exam_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  exam_type VARCHAR(100) NOT NULL,
  study_minutes INTEGER NOT NULL,
  rank INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, exam_type)
);

CREATE INDEX idx_exam_rankings_exam_type ON exam_rankings(exam_type);
CREATE INDEX idx_exam_rankings_rank ON exam_rankings(rank);

-- ============================================================================
-- COMMUNITY FEATURES
-- ============================================================================

CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  post_type VARCHAR(20) DEFAULT 'general',
  image_urls TEXT[],
  badge_type VARCHAR(50),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_community_posts_user ON community_posts(user_id);
CREATE INDEX idx_community_posts_type ON community_posts(post_type);
CREATE INDEX idx_community_posts_created ON community_posts(created_at DESC);
CREATE INDEX idx_community_posts_type_date ON community_posts(post_type, created_at DESC);

CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (post_id, user_id)
);

CREATE INDEX idx_post_likes_post ON post_likes(post_id);
CREATE INDEX idx_post_likes_user ON post_likes(user_id);

CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_post_comments_post ON post_comments(post_id);
CREATE INDEX idx_post_comments_user ON post_comments(user_id);

CREATE TABLE post_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (post_id, user_id)
);

CREATE INDEX idx_post_shares_post ON post_shares(post_id);

-- ============================================================================
-- FRIENDSHIPS
-- ============================================================================

CREATE TABLE friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  friend_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending',
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  UNIQUE (user_id, friend_id),
  CHECK (user_id != friend_id)
);

CREATE INDEX idx_friendships_user ON friendships(user_id);
CREATE INDEX idx_friendships_friend ON friendships(friend_id);
CREATE INDEX idx_friendships_status ON friendships(status);

-- ============================================================================
-- ACHIEVEMENTS
-- ============================================================================

CREATE TABLE achievement_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  badge_color VARCHAR(20),
  requirement_type VARCHAR(50),
  requirement_value INTEGER,
  flame_points_reward INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievement_definitions(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_unlocked ON user_achievements(unlocked_at DESC);

-- ============================================================================
-- STORE & MONETIZATION
-- ============================================================================

CREATE TABLE flame_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  transaction_type VARCHAR(50) NOT NULL,
  reference_id UUID,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_flame_transactions_user ON flame_transactions(user_id);
CREATE INDEX idx_flame_transactions_created ON flame_transactions(created_at DESC);
CREATE INDEX idx_flame_transactions_user_date ON flame_transactions(user_id, created_at DESC);

CREATE TABLE premium_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan_type VARCHAR(50) NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_premium_subs_user ON premium_subscriptions(user_id);
CREATE INDEX idx_premium_subs_status ON premium_subscriptions(status);

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
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_study_notes_creator ON study_notes(creator_id);
CREATE INDEX idx_study_notes_subject ON study_notes(subject_id);
CREATE INDEX idx_study_notes_rating ON study_notes(rating DESC);
CREATE INDEX idx_study_notes_sales ON study_notes(sales_count DESC);
CREATE INDEX idx_study_notes_subject_rating ON study_notes(subject_id, rating DESC);

CREATE TABLE study_note_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  note_id UUID NOT NULL REFERENCES study_notes(id) ON DELETE CASCADE,
  payment_method VARCHAR(20),
  amount_paid INTEGER,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, note_id)
);

CREATE INDEX idx_note_purchases_user ON study_note_purchases(user_id);
CREATE INDEX idx_note_purchases_note ON study_note_purchases(note_id);

CREATE TABLE study_note_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  note_id UUID NOT NULL REFERENCES study_notes(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, note_id)
);

CREATE INDEX idx_note_ratings_note ON study_note_ratings(note_id);

CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  css_variables JSONB,
  price_krw INTEGER,
  price_flame_points INTEGER,
  is_premium_only BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  theme_id UUID NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT false,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, theme_id)
);

CREATE INDEX idx_user_themes_user ON user_themes(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

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

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User Stats policies
CREATE POLICY "Users can view own stats" ON user_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON user_stats FOR UPDATE USING (auth.uid() = user_id);

-- Study Sessions policies
CREATE POLICY "Users can view own sessions" ON study_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own sessions" ON study_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON study_sessions FOR UPDATE USING (auth.uid() = user_id);

-- Study Rooms policies
CREATE POLICY "Public study rooms are viewable by everyone" ON study_rooms FOR SELECT USING (is_public = true OR auth.uid() = creator_id);
CREATE POLICY "Users can create study rooms" ON study_rooms FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update their rooms" ON study_rooms FOR UPDATE USING (auth.uid() = creator_id);

-- Community Posts policies
CREATE POLICY "Community posts are viewable by everyone" ON community_posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON community_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON community_posts FOR DELETE USING (auth.uid() = user_id);

-- Post Likes policies
CREATE POLICY "Anyone can view likes" ON post_likes FOR SELECT USING (true);
CREATE POLICY "Users can like posts" ON post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike posts" ON post_likes FOR DELETE USING (auth.uid() = user_id);

-- Rankings policies (public read-only)
CREATE POLICY "Daily rankings are viewable by everyone" ON daily_rankings FOR SELECT USING (true);
CREATE POLICY "Weekly rankings are viewable by everyone" ON weekly_rankings FOR SELECT USING (true);
CREATE POLICY "Monthly rankings are viewable by everyone" ON monthly_rankings FOR SELECT USING (true);
CREATE POLICY "Exam rankings are viewable by everyone" ON exam_rankings FOR SELECT USING (true);

-- Study Notes policies
CREATE POLICY "Study notes are viewable by everyone" ON study_notes FOR SELECT USING (status = 'active');
CREATE POLICY "Users can create study notes" ON study_notes FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update their notes" ON study_notes FOR UPDATE USING (auth.uid() = creator_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_study_sessions_updated_at BEFORE UPDATE ON study_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_study_rooms_updated_at BEFORE UPDATE ON study_rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON community_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_study_notes_updated_at BEFORE UPDATE ON study_notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION calculate_session_duration()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND NEW.end_time IS NOT NULL THEN
    NEW.duration_minutes = EXTRACT(EPOCH FROM (NEW.end_time - NEW.start_time)) / 60;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_study_session_duration BEFORE UPDATE ON study_sessions FOR EACH ROW EXECUTE FUNCTION calculate_session_duration();

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

CREATE TRIGGER update_likes_count AFTER INSERT OR DELETE ON post_likes FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();

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

CREATE TRIGGER update_comments_count AFTER INSERT OR DELETE ON post_comments FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();

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

CREATE TRIGGER update_shares_count AFTER INSERT OR DELETE ON post_shares FOR EACH ROW EXECUTE FUNCTION update_post_shares_count();

CREATE OR REPLACE FUNCTION update_study_note_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE study_notes
  SET rating = (SELECT ROUND(AVG(rating)::numeric, 1) FROM study_note_ratings WHERE note_id = NEW.note_id)
  WHERE id = NEW.note_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_note_rating AFTER INSERT OR UPDATE ON study_note_ratings FOR EACH ROW EXECUTE FUNCTION update_study_note_rating();

CREATE OR REPLACE FUNCTION update_study_note_sales()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE study_notes SET sales_count = sales_count + 1 WHERE id = NEW.note_id;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_note_sales AFTER INSERT ON study_note_purchases FOR EACH ROW EXECUTE FUNCTION update_study_note_sales();

CREATE OR REPLACE FUNCTION award_flame_points_for_session()
RETURNS TRIGGER AS $$
DECLARE
  points_earned INTEGER;
BEGIN
  IF NEW.status = 'completed' AND NEW.duration_minutes IS NOT NULL THEN
    points_earned = FLOOR(NEW.duration_minutes / 10);
    IF points_earned > 0 THEN
      INSERT INTO flame_transactions (user_id, amount, transaction_type, reference_id, description)
      VALUES (NEW.user_id, points_earned, 'study_reward', NEW.id, 'Earned from ' || NEW.duration_minutes || ' minutes of study');
      UPDATE user_stats SET flame_points = flame_points + points_earned WHERE user_id = NEW.user_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER award_flame_points AFTER UPDATE ON study_sessions FOR EACH ROW EXECUTE FUNCTION award_flame_points_for_session();

-- ============================================================================
-- SEED DATA
-- ============================================================================

INSERT INTO subjects (name, color, icon) VALUES
  ('math', '#FF6B6B', '🧮'),
  ('english', '#4ECDC4', '📚'),
  ('science', '#95E1D3', '🔬'),
  ('history', '#F38181', '📜'),
  ('korean', '#AA96DA', '📖'),
  ('other', '#FCBAD3', '✏️');

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

INSERT INTO themes (name, description, preview_image_url, price_krw, price_flame_points, is_premium_only) VALUES
  ('Sunset Vibes', 'Warm orange gradients', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 5000, 20, false),
  ('Ocean Breeze', 'Cool blue tones', 'https://images.unsplash.com/photo-1439066615861-d1af74d74000', 5000, 20, false),
  ('Forest Green', 'Natural green shades', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e', 5000, 20, false),
  ('Midnight Dark', 'Dark mode theme', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 7000, 25, false),
  ('Premium Gold', 'Luxury golden theme', 'https://images.unsplash.com/photo-1508138221679-760a23a2285b', 10000, 40, true);

-- ============================================================================
-- VIEWS
-- ============================================================================

CREATE OR REPLACE VIEW leaderboard_view AS
SELECT dr.rank, dr.date, dr.study_minutes, p.id as user_id, p.username, p.display_name, p.avatar_url, p.location
FROM daily_rankings dr
JOIN profiles p ON dr.user_id = p.id
ORDER BY dr.date DESC, dr.rank ASC;

CREATE OR REPLACE VIEW user_study_summary AS
SELECT
  p.id as user_id, p.username, us.total_study_minutes, us.current_streak_days, us.flame_points,
  COUNT(DISTINCT ua.achievement_id) as achievements_count,
  COALESCE(dr.rank, 9999) as current_daily_rank
FROM profiles p
LEFT JOIN user_stats us ON p.id = us.user_id
LEFT JOIN user_achievements ua ON p.id = ua.user_id
LEFT JOIN daily_rankings dr ON p.id = dr.user_id AND dr.date = CURRENT_DATE
GROUP BY p.id, p.username, us.total_study_minutes, us.current_streak_days, us.flame_points, dr.rank;

COMMIT;
