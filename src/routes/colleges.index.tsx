import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { META, DISTRICT_NAMES, getCollegeQuality } from "@/lib/predictor";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/colleges/")({
  head: () => ({
    meta: [
      { title: "All Engineering Colleges — TG EAPCET 2026" },
      { name: "description", content: "Browse all engineering colleges in Telangana participating in TG EAPCET counselling with branch and cutoff details." },
    ],
  }),
  component: CollegesPage,
});

function CollegesPage() {
  const [q, setQ] = useState("");
  const [dist, setDist] = useState<string>("");
  const [type, setType] = useState<string>("");

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return META.colleges.filter(c => {
      if (dist && c.dist !== dist) return false;
      if (type && c.type !== type) return false;
      if (!ql) return true;
      return c.name.toLowerCase().includes(ql) || c.place.toLowerCase().includes(ql) || c.inst.toLowerCase().includes(ql);
    }).sort((a, b) => {
      const qa = getCollegeQuality(a.inst);
      const qb = getCollegeQuality(b.inst);
      const tierDiff = (qa?.tier ?? 4) - (qb?.tier ?? 4);
      if (tierDiff !== 0) return tierDiff;
      const rankDiff = (qa?.bestRank ?? 999999) - (qb?.bestRank ?? 999999);
      if (rankDiff !== 0) return rankDiff;
      return a.name.localeCompare(b.name);
    });
  }, [q, dist, type]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Engineering Colleges</h1>
        <p className="mt-2 text-muted-foreground">{META.colleges.length} institutes • TG EAPCET 2025 Final Phase</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Input placeholder="Search by name or place..." value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />
          <select value={dist} onChange={(e) => setDist(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="">All districts</option>
            {META.districts.map(d => <option key={d} value={d}>{DISTRICT_NAMES[d] ?? d}</option>)}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="">All types</option>
            <option value="PVT">Private</option>
            <option value="GOV">Government</option>
            <option value="UNIV">University</option>
            <option value="SF">Self Financed</option>
          </select>
        </div>

        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map(c => {
            const cq = getCollegeQuality(c.inst);
            return (
              <Link
                key={c.inst}
                to="/colleges/$inst"
                params={{ inst: c.inst }}
                className="block rounded-lg border border-border bg-card p-4 hover:border-primary transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold leading-tight">{c.name}</h2>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">{c.inst}</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  {c.place} · {DISTRICT_NAMES[c.dist] ?? c.dist}
                </div>
                <div className="mt-2 flex flex-wrap gap-1 text-xs">
                  {cq && (
                    <span className={`rounded px-2 py-0.5 font-medium ${
                      cq.tier === 1 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200" :
                      cq.tier === 2 ? "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-200" :
                      cq.tier === 3 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      Tier {cq.tier}
                    </span>
                  )}
                  <span className="rounded bg-muted px-2 py-0.5">{c.type}</span>
                  {c.coed === "GIRLS" && <span className="rounded bg-muted px-2 py-0.5">Girls only</span>}
                  <span className="rounded bg-muted px-2 py-0.5">{c.aff}</span>
                </div>
              </Link>
            );
          })}
        </div>
        {filtered.length === 0 && <p className="mt-8 text-center text-muted-foreground">No colleges match.</p>}
      </main>
      <SiteFooter />
    </div>
  );
}
