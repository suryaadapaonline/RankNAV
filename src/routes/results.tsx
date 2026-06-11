import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AdSlot, StickyMobileAd } from "@/components/AdSlot";
import { predict, CATEGORIES, DISTRICT_NAMES, type Category, type Gender } from "@/lib/predictor";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const searchSchema = z.object({
  rank: fallback(z.number().int().min(1), 1).default(1),
  category: fallback(
    z.enum(["OC","BCA","BCB","BCC","BCD","BCE","SC1","SC2","SC3","ST","EWS"]),
    "OC"
  ).default("OC"),
  gender: fallback(z.enum(["B","G"]), "B").default("B"),
  branches: fallback(z.array(z.string()), []).default([]).optional(),
  districts: fallback(z.array(z.string()), []).default([]).optional(),
  types: fallback(z.array(z.string()), []).default([]).optional(),
});

export const Route = createFileRoute("/results")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Your College Predictions — TG EAPCET 2026" },
      { name: "description", content: "Personalized college predictions based on your TG EAPCET rank." },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const search = Route.useSearch();
  const [query, setQuery] = useState("");
  const [safetyFilter, setSafetyFilter] = useState<"all" | "High Chance" | "Possible" | "Tough">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [search]);

  const results = useMemo(() => predict({
    rank: search.rank,
    category: search.category as Category,
    gender: search.gender as Gender,
    branches: search.branches,
    districts: search.districts,
    types: search.types,
  }), [search]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return results.filter(r => {
      if (safetyFilter !== "all" && r.safety !== safetyFilter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.place.toLowerCase().includes(q) ||
        r.branch.toLowerCase().includes(q) ||
        r.inst.toLowerCase().includes(q)
      );
    });
  }, [results, query, safetyFilter]);

  const counts = useMemo(() => ({
    "High Chance": results.filter(r => r.safety === "High Chance").length,
    "Possible": results.filter(r => r.safety === "Possible").length,
    "Tough": results.filter(r => r.safety === "Tough").length,
  }), [results]);

  const catLabel = CATEGORIES.find(c => c.value === search.category)?.label ?? search.category;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -top-16 right-1/4 h-56 w-56 rounded-full bg-mint blur-3xl opacity-50" />
          <div aria-hidden className="pointer-events-none absolute -top-10 left-10 h-48 w-48 rounded-full bg-peach blur-3xl opacity-40" />
          <div className="container relative mx-auto px-4 py-8">
            <Link to="/" className="text-sm font-medium text-foreground hover:text-accent-green transition-colors animate-enter">← Edit search</Link>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight animate-enter" style={{ animationDelay: '80ms' }}>
              {loading ? (
                <Skeleton className="inline-block h-10 w-80 align-middle" />
              ) : (
                <><span className="bg-accent-green/30 px-2 rounded-xl">{results.length.toLocaleString()}</span> colleges match your profile</>
              )}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2 text-sm animate-enter" style={{ animationDelay: '160ms' }}>
              <Pill>Rank {search.rank.toLocaleString()}</Pill>
              <Pill>{catLabel}</Pill>
              <Pill>{search.gender === "B" ? "Boys" : "Girls"}</Pill>
              {search.branches?.length ? <Pill>{search.branches.length} branches</Pill> : null}
              {search.districts?.length ? <Pill>{search.districts.length} districts</Pill> : null}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Input
              placeholder="Search college, branch or place..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex flex-wrap gap-1.5 text-xs">
              {(["all","High Chance","Possible","Tough"] as const).map(s => {
                const tint = s === "High Chance" ? "bg-mint" : s === "Possible" ? "bg-peach" : s === "Tough" ? "bg-lavender" : "bg-sky";
                const active = safetyFilter === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSafetyFilter(s)}
                    className={`px-4 py-2 rounded-full font-medium border transition-all duration-200 ease-out active:scale-[0.97] ${active ? `${tint} border-transparent text-foreground shadow-sm` : "bg-card border-border hover:bg-muted hover:-translate-y-0.5 hover:shadow-sm"}`}
                  >
                    {s === "all" ? `All (${results.length})` : `${s} (${counts[s]})`}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_300px] gap-6">
            <div>
              {loading ? (
                <div className="grid gap-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <CollegeCardSkeleton key={i} />
                  ))}
                </div>
              ) : results.length === 0 ? (
                <div className="rounded-xl border border-border bg-card p-12 text-center shadow-sm">
                  <p className="text-lg font-medium">No matches found</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your rank is higher than the last admitted rank for the categories/filters you selected. Try removing branch or district filters.
                  </p>
                  <Link to="/" className="inline-block mt-4 text-primary underline">Try different inputs</Link>
                </div>
              ) : (
                <div className="grid gap-3 animate-fade-in">
                  {filtered.map((r, i) => (
                    <div key={`${r.inst}-${r.bcode}-${i}`}>
                      <CollegeResultCard rank={i + 1} r={r} />
                      {(i + 1) % 10 === 0 && i + 1 < filtered.length && (
                        <div className="my-3">
                          <AdSlot slot={`results-inline-${Math.floor(i / 10)}`} minHeight={120} label="Sponsored" />
                        </div>
                      )}
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground shadow-sm">
                      No results match your search.
                    </div>
                  )}

                  {/* Ad between results and college details section */}
                  {filtered.length > 0 && (
                    <div className="mt-4">
                      <AdSlot slot="results-before-details" minHeight={140} label="Sponsored" />
                    </div>
                  )}

                  {/* College details / next steps */}
                  {filtered.length > 0 && (
                    <div className="mt-2 rounded-xl border border-border bg-card p-6 shadow-sm">
                      <h2 className="text-lg font-semibold">Next steps</h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Click any college name to see its branch-wise 2025 closing ranks across all categories. Use the High Chance picks to anchor your preference list, fill Possible options in the middle, and add Tough ones at the top of your wishlist.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop-only sidebar ad */}
            <aside className="hidden lg:block space-y-4">
              <div className="sticky top-20">
                <AdSlot slot="results-sidebar" minHeight={600} label="Sponsored" />
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyMobileAd />
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-card border border-border/60 px-3 py-1 font-medium shadow-sm">{children}</span>;
}

function SafetyBadge({ safety }: { safety: "High Chance" | "Possible" | "Tough" }) {
  const styles = {
    "High Chance": "bg-mint text-foreground",
    "Possible": "bg-peach text-foreground",
    "Tough": "bg-lavender text-foreground",
  }[safety];
  return <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>{safety}</span>;
}

type ResultRow = ReturnType<typeof predict>[number];

function CollegeResultCard({ rank, r }: { rank: number; r: ResultRow }) {
  const delayMs = Math.min((rank - 1) * 50, 400);
  return (
    <article className="group rounded-3xl border border-border/60 bg-card p-5 md:p-6 shadow-[0_4px_20px_-10px_rgba(15,17,23,0.1)] hover:shadow-[0_12px_32px_-10px_rgba(15,17,23,0.18)] hover:-translate-y-1 hover:border-accent-green/20 transition-all duration-300 ease-out will-change-transform animate-enter-subtle" style={{ animationDelay: `${delayMs}ms` }}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-muted font-mono font-semibold text-foreground">#{rank}</span>
            <span className="font-mono">{r.inst}</span>
            <span>·</span>
            <span>{r.type}</span>
            {r.coed === "GIRLS" && <span className="px-2 py-0.5 rounded-full bg-lavender text-foreground font-medium">Girls</span>}
          </div>
          <Link
            to="/colleges/$inst"
            params={{ inst: r.inst }}
            className="mt-2 block font-semibold text-base md:text-lg text-foreground hover:text-accent-green transition-colors duration-200"
          >
            {r.name}
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky font-medium transition-transform duration-200 group-hover:scale-[1.02]">
              {r.branch}
              <span className="text-xs font-mono opacity-70">({r.bcode})</span>
            </span>
            <span className="text-muted-foreground">
              📍 {r.place}, {DISTRICT_NAMES[r.dist] ?? r.dist}
            </span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <SafetyBadge safety={r.safety} />
          <div className="mt-3 text-xs text-muted-foreground">Last cutoff</div>
          <div className="font-mono font-bold text-lg text-foreground">{r.closing.toLocaleString()}</div>
        </div>
      </div>
    </article>
  );
}

function CollegeCardSkeleton() {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-5 md:p-6 shadow-[0_4px_20px_-10px_rgba(15,17,23,0.1)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-10 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-7 w-32 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="shrink-0 text-right space-y-2">
          <Skeleton className="h-6 w-24 rounded-full ml-auto" />
          <Skeleton className="h-3 w-16 ml-auto" />
          <Skeleton className="h-6 w-20 ml-auto" />
        </div>
      </div>
    </div>
  );
}
