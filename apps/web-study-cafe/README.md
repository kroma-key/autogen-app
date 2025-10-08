# Study Cafe Web App

A study motivation app targeting 16-35 year olds preparing for exams (SAT, civil service, TOEIC). Designed as a simplified version of 열품타 with core features focused on study motivation.

## 🎯 Features Implemented

### ✅ Core MVP Features (P0)

- **Timer Function** - Google Timer style clean study time measurement
- **Subject Selection** - Math, English, Science, History buttons
- **Study Room** - Virtual study room with user avatars and status indicators
- **Today's Stats** - Study time, streak, and rank display
- **Community Screen** - User posts with achievements, tips, and memes
- **Profile Screen** - User stats, achievement badges, and study heatmap
- **Ranking Screen** - Daily/weekly/monthly rankings with user list
- **Store Screen** - Premium subscription, flame points, and themes
- **Bottom Navigation** - Timer, Community, Profile, Ranking, Store sections

### 🎨 Design Features

- **Clean UI** - Minimalist design with purple accent color
- **Responsive Layout** - Mobile-first design
- **Status Indicators** - Green (studying), Yellow (short break), Red (long break)
- **Real-time Timer** - HH:MM:SS format with play/pause/stop controls

## 🛠 Technical Stack

- **Frontend**: Next.js 15 + React 19
- **UI Components**: shadcn/ui components
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📱 Current Implementation

The app now includes five main screens:

### 1. **Timer Screen** (`/`)

- Header with "Study Cafe" title and settings icon
- Subject selection buttons (Math, English, Science, History)
- Large digital timer display (HH:MM:SS format)
- Timer controls (Play, Pause, Stop buttons)
- Today's stats card (study time, streak, rank)
- Study room with user avatars and status indicators

### 2. **Community Screen** (`/community`)

- Tab navigation (All, Achievements, Tips, Memes)
- User posts with achievement badges
- Interaction buttons (likes, comments, shares)
- Real user avatars and study achievements

### 3. **Profile Screen** (`/profile`)

- User profile picture and name
- D-day countdown display
- Study statistics (total hours, streak, rank)
- Achievement badges grid (9 badges)
- Study heatmap visualization

### 4. **Ranking Screen** (`/ranking`)

- Period tabs (Daily, Weekly, Monthly, By Exam)
- User ranking list with trophies for top 3
- User avatars, locations, and study times
- Current user highlighting

### 5. **Store Screen** (`/store`)

- Premium subscription card
- Flame points packages with bonus badges
- Popular study notes with ratings
- Theme customization options

## 🎯 Next Steps

### P1 Features (Important)

- [ ] Photo upload functionality
- [ ] Achievement system with badges
- [ ] Friend system for social connections
- [ ] Basic point system for gamification

### P2 Features (Future)

- [ ] AI summary functionality
- [ ] Meme generator
- [ ] Note marketplace
- [ ] Location-based features
- [ ] Wear OS support

## 📊 Success Metrics

- **DAU/MAU**: 60% target
- **Average Session**: 45+ minutes
- **D30 Retention**: 30%
- **Paid Conversion**: 5%
- **Monthly Transactions**: 10,000+

## 🎨 Design Principles

- **Simplicity First** - Remove complexity, keep core features
- **Google Timer Style** - Clean, minimal interface
- **Social Motivation** - Community and competition elements
- **Mobile-First** - Responsive design for all devices

## 📁 Project Structure

```
apps/web-study-cafe/
├── app/
│   ├── page.tsx          # Timer screen (main page)
│   ├── layout.tsx        # Root layout
│   ├── community/
│   │   └── page.tsx      # Community screen
│   ├── profile/
│   │   └── page.tsx      # Profile screen
│   ├── ranking/
│   │   └── page.tsx      # Ranking screen
│   ├── store/
│   │   └── page.tsx      # Store screen
│   └── about/            # About page
├── components/
│   └── providers.tsx     # Theme and context providers
├── lib/
│   └── env/              # Environment configuration
└── package.json          # Dependencies and scripts
```

## 🔧 Development Notes

- Uses workspace UI components from `@workspace/ui`
- Mock data for study room users (Unsplash avatars)
- Timer state management with React hooks
- Responsive design with Tailwind CSS
- TypeScript interfaces for type safety

---

_Based on the PRD requirements and design specifications_
