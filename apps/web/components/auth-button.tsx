"use client";

import { Button } from "@workspace/ui/components/button";
import { useAuth, useUserProfile } from "@workspace/supabase";
import Link from "next/link";

export default function AuthButton() {
  const { user, loading, signOut } = useAuth();
  const userProfile = useUserProfile();

  if (loading) {
    return (
      <Button variant="outline" disabled>
        로딩 중...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {userProfile?.displayName || user.email}
        </span>
        <Button variant="outline" onClick={signOut}>
          로그아웃
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Link href="/auth/login">
        <Button variant="outline">로그인</Button>
      </Link>
      <Link href="/auth/signup">
        <Button>회원가입</Button>
      </Link>
    </div>
  );
}
