import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Download, LogOut, Search, Trash2, Check, Users, User, UsersRound, Sparkles, ScanLine, Eye, IndianRupee, X } from "lucide-react";
import { TicketScanner } from "@/components/admin/TicketScanner";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Reg = {
  id: string; name: string; phone: string; instagram: string | null;
  vibe: string; face_art: string; entry_type: string; group_size: number | null;
  girls_offer: boolean; confirmed: boolean; created_at: string;
  payment_screenshot_url: string | null; payment_status: string | null;
};

const AdminDashboard = () => {
  const { session, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Reg[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "Single" | "Couple" | "Group" | "girls" | "pending_payment">("all");
  const [busy, setBusy] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [ssPreview, setSsPreview] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!session) navigate("/admin/auth", { replace: true });
    else if (isAdmin === false) toast.error("You don't have admin access.");
  }, [session, isAdmin, loading, navigate]);

  const load = async () => {
    setBusy(true);
    const { data, error } = await supabase.from("registrations").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRows(data as Reg[]);
    setBusy(false);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  const filtered = useMemo(() => {
    let r = rows;
    if (filter === "girls") r = r.filter((x) => x.girls_offer);
    else if (filter === "pending_payment") r = r.filter((x) => x.payment_status === "pending");
    else if (filter !== "all") r = r.filter((x) => x.entry_type === filter);
    if (q.trim()) {
      const s = q.toLowerCase();
      r = r.filter((x) => x.name.toLowerCase().includes(s) || x.phone.includes(s) || (x.instagram ?? "").toLowerCase().includes(s));
    }
    return r;
  }, [rows, q, filter]);

  const stats = useMemo(() => ({
    total: rows.length,
    solo: rows.filter((r) => r.entry_type === "Single").length,
    couple: rows.filter((r) => r.entry_type === "Couple").length,
    group: rows.filter((r) => r.entry_type === "Group").length,
    girls: rows.filter((r) => r.girls_offer).length,
    pendingPayment: rows.filter((r) => r.payment_status === "pending").length,
    confirmedPayment: rows.filter((r) => r.payment_status === "confirmed").length,
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

  const confirmPayment = async (r: Reg) => {
    const { error } = await supabase.from("registrations")
      .update({ payment_status: "confirmed", confirmed: true })
      .eq("id", r.id);
    if (error) toast.error(error.message);
    else {
      toast.success(`Payment confirmed for ${r.name}`);
      setRows((rs) => rs.map((x) => x.id === r.id ? { ...x, payment_status: "confirmed", confirmed: true } : x));
    }
  };

  const exportCSV = () => {
    const headers = ["Name", "Phone", "Instagram", "Vibe", "Face Art", "Entry", "Group Size", "Girls Offer", "Payment Status", "Confirmed", "Time"];
    const csv = [
      headers.join(","),
      ...filtered.map((r) => [
        r.name, r.phone, r.instagram ?? "", r.vibe, r.face_art, r.entry_type,
        r.group_size ?? "", r.girls_offer ? "Yes" : "No",
        r.payment_status ?? "", r.confirmed ? "Yes" : "No",
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
          <p className="text-sm text-muted-foreground mb-4">Your account isn't an admin yet.</p>
          <Button onClick={signOut} variant="outline" className="border-border bg-transparent">Sign out</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-8 py-8">
      {scanning && <TicketScanner onClose={() => { setScanning(false); load(); }} />}

      {/* Screenshot preview modal */}
      {ssPreview && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSsPreview(null)}>
          <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSsPreview(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 z-10">
              <X className="w-4 h-4 text-white" />
            </button>
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3 text-center">Payment Screenshot</p>
            <img src={ssPreview} alt="Payment screenshot" className="w-full rounded-lg border border-white/10" />
          </div>
        </div>
      )}

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

      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
        <Stat label="Total" value={stats.total} icon={Users} accent="primary" />
        <Stat label="Single" value={stats.solo} icon={User} accent="secondary" />
        <Stat label="Couple" value={stats.couple} icon={Users} accent="secondary" />
        <Stat label="Group" value={stats.group} icon={UsersRound} accent="secondary" />
        <Stat label="Girls" value={stats.girls} icon={Sparkles} accent="accent" />
        <Stat label="Pay Pending" value={stats.pendingPayment} icon={IndianRupee} accent="primary" />
        <Stat label="Pay Confirmed" value={stats.confirmedPayment} icon={Check} accent="accent" />
      </section>

      <section className="glass rounded-2xl p-4 md:p-6 border border-border">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search name, phone, IG…" value={q} onChange={(e) => setQ(e.target.value)}
              className="bg-input border-border pl-9 h-10" />
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
            <TabsList className="bg-muted flex-wrap h-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Single">Single</TabsTrigger>
              <TabsTrigger value="Couple">Couple</TabsTrigger>
              <TabsTrigger value="Group">Group</TabsTrigger>
              <TabsTrigger value="girls">Girls</TabsTrigger>
              <TabsTrigger value="pending_payment" className="text-yellow-400">
                💰 Pay Pending {stats.pendingPayment > 0 && `(${stats.pendingPayment})`}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Entry</TableHead>
                <TableHead>Vibe</TableHead>
                <TableHead>Girls</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Screenshot</TableHead>
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
                      {r.confirmed && <Badge className="bg-accent/20 text-accent border-accent/40 hover:bg-accent/20 text-[10px]">✓ In</Badge>}
                    </div>
                    {r.instagram && <div className="text-xs text-secondary">@{r.instagram}</div>}
                  </TableCell>
                  <TableCell className="font-mono text-sm">{r.phone}</TableCell>
                  <TableCell>
                    {r.entry_type}{r.group_size ? ` ×${r.group_size}` : ""}
                  </TableCell>
                  <TableCell><Badge variant="outline" className="border-primary/40 text-primary text-[10px]">{r.vibe}</Badge></TableCell>
                  <TableCell>{r.girls_offer ? <Sparkles className="w-4 h-4 text-accent" /> : "—"}</TableCell>

                  {/* Payment status */}
                  <TableCell>
                    {r.payment_status === "free" && (
                      <span className="text-[10px] uppercase tracking-wider text-green-400 font-bold">Free</span>
                    )}
                    {r.payment_status === "confirmed" && (
                      <span className="text-[10px] uppercase tracking-wider text-green-400 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Confirmed
                      </span>
                    )}
                    {r.payment_status === "pending" && (
                      <span className="text-[10px] uppercase tracking-wider text-yellow-400 font-bold">⏳ Pending</span>
                    )}
                    {!r.payment_status && <span className="text-muted-foreground">—</span>}
                  </TableCell>

                  {/* Screenshot */}
                  <TableCell>
                    {r.payment_screenshot_url ? (
                      <button onClick={() => setSsPreview(r.payment_screenshot_url)}
                        className="flex items-center gap-1 text-xs text-primary hover:text-primary/70 transition-colors">
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>

                  <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                    {new Date(r.created_at).toLocaleString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 flex-wrap">
                      {/* Confirm Payment button — only if pending */}
                      {r.payment_status === "pending" && (
                        <Button size="sm" onClick={() => confirmPayment(r)}
                          className="h-7 px-2 text-[10px] bg-green-600/20 border border-green-500/40 text-green-400 hover:bg-green-600/40">
                          <IndianRupee className="w-3 h-3 mr-1" /> Confirm Pay
                        </Button>
                      )}
                      <Button size="icon" variant="ghost" onClick={() => toggleConfirm(r)} title="Toggle entry confirmed">
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
  const cls = accent === "primary" ? "text-primary" : accent === "accent" ? "text-accent" : "text-secondary";
  return (
    <div className={`glass rounded-xl p-4 border border-border`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
        <Icon className={`w-4 h-4 ${cls}`} />
      </div>
      <div className="text-3xl font-bold text-foreground">{value}</div>
    </div>
  );
};

export default AdminDashboard;
