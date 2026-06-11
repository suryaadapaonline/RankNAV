import { Fragment } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ALL_ROWS, CATEGORIES, DISTRICT_NAMES, type CutoffRow } from "@/lib/predictor";

export const Route = createFileRoute("/colleges/$inst")({
  loader: ({ params }) => {
    const rows = ALL_ROWS.filter(r => r.inst === params.inst.toUpperCase());
    if (rows.length === 0) throw notFound();
    return { rows };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.rows[0]?.name ?? "College";
    return {
      meta: [
        { title: `${name} — Cutoffs & Branches | TG EAPCET 2026` },
        { name: "description", content: `${name} TGEAPCET 2025 closing ranks across all branches and categories.` },
      ],
    };
  },
  component: CollegePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">College not found</h1>
        <Link to="/colleges" className="text-primary underline mt-4 inline-block">Browse all colleges</Link>
      </main>
    </div>
  ),
});

function CollegePage() {
  const { rows } = Route.useLoaderData();
  const c = rows[0];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/colleges" className="text-sm text-primary hover:underline">← All colleges</Link>
        <h1 className="mt-2 text-3xl font-bold">{c.name}</h1>
        <div className="mt-1 text-muted-foreground">
          {c.place} · {DISTRICT_NAMES[c.dist] ?? c.dist} · <span className="font-mono text-xs">{c.inst}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1 text-xs">
          <span className="rounded bg-muted px-2 py-0.5">{c.type}</span>
          <span className="rounded bg-muted px-2 py-0.5">{c.coed === "GIRLS" ? "Girls only" : "Co-ed"}</span>
          <span className="rounded bg-muted px-2 py-0.5">Affiliated to {c.aff}</span>
        </div>

        <h2 className="mt-8 text-xl font-bold">Branch-wise Closing Ranks (2025 Final Phase)</h2>
        <p className="text-sm text-muted-foreground">B = Boys, G = Girls. Blank = no admission / data not available.</p>

        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-xs">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-2 py-2 sticky left-0 bg-muted z-10">Branch</th>
                {CATEGORIES.map(cat => (
                  <th key={cat.value} colSpan={2} className="text-center px-1 py-2 border-l border-border">{cat.label}</th>
                ))}
              </tr>
              <tr className="text-[10px]">
                <th className="sticky left-0 bg-muted z-10"></th>
                {CATEGORIES.map(cat => (
                  <Fragment key={cat.value}>
                    <th className="px-1 py-1 border-l border-border">B</th>
                    <th className="px-1 py-1">G</th>
                  </Fragment>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r: CutoffRow) => (
                <tr key={r.bcode} className="hover:bg-muted/40">
                  <td className="px-2 py-2 sticky left-0 bg-card z-10 min-w-[200px]">
                    <div className="font-medium">{r.branch}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{r.bcode}</div>
                  </td>
                  {CATEGORIES.map(cat => (
                    <Fragment key={cat.value}>
                      <td className="px-1 py-2 text-right font-mono border-l border-border">{r.c[`${cat.value}_B`]?.toLocaleString() ?? "—"}</td>
                      <td className="px-1 py-2 text-right font-mono">{r.c[`${cat.value}_G`]?.toLocaleString() ?? "—"}</td>
                    </Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
