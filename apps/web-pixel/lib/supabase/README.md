# Supabase Authentication Setup

이 디렉토리는 Supabase 인증 관련 설정을 포함합니다.

## 파일 구조

- `supabase.ts` - 클라이언트 사이드 Supabase 클라이언트
- `supabase-server.ts` - 서버 사이드 Supabase 클라이언트
- `auth-helpers.ts` - 인증 관련 헬퍼 함수들

## localhost:3000 설정

### 개발 환경에서의 리다이렉트 URL

이 프로젝트는 로컬 개발 환경에서 자동으로 `localhost:3000`을 사용하도록 설정되어 있습니다:

```typescript
// auth-helpers.ts에서 제공하는 함수들
import { getAuthRedirectUrl, getSiteUrl } from '@/lib/supabase/auth-helpers'

// 개발 환경: http://localhost:3000/auth/callback
// 프로덕션 환경: https://your-domain.com/auth/callback
const redirectUrl = getAuthRedirectUrl()
```

### Supabase Dashboard 설정

1. **Authentication > Settings**에서:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback` 포함

2. **Google OAuth 설정** (Google 로그인 사용 시):
   - Google Cloud Console에서 `http://localhost:3000/auth/callback` 추가

## 사용법

### 로그인/회원가입 페이지에서

```typescript
import { getAuthRedirectUrl } from '@/lib/supabase/auth-helpers'

// OAuth 로그인
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: getAuthRedirectUrl()
  }
})

// 이메일 회원가입
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: getAuthRedirectUrl()
  }
})
```

## 환경 변수

`.env.local` 파일에 다음 변수들이 필요합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```
