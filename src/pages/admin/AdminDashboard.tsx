import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Download, LogOut, Search, Trash2, Check, Users, User, UsersRound, Sparkles, ScanLine } from "lucide-react";
import { TicketScanner } from "@/components/admin/TicketScanner";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Reg = {
  id: string; name: string; phone: string; instagram: string | null;
  vibe: string; face_art: string; entry_type: string; group_size: number | null;
  girls_offer: boolean; confirmed: boolean; created_at: string;
};

const AdminDashboard = () => {
  const { session, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Reg[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "Solo" | "Couple" | "Group" | "girls">("all");
  const [busy, setBusy] = useState(true);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!session) navigate("/admin/auth", { replace: true });
    else if (isAdmin === false) {
      toast.error("You don't have admin access.");
    }
  }, [session, isAdmin, loading, navigate]);

  const load = async () => {
    setBusy(true);
    const { data, error } = await supabase.from("registrations").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRows(data as Reg[]);
    setBusy(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  const filtered = useMemo(() => {
    let r = rows;
    if (filter === "girls") r = r.filter((x) => x.girls_offer);
    else if (filter !== "all") r = r.filter((x) => x.entry_type === filter);
    if (q.trim()) {
      const s = q.toLowerCase();
      r = r.filter((x) => x.name.toLowerCase().includes(s) || x.phone.includes(s) || (x.instagram ?? "").toLowerCase().includes(s));
    }
    return r;
  }, [rows, q, filter]);

  const stats = useMemo(() => ({
    total: rows.length,
    solo: rows.filter((r) => r.entry_type === "Solo").length,
    couple: rows.filter((r) => r.entry_type === "Couple").length,
    group: rows.filter((r) => r.entry_type === "Group").length,
    girls: rows.filter((r) => r.girls_offer).length,
  }), [rows]);

  const del = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    const { error } = await supabase.from("registrations").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); setRows((r) => r.filter((x) => x.id !== id)); }
  };

  const toggleConfirm = async (r: Reg) => {
    const { error } = await supabase.from("registrations").update({ confirmed: !r.confirmed }).eq("id", r.id);
    if (error) toast.error(error.message);
    else setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, confirmed: !r.confirmed } : x));
  };

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Instagram", "Vibe", "Face Art", "Entry", "Group Size", "Girls Offer", "Confirmed", "Time"];
    const csv = [
      headers.join(","),
      ...filtered.map((r) => [
        r.name, r.phone, r.instagram ?? "", r.vibe, r.face_art, r.entry_type,
        r.group_size ?? "", r.girls_offer ? "Yes" : "No", r.confirmed ? "Yes" : "No",
        new Date(r.created_at).toISOString(),
      ].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `afterdark-registrations-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const signOut = async () => { await supabase.auth.signOut(); navigate("/admin/auth"); };

  if (loading || (session && isAdmin === null)) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground animate-flicker">Loading…</div>;
  }
  if (session && isAdmin === false) {
    return (
      <main className="min-h-screen grid place-items-center px-4">
        <div className="glass rounded-2xl p-8 text-center max-w-sm border border-destructive/40">
          <h2 className="text-2xl font-bold mb-2">Access denied</h2>
          <p className="text-sm text-muted-foreground mb-4">Your account isn't an admin yet. Ask an existing admin to grant you the role.</p>
          <Button onClick={signOut} variant="outline" className="border-border bg-transparent">Sign out</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-8 py-8">
      {scanning && <TicketScanner onClose={() => { setScanning(false); load(); }} />}
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-glow-pink">Afterdark Control</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage every soul on the list.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => setScanning(true)} variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
            <ScanLine className="w-4 h-4 mr-2" /> Scan Ticket
          </Button>
          <Button onClick={exportCSV} className="bg-gradient-neon text-primary-foreground border-0 shadow-neon-pink">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Button onClick={signOut} variant="outline" className="border-border bg-transparent">
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        <Stat label="Total" value={stats.total} icon={Users} accent="primary" />
        <Stat label="Solo" value={stats.solo} icon={User} accent="secondary" />
        <Stat label="Couple" value={stats.couple} icon={Users} accent="secondary" />
        <Stat label="Group" value={stats.group} icon={UsersRound} accent="secondary" />
        <Stat label="Girls (offer)" value={stats.girls} icon={Sparkles} accent="accent" />
      </section>

      <section className="glass rounded-2xl p-4 md:p-6 border border-border">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name, phone, IG…"
              value={q} onChange={(e) => setQ(e.target.value)}
              className="bg-input border-border pl-9 h-10"
            />
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
            <TabsList className="bg-muted">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Solo">Solo</TabsTrigger>
              <TabsTrigger value="Couple">Couple</TabsTrigger>
              <TabsTrigger value="Group">Group</TabsTrigger>
              <TabsTrigger value="girls">Girls</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Instagram</TableHead>
                <TableHead>Vibe</TableHead>
                <TableHead>Face Art</TableHead>
                <TableHead>Entry</TableHead>
                <TableHead>Girls</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {busy && (
                <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">Loading…</TableCell></TableRow>
              )}
              {!busy && filtered.length === 0 && (
                <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">No entries yet.</TableCell></TableRow>
              )}
              {filtered.map((r) => (
                <TableRow key={r.id} className="border-border">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {r.name}
                      {r.confirmed && <Badge className="bg-accent/20 text-accent border-accent/40 hover:bg-accent/20">✓</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{r.phone}</TableCell>
                  <TableCell className="text-secondary">{r.instagram ? `@${r.instagram}` : "—"}</TableCell>
                  <TableCell><Badge variant="outline" className="border-primary/40 text-primary">{r.vibe}</Badge></TableCell>
                  <TableCell>{r.face_art}</TableCell>
                  <TableCell>{r.entry_type}{r.group_size ? ` (${r.group_size})` : ""}</TableCell>
                  <TableCell>{r.girls_offer ? <Sparkles className="w-4 h-4 text-accent" /> : "—"}</TableCell>
                  <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                    {new Date(r.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="icon" variant="ghost" onClick={() => toggleConfirm(r)} title="Toggle confirmed">
                        <Check className={`w-4 h-4 ${r.confirmed ? "text-accent" : "text-muted-foreground"}`} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => del(r.id)} title="Delete">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
};

const Stat = ({ label, value, icon: Icon, accent }: { label: string; value: number; icon: any; accent: "primary" | "secondary" | "accent" }) => {
  const cls = accent === "primary" ? "text-primary shadow-neon-pink" : accent === "accent" ? "text-accent shadow-neon-yellow" : "text-secondary shadow-neon-purple";
  return (
    <div className={`glass rounded-xl p-4 border border-border ${cls}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
        <Icon className={`w-4 h-4 ${accent === "primary" ? "text-primary" : accent === "accent" ? "text-accent" : "text-secondary"}`} />
      </div>
      <div className="text-3xl font-bold text-foreground">{value}</div>
    </div>
  );
};

export default AdminDashboard;
