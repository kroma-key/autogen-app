"use client";

import { useMemo } from "react";
import { User } from "@supabase/supabase-js";
import { useAuth } from "./use-auth";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  avatarUrl?: string;
  initials: string;
}

export function useUserProfile(): UserProfile | null {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user) return null;

    const email = user.email || "";
    const fullName = user.user_metadata?.full_name || "";
    const displayName = fullName || email.split("@")[0] || "사용자";
    const avatarUrl = user.user_metadata?.avatar_url;

    // 이니셜 생성 (한글 이름 또는 이메일 기반)
    let initials = "";
    if (fullName) {
      // 한글 이름인 경우 첫 글자만
      initials = fullName.charAt(0);
    } else if (email) {
      // 이메일인 경우 첫 두 글자
      initials = email.substring(0, 2).toUpperCase();
    }

    return {
      id: user.id,
      email,
      fullName,
      displayName,
      avatarUrl,
      initials,
    };
  }, [user]);
}
