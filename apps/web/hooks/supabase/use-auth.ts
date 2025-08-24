"use client";

import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/supabase";

export interface UseAuthReturn {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const refreshUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        setUser(null);
        setSession(null);
      } else {
        setUser(user);
        if (user) {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          setSession(session);
        }
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
      setUser(null);
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      } else {
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    refreshUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return {
    user,
    session,
    loading,
    signOut,
    refreshUser,
  };
}
