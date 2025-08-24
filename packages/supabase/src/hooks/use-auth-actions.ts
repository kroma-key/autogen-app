"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/supabase";
import { getAuthRedirectUrl } from "@/lib/supabase/auth-helpers";

export interface UseAuthActionsReturn {
  loading: boolean;
  error: string | null;
  signInWithPassword: (email: string, password: string) => Promise<boolean>;
  signInWithOAuth: (provider: "google") => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  clearError: () => void;
}

export function useAuthActions(): UseAuthActionsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const clearError = () => setError(null);

  const signInWithPassword = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    } catch {
      setError("로그인 중 오류가 발생했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signInWithOAuth = async (provider: "google"): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: getAuthRedirectUrl(),
        },
      });

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    } catch {
      setError(`${provider} 로그인 중 오류가 발생했습니다.`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: getAuthRedirectUrl(),
        },
      });

      if (error) {
        setError(error.message);
        return false;
      }

      return true;
    } catch {
      setError("회원가입 중 오류가 발생했습니다.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    signInWithPassword,
    signInWithOAuth,
    signUp,
    clearError,
  };
}
