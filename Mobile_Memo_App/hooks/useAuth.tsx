import {createContext, useContext, useEffect, useMemo, useState, type ReactNode,} from "react";
import type { Session, User as SupaUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { getOrCreateUserWithAuthId } from "@/data/appUser";

type AuthContextValue = {
  user: SupaUser | null;
  userId: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const hydrate = async (s: Session | null) => {
    setSession(s);
    if (!s) return;

    // 🔥 zorg dat User row bestaat met auth id
    await getOrCreateUserWithAuthId();
  };

  useEffect(() => {
    let mounted = true;

    void supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      try {
        await hydrate(data.session ?? null);
      } finally {
        setLoading(false);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        await hydrate(newSession);
      }
    );

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const user = session?.user ?? null;
    return {
      user,
      userId: user?.id ?? null,
      isLoggedIn: !!user,
      loading,
      logout: async () => {
        await supabase.auth.signOut();
      },
    };
  }, [session, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
