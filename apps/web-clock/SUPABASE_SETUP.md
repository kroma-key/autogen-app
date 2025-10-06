# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성합니다.
2. 프로젝트가 생성되면 Settings > API에서 다음 정보를 확인합니다:
   - Project URL
   - anon/public key

## 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Google OAuth 설정 (선택사항)

Google 로그인을 사용하려면:

1. Supabase Dashboard > Authentication > Providers에서 Google을 활성화
2. Google Cloud Console에서 OAuth 2.0 클라이언트 ID 생성
3. Authorized redirect URI에 다음 URL들을 추가:
   - `https://your-project.supabase.co/auth/v1/callback` (Supabase 콜백)
   - `http://localhost:3000/auth/callback` (개발용)
   - `https://your-domain.com/auth/callback` (프로덕션용)
4. Client ID와 Client Secret을 Supabase에 입력

## 4. 이메일 확인 설정

Supabase Dashboard > Authentication > Settings에서:
- Enable email confirmations 활성화
- Site URL을 `http://localhost:3000`으로 설정 (개발용)
- Redirect URLs에 다음 URL들을 추가:
  - `http://localhost:3000/auth/callback` (개발용)
  - `https://your-domain.com/auth/callback` (프로덕션용)

## 5. 로컬 개발 환경 설정

### localhost:3000 리다이렉트 설정

이 프로젝트는 로컬 개발 환경에서 `localhost:3000`을 자동으로 사용하도록 설정되어 있습니다:

- **개발 환경**: `http://localhost:3000/auth/callback` 사용
- **프로덕션 환경**: 현재 도메인의 `/auth/callback` 사용

### 환경별 설정 확인

1. **Supabase Dashboard 설정**:
   - Authentication > Settings > Site URL: `http://localhost:3000`
   - Authentication > Settings > Redirect URLs: `http://localhost:3000/auth/callback` 포함

2. **Google OAuth 설정** (Google 로그인 사용 시):
   - Google Cloud Console > OAuth 2.0 > Authorized redirect URIs에 `http://localhost:3000/auth/callback` 추가

## 6. 사용 가능한 라우트

- `/auth/login` - 로그인 페이지
- `/auth/signup` - 회원가입 페이지
- `/auth/callback` - OAuth 콜백 처리
- `/auth/logout` - 로그아웃 API

## 7. 데이터베이스 스키마 (선택사항)

사용자 프로필 테이블을 생성하려면:

```sql
-- 사용자 프로필 테이블 생성
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 정책 생성
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```
