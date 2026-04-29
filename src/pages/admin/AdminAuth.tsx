import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const AdminAuth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { session, isAdmin } = useAuth();

  useEffect(() => {
    if (session && isAdmin) navigate("/admin", { replace: true });
  }, [session, isAdmin, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
      else toast.success("Signed in");
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      if (error) toast.error(error.message);
      else toast.success("Account created. Ask an existing admin to grant you the admin role.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen grid place-items-center px-4 scanlines">
      <form onSubmit={submit} className="w-full max-w-sm glass rounded-2xl p-8 border border-border shadow-card">
        <h1 className="text-3xl font-bold text-glow-pink mb-1">Admin Access</h1>
        <p className="text-sm text-muted-foreground mb-6">Backstage only.</p>

        <div className="space-y-4">
          <div>
            <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</Label>
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-input border-border h-11 mt-1" />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Password</Label>
            <Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="bg-input border-border h-11 mt-1" />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full mt-6 bg-gradient-neon text-primary-foreground border-0 shadow-neon-pink h-11">
          {loading ? "..." : mode === "login" ? "Sign In" : "Create Account"}
        </Button>

        <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-xs text-muted-foreground hover:text-primary mt-4 w-full text-center transition-smooth">
          {mode === "login" ? "Need an account?" : "Have an account? Sign in"}
        </button>
      </form>
    </main>
  );
};

export default AdminAuth;
