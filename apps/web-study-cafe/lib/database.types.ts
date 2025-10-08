/**
 * Database Types for Study Cafe App
 * Generated from Supabase schema
 *
 * Use with Supabase client:
 * import { Database } from '@/lib/database.types'
 * const supabase = createClient<Database>(url, key)
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          exam_target: string | null
          target_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          exam_target?: string | null
          target_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          exam_target?: string | null
          target_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_stats: {
        Row: {
          user_id: string
          total_study_minutes: number
          current_streak_days: number
          longest_streak_days: number
          flame_points: number
          premium_until: string | null
          last_study_date: string | null
          updated_at: string
        }
        Insert: {
          user_id: string
          total_study_minutes?: number
          current_streak_days?: number
          longest_streak_days?: number
          flame_points?: number
          premium_until?: string | null
          last_study_date?: string | null
          updated_at?: string
        }
        Update: {
          user_id?: string
          total_study_minutes?: number
          current_streak_days?: number
          longest_streak_days?: number
          flame_points?: number
          premium_until?: string | null
          last_study_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_stats_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      subjects: {
        Row: {
          id: string
          name: string
          color: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          color?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          color?: string | null
          icon?: string | null
          created_at?: string
        }
        Relationships: []
      }
      study_sessions: {
        Row: {
          id: string
          user_id: string
          subject_id: string | null
          start_time: string
          end_time: string | null
          duration_minutes: number | null
          status: string
          study_room_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id?: string | null
          start_time: string
          end_time?: string | null
          duration_minutes?: number | null
          status?: string
          study_room_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string | null
          start_time?: string
          end_time?: string | null
          duration_minutes?: number | null
          status?: string
          study_room_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_sessions_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_study_room"
            columns: ["study_room_id"]
            referencedRelation: "study_rooms"
            referencedColumns: ["id"]
          }
        ]
      }
      study_rooms: {
        Row: {
          id: string
          name: string
          description: string | null
          creator_id: string
          max_participants: number
          is_public: boolean
          password_hash: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          creator_id: string
          max_participants?: number
          is_public?: boolean
          password_hash?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          creator_id?: string
          max_participants?: number
          is_public?: boolean
          password_hash?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_rooms_creator_id_fkey"
            columns: ["creator_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      study_room_participants: {
        Row: {
          id: string
          room_id: string
          user_id: string
          joined_at: string
          left_at: string | null
          current_status: string
          current_subject: string | null
          current_study_time_minutes: number
        }
        Insert: {
          id?: string
          room_id: string
          user_id: string
          joined_at?: string
          left_at?: string | null
          current_status?: string
          current_subject?: string | null
          current_study_time_minutes?: number
        }
        Update: {
          id?: string
          room_id?: string
          user_id?: string
          joined_at?: string
          left_at?: string | null
          current_status?: string
          current_subject?: string | null
          current_study_time_minutes?: number
        }
        Relationships: [
          {
            foreignKeyName: "study_room_participants_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "study_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_room_participants_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      daily_rankings: {
        Row: {
          id: string
          user_id: string
          date: string
          study_minutes: number
          rank: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          study_minutes: number
          rank?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          study_minutes?: number
          rank?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_rankings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      weekly_rankings: {
        Row: {
          id: string
          user_id: string
          week_start_date: string
          study_minutes: number
          rank: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          week_start_date: string
          study_minutes: number
          rank?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          week_start_date?: string
          study_minutes?: number
          rank?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_rankings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      monthly_rankings: {
        Row: {
          id: string
          user_id: string
          year: number
          month: number
          study_minutes: number
          rank: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          year: number
          month: number
          study_minutes: number
          rank?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          year?: number
          month?: number
          study_minutes?: number
          rank?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "monthly_rankings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      exam_rankings: {
        Row: {
          id: string
          user_id: string
          exam_type: string
          study_minutes: number
          rank: number | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          exam_type: string
          study_minutes: number
          rank?: number | null
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          exam_type?: string
          study_minutes?: number
          rank?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_rankings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      community_posts: {
        Row: {
          id: string
          user_id: string
          content: string
          post_type: string
          image_urls: string[] | null
          badge_type: string | null
          likes_count: number
          comments_count: number
          shares_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          post_type?: string
          image_urls?: string[] | null
          badge_type?: string | null
          likes_count?: number
          comments_count?: number
          shares_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          post_type?: string
          image_urls?: string[] | null
          badge_type?: string | null
          likes_count?: number
          comments_count?: number
          shares_count?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      post_likes: {
        Row: {
          id: string
          post_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      post_comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      post_shares: {
        Row: {
          id: string
          post_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_shares_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_shares_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      friendships: {
        Row: {
          id: string
          user_id: string
          friend_id: string
          status: string
          requested_at: string
          accepted_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          friend_id: string
          status?: string
          requested_at?: string
          accepted_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          friend_id?: string
          status?: string
          requested_at?: string
          accepted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "friendships_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendships_friend_id_fkey"
            columns: ["friend_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      achievement_definitions: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          badge_color: string | null
          requirement_type: string | null
          requirement_value: number | null
          flame_points_reward: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          badge_color?: string | null
          requirement_type?: string | null
          requirement_value?: number | null
          flame_points_reward?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          badge_color?: string | null
          requirement_type?: string | null
          requirement_value?: number | null
          flame_points_reward?: number
          created_at?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          unlocked_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          unlocked_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            referencedRelation: "achievement_definitions"
            referencedColumns: ["id"]
          }
        ]
      }
      flame_transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          transaction_type: string
          reference_id: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          transaction_type: string
          reference_id?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          transaction_type?: string
          reference_id?: string | null
          description?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flame_transactions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      premium_subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_type: string
          start_date: string
          end_date: string
          status: string
          payment_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_type: string
          start_date: string
          end_date: string
          status?: string
          payment_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_type?: string
          start_date?: string
          end_date?: string
          status?: string
          payment_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "premium_subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      study_notes: {
        Row: {
          id: string
          creator_id: string
          title: string
          description: string | null
          subject_id: string | null
          cover_image_url: string | null
          file_url: string | null
          preview_url: string | null
          price_krw: number | null
          price_flame_points: number | null
          rating: number
          sales_count: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          title: string
          description?: string | null
          subject_id?: string | null
          cover_image_url?: string | null
          file_url?: string | null
          preview_url?: string | null
          price_krw?: number | null
          price_flame_points?: number | null
          rating?: number
          sales_count?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          title?: string
          description?: string | null
          subject_id?: string | null
          cover_image_url?: string | null
          file_url?: string | null
          preview_url?: string | null
          price_krw?: number | null
          price_flame_points?: number | null
          rating?: number
          sales_count?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_notes_creator_id_fkey"
            columns: ["creator_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_notes_subject_id_fkey"
            columns: ["subject_id"]
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          }
        ]
      }
      study_note_purchases: {
        Row: {
          id: string
          user_id: string
          note_id: string
          payment_method: string | null
          amount_paid: number | null
          purchased_at: string
        }
        Insert: {
          id?: string
          user_id: string
          note_id: string
          payment_method?: string | null
          amount_paid?: number | null
          purchased_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          note_id?: string
          payment_method?: string | null
          amount_paid?: number | null
          purchased_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_note_purchases_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_note_purchases_note_id_fkey"
            columns: ["note_id"]
            referencedRelation: "study_notes"
            referencedColumns: ["id"]
          }
        ]
      }
      study_note_ratings: {
        Row: {
          id: string
          user_id: string
          note_id: string
          rating: number
          review: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          note_id: string
          rating: number
          review?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          note_id?: string
          rating?: number
          review?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_note_ratings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "study_note_ratings_note_id_fkey"
            columns: ["note_id"]
            referencedRelation: "study_notes"
            referencedColumns: ["id"]
          }
        ]
      }
      themes: {
        Row: {
          id: string
          name: string
          description: string | null
          preview_image_url: string | null
          css_variables: Json | null
          price_krw: number | null
          price_flame_points: number | null
          is_premium_only: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          preview_image_url?: string | null
          css_variables?: Json | null
          price_krw?: number | null
          price_flame_points?: number | null
          is_premium_only?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          preview_image_url?: string | null
          css_variables?: Json | null
          price_krw?: number | null
          price_flame_points?: number | null
          is_premium_only?: boolean
          created_at?: string
        }
        Relationships: []
      }
      user_themes: {
        Row: {
          id: string
          user_id: string
          theme_id: string
          is_active: boolean
          purchased_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme_id: string
          is_active?: boolean
          purchased_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme_id?: string
          is_active?: boolean
          purchased_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_themes_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_themes_theme_id_fkey"
            columns: ["theme_id"]
            referencedRelation: "themes"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      leaderboard_view: {
        Row: {
          rank: number | null
          date: string | null
          study_minutes: number | null
          user_id: string | null
          username: string | null
          display_name: string | null
          avatar_url: string | null
          location: string | null
        }
      }
      user_study_summary: {
        Row: {
          user_id: string | null
          username: string | null
          total_study_minutes: number | null
          current_streak_days: number | null
          flame_points: number | null
          achievements_count: number | null
          current_daily_rank: number | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
