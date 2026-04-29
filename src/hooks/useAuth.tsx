import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        // Defer role check to avoid deadlock
        setTimeout(async () => {
          const { data } = await supabase.rpc("has_role", { _user_id: s.user.id, _role: "admin" });
          setIsAdmin(!!data);
        }, 0);
      } else {
        setIsAdmin(null);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        const { data } = await supabase.rpc("has_role", { _user_id: s.user.id, _role: "admin" });
        setIsAdmin(!!data);
      }
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, user, isAdmin, loading };
};
