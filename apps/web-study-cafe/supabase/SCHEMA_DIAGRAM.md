# Study Cafe Database Schema - Visual Diagram

## Complete Entity Relationship Diagram

```mermaid
erDiagram
    %% ============================================================================
    %% USER & PROFILE DOMAIN
    %% ============================================================================

    AUTH_USERS ||--|| PROFILES : "extends"
    PROFILES ||--|| USER_STATS : "has"

    AUTH_USERS {
        uuid id PK
        string email
        timestamp created_at
    }

    PROFILES {
        uuid id PK "FK to auth.users"
        string username UK
        string display_name
        string avatar_url
        text bio
        string location
        string exam_target
        date target_date
        timestamp created_at
        timestamp updated_at
    }

    USER_STATS {
        uuid user_id PK "FK to profiles"
        int total_study_minutes
        int current_streak_days
        int longest_streak_days
        int flame_points
        timestamp premium_until
        date last_study_date
        timestamp updated_at
    }

    %% ============================================================================
    %% STUDY TRACKING DOMAIN
    %% ============================================================================

    SUBJECTS ||--o{ STUDY_SESSIONS : "categorizes"
    PROFILES ||--o{ STUDY_SESSIONS : "records"
    STUDY_ROOMS ||--o{ STUDY_SESSIONS : "hosts"
    STUDY_SESSIONS ||--o{ FLAME_TRANSACTIONS : "triggers"

    SUBJECTS {
        uuid id PK
        string name
        string color
        string icon
        timestamp created_at
    }

    STUDY_SESSIONS {
        uuid id PK
        uuid user_id FK
        uuid subject_id FK
        timestamp start_time
        timestamp end_time
        int duration_minutes "auto-calculated"
        string status "in_progress|completed|cancelled"
        uuid study_room_id FK
        text notes
        timestamp created_at
        timestamp updated_at
    }

    PROFILES ||--o{ STUDY_ROOMS : "creates"
    STUDY_ROOMS ||--o{ STUDY_ROOM_PARTICIPANTS : "contains"
    PROFILES ||--o{ STUDY_ROOM_PARTICIPANTS : "joins"

    STUDY_ROOMS {
        uuid id PK
        string name
        text description
        uuid creator_id FK
        int max_participants "default 10"
        bool is_public
        string password_hash
        string status "active|closed"
        timestamp created_at
        timestamp updated_at
    }

    STUDY_ROOM_PARTICIPANTS {
        uuid id PK
        uuid room_id FK
        uuid user_id FK
        timestamp joined_at
        timestamp left_at
        string current_status "studying|short-break|long-break|idle"
        string current_subject
        int current_study_time_minutes
    }

    %% ============================================================================
    %% RANKING DOMAIN
    %% ============================================================================

    PROFILES ||--o{ DAILY_RANKINGS : "ranked_in"
    PROFILES ||--o{ WEEKLY_RANKINGS : "ranked_in"
    PROFILES ||--o{ MONTHLY_RANKINGS : "ranked_in"
    PROFILES ||--o{ EXAM_RANKINGS : "ranked_in"

    DAILY_RANKINGS {
        uuid id PK
        uuid user_id FK
        date date UK
        int study_minutes
        int rank "calculated"
        timestamp created_at
    }

    WEEKLY_RANKINGS {
        uuid id PK
        uuid user_id FK
        date week_start_date UK
        int study_minutes
        int rank
        timestamp created_at
    }

    MONTHLY_RANKINGS {
        uuid id PK
        uuid user_id FK
        int year UK
        int month UK
        int study_minutes
        int rank
        timestamp created_at
    }

    EXAM_RANKINGS {
        uuid id PK
        uuid user_id FK
        string exam_type UK "수능|TOEIC|공무원"
        int study_minutes
        int rank
        timestamp updated_at
    }

    %% ============================================================================
    %% COMMUNITY DOMAIN
    %% ============================================================================

    PROFILES ||--o{ COMMUNITY_POSTS : "creates"
    COMMUNITY_POSTS ||--o{ POST_LIKES : "receives"
    COMMUNITY_POSTS ||--o{ POST_COMMENTS : "receives"
    COMMUNITY_POSTS ||--o{ POST_SHARES : "receives"
    PROFILES ||--o{ POST_LIKES : "gives"
    PROFILES ||--o{ POST_COMMENTS : "writes"
    PROFILES ||--o{ POST_SHARES : "shares"

    COMMUNITY_POSTS {
        uuid id PK
        uuid user_id FK
        text content
        string post_type "general|achievement|tip|meme"
        array image_urls
        string badge_type
        int likes_count "auto-updated"
        int comments_count "auto-updated"
        int shares_count "auto-updated"
        timestamp created_at
        timestamp updated_at
    }

    POST_LIKES {
        uuid id PK
        uuid post_id FK
        uuid user_id FK
        timestamp created_at
    }

    POST_COMMENTS {
        uuid id PK
        uuid post_id FK
        uuid user_id FK
        text content
        timestamp created_at
        timestamp updated_at
    }

    POST_SHARES {
        uuid id PK
        uuid post_id FK
        uuid user_id FK
        timestamp created_at
    }

    PROFILES ||--o{ FRIENDSHIPS : "initiates"
    PROFILES ||--o{ FRIENDSHIPS : "receives"

    FRIENDSHIPS {
        uuid id PK
        uuid user_id FK
        uuid friend_id FK
        string status "pending|accepted|blocked"
        timestamp requested_at
        timestamp accepted_at
    }

    %% ============================================================================
    %% ACHIEVEMENTS DOMAIN
    %% ============================================================================

    ACHIEVEMENT_DEFINITIONS ||--o{ USER_ACHIEVEMENTS : "unlocked_as"
    PROFILES ||--o{ USER_ACHIEVEMENTS : "earns"

    ACHIEVEMENT_DEFINITIONS {
        uuid id PK
        string name UK
        text description
        string icon
        string badge_color
        string requirement_type "total_hours|streak|ranking"
        int requirement_value
        int flame_points_reward
        timestamp created_at
    }

    USER_ACHIEVEMENTS {
        uuid id PK
        uuid user_id FK
        uuid achievement_id FK
        timestamp unlocked_at
    }

    %% ============================================================================
    %% STORE & MONETIZATION DOMAIN
    %% ============================================================================

    PROFILES ||--o{ FLAME_TRANSACTIONS : "has"
    PROFILES ||--o{ PREMIUM_SUBSCRIPTIONS : "subscribes"

    FLAME_TRANSACTIONS {
        uuid id PK
        uuid user_id FK
        int amount "positive=earned, negative=spent"
        string transaction_type "study_reward|purchase|package_buy"
        uuid reference_id
        text description
        timestamp created_at
    }

    PREMIUM_SUBSCRIPTIONS {
        uuid id PK
        uuid user_id FK
        string plan_type "monthly|yearly"
        timestamp start_date
        timestamp end_date
        string status "active|cancelled|expired"
        string payment_id
        timestamp created_at
    }

    PROFILES ||--o{ STUDY_NOTES : "creates"
    SUBJECTS ||--o{ STUDY_NOTES : "categorizes"
    STUDY_NOTES ||--o{ STUDY_NOTE_PURCHASES : "purchased_as"
    STUDY_NOTES ||--o{ STUDY_NOTE_RATINGS : "rated_by"
    PROFILES ||--o{ STUDY_NOTE_PURCHASES : "purchases"
    PROFILES ||--o{ STUDY_NOTE_RATINGS : "rates"

    STUDY_NOTES {
        uuid id PK
        uuid creator_id FK
        string title
        text description
        uuid subject_id FK
        string cover_image_url
        string file_url
        string preview_url
        int price_krw
        int price_flame_points
        decimal rating "auto-calculated"
        int sales_count "auto-updated"
        string status "active|inactive|pending_review"
        timestamp created_at
        timestamp updated_at
    }

    STUDY_NOTE_PURCHASES {
        uuid id PK
        uuid user_id FK
        uuid note_id FK
        string payment_method "cash|flame_points"
        int amount_paid
        timestamp purchased_at
    }

    STUDY_NOTE_RATINGS {
        uuid id PK
        uuid user_id FK
        uuid note_id FK
        int rating "1-5"
        text review
        timestamp created_at
    }

    THEMES ||--o{ USER_THEMES : "purchased_as"
    PROFILES ||--o{ USER_THEMES : "owns"

    THEMES {
        uuid id PK
        string name
        text description
        string preview_image_url
        jsonb css_variables
        int price_krw
        int price_flame_points
        bool is_premium_only
        timestamp created_at
    }

    USER_THEMES {
        uuid id PK
        uuid user_id FK
        uuid theme_id FK
        bool is_active
        timestamp purchased_at
    }
```

## Domain-Specific Diagrams

### 1. Study Tracking Flow

```mermaid
graph TB
    subgraph "Study Session Lifecycle"
        A[User Starts Timer] --> B[INSERT study_sessions<br/>status='in_progress']
        B --> C{User Action}
        C -->|Stop Timer| D[UPDATE status='completed'<br/>set end_time]
        C -->|Cancel| E[UPDATE status='cancelled']
        D --> F[TRIGGER: Calculate Duration]
        F --> G[duration_minutes = end_time - start_time]
        G --> H[TRIGGER: Award Flame Points]
        H --> I[points = FLOOR duration / 10]
        I --> J[INSERT flame_transactions]
        J --> K[UPDATE user_stats.flame_points]
    end

    subgraph "Study Room Join Flow"
        L[User Joins Room] --> M[INSERT study_room_participants]
        M --> N[Set current_status='idle']
        N --> O[User Starts Studying]
        O --> P[UPDATE current_status='studying']
        P --> Q[Link to study_session]
    end

    B -.-> Q
```

### 2. Community Interaction Flow

```mermaid
graph LR
    subgraph "Post Creation"
        A[User Creates Post] --> B[INSERT community_posts]
        B --> C[Achievement Earned?]
        C -->|Yes| D[Set badge_type]
        C -->|No| E[post_type='general']
    end

    subgraph "Post Interactions"
        B --> F[Post Visible to All]
        F --> G[User Likes Post]
        G --> H[INSERT post_likes]
        H --> I[TRIGGER: Increment likes_count]

        F --> J[User Comments]
        J --> K[INSERT post_comments]
        K --> L[TRIGGER: Increment comments_count]

        F --> M[User Shares]
        M --> N[INSERT post_shares]
        N --> O[TRIGGER: Increment shares_count]
    end
```

### 3. Ranking System Architecture

```mermaid
graph TB
    subgraph "Daily Ranking Calculation (Scheduled)"
        A[Midnight KST] --> B[Calculate Yesterday's Study Time]
        B --> C[SUM duration_minutes<br/>GROUP BY user_id]
        C --> D[INSERT INTO daily_rankings]
        D --> E[Calculate Rank<br/>ORDER BY study_minutes DESC]
        E --> F[UPDATE rank column]
    end

    subgraph "Weekly Ranking"
        G[Monday 00:00 KST] --> H[Calculate Last Week's Total]
        H --> I[INSERT INTO weekly_rankings]
        I --> J[Calculate Rank]
    end

    subgraph "Monthly Ranking"
        K[1st of Month] --> L[Calculate Last Month's Total]
        L --> M[INSERT INTO monthly_rankings]
        M --> N[Calculate Rank]
    end

    subgraph "Exam Ranking (Real-time)"
        O[Study Session Complete] --> P[Filter by exam_target]
        P --> Q[UPSERT exam_rankings]
        Q --> R[Recalculate Rank]
    end
```

### 4. Flame Points Economy

```mermaid
graph TB
    subgraph "Earning Flame Points"
        A[Study Session Complete] --> B[1 point per 10 minutes]
        C[Achievement Unlocked] --> D[Variable reward<br/>10-100 points]
        E[Daily Login Streak] --> F[Bonus points]
    end

    subgraph "Spending Flame Points"
        B --> G[User's Flame Balance]
        D --> G
        F --> G

        G --> H{Purchase Options}
        H -->|Buy Study Notes| I[Deduct flame_price_points]
        H -->|Buy Theme| J[Deduct theme_flame_points]
        H -->|Exchange for Cash Items| K[Conversion rate applied]
    end

    subgraph "Transaction Recording"
        I --> L[INSERT flame_transactions<br/>amount=-X, type='purchase']
        J --> L
        K --> L
        L --> M[UPDATE user_stats.flame_points]
    end
```

### 5. Achievement System

```mermaid
graph LR
    subgraph "Achievement Tracking"
        A[Study Session Complete] --> B{Check Achievements}
        B --> C[Total Hours Check]
        B --> D[Streak Check]
        B --> E[Ranking Check]
        B --> F[Time-of-Day Check]

        C -->|Milestone Reached| G[Unlock Achievement]
        D -->|Streak Milestone| G
        E -->|Rank Threshold| G
        F -->|Special Time| G
    end

    subgraph "Achievement Unlocking"
        G --> H[INSERT user_achievements]
        H --> I[Award Flame Points]
        I --> J[INSERT flame_transactions]
        J --> K[Optional: Create Community Post]
        K --> L[Set badge_type on post]
    end
```

### 6. Store & Marketplace Flow

```mermaid
graph TB
    subgraph "Study Notes Marketplace"
        A[Creator Uploads Note] --> B[INSERT study_notes<br/>status='pending_review']
        B --> C[Admin Reviews]
        C -->|Approved| D[UPDATE status='active']
        C -->|Rejected| E[UPDATE status='inactive']

        D --> F[Listed in Marketplace]
        F --> G[User Purchases]
        G --> H{Payment Method}
        H -->|Flame Points| I[Check Balance]
        H -->|Cash| J[Payment Gateway]

        I -->|Sufficient| K[INSERT study_note_purchases]
        J -->|Success| K

        K --> L[TRIGGER: Increment sales_count]
        K --> M[User Can Download]

        M --> N[User Rates Note]
        N --> O[INSERT study_note_ratings]
        O --> P[TRIGGER: Recalculate avg rating]
    end
```

## Table Statistics

### Table Sizes & Growth Estimates

| Table | Priority | Est. Rows (1 year, 10k users) | Growth Rate |
|-------|----------|-------------------------------|-------------|
| profiles | High | 10,000 | Steady |
| user_stats | High | 10,000 | Steady |
| study_sessions | Critical | 3,650,000 | High (365/user/year) |
| community_posts | Medium | 100,000 | Medium (10/user/year) |
| post_likes | Medium | 500,000 | High |
| daily_rankings | High | 3,650,000 | Linear (365 days × users) |
| flame_transactions | Medium | 4,000,000 | High |
| study_notes | Low | 1,000 | Low |

### Index Strategy by Query Pattern

```mermaid
graph TB
    subgraph "Most Common Queries"
        A["Get User's Study History<br/>(user_id, start_time)"] --> B[idx_study_sessions_user_date]
        C["Get Today's Rankings<br/>(date, rank)"] --> D[idx_daily_rankings_date]
        E["Get Community Feed<br/>(post_type, created_at)"] --> F[idx_community_posts_type_date]
        G["Get User's Transactions<br/>(user_id, created_at)"] --> H[idx_flame_transactions_user_date]
    end

    subgraph "Index Types"
        B --> I[Composite B-Tree]
        D --> J[B-Tree + Sort]
        F --> K[Composite B-Tree]
        H --> L[Composite B-Tree]
    end
```

## Security Model (RLS)

### Row Level Security Policies

```mermaid
graph TB
    subgraph "Public Read Tables"
        A[profiles] --> B[SELECT: true]
        C[community_posts] --> B
        D[daily_rankings] --> B
        E[study_notes active] --> B
    end

    subgraph "User-Scoped Tables"
        F[user_stats] --> G[SELECT/UPDATE:<br/>auth.uid = user_id]
        H[study_sessions] --> G
        I[flame_transactions] --> G
    end

    subgraph "Creator-Scoped Tables"
        J[study_rooms] --> K[UPDATE:<br/>auth.uid = creator_id]
        L[community_posts] --> M[INSERT/UPDATE/DELETE:<br/>auth.uid = user_id]
        N[study_notes] --> K
    end

    subgraph "Public Write with Auth"
        O[post_likes] --> P[INSERT/DELETE:<br/>auth.uid = user_id]
        Q[study_room_participants] --> R[INSERT:<br/>authenticated]
    end
```

## Performance Optimization Strategy

### Query Optimization Layers

```mermaid
graph LR
    subgraph "Layer 1: Database"
        A[Strategic Indexes] --> B[Query Performance]
        C[Materialized Views] --> B
        D[Denormalized Counts] --> B
    end

    subgraph "Layer 2: Application"
        B --> E[Supabase Client Cache]
        E --> F[React Query]
        F --> G[Response Time <100ms]
    end

    subgraph "Layer 3: CDN"
        G --> H[Edge Caching]
        H --> I[Static Rankings]
        I --> J[Global Distribution]
    end
```

## Data Flow Summary

```mermaid
graph TB
    subgraph "User Actions"
        A[Study] --> B[Timer]
        C[Social] --> D[Community]
        E[Shop] --> F[Store]
    end

    subgraph "Core Data Flows"
        B --> G[study_sessions]
        G --> H[Rankings Update]
        G --> I[Flame Points Earned]

        D --> J[community_posts]
        J --> K[Interactions]

        F --> L[Purchases]
        L --> M[Flame Points Spent]
    end

    subgraph "Aggregate Data"
        H --> N[Leaderboards]
        I --> O[user_stats]
        M --> O
        K --> P[Social Feed]
    end

    subgraph "User Views"
        N --> Q[Rankings Page]
        O --> R[Profile Page]
        P --> S[Community Page]
    end
```

---

**Legend:**
- `PK` = Primary Key
- `FK` = Foreign Key
- `UK` = Unique Key
- Solid lines = Direct relationships
- Dashed lines = Trigger/Calculated relationships
- Subgraphs = Logical domains

