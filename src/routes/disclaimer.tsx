import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — RankNav TG EAPCET Predictor" },
      { name: "description", content: "RankNav is an independent tool and not affiliated with TG EAPCET, TGCHE, or JNTUH. Predictions are estimates." },
      { property: "og:title", content: "Disclaimer — RankNav" },
      { property: "og:description", content: "Independent, unofficial predictor — verify with official TGCHE counselling." },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-bold">Disclaimer</h1>

        <section className="mt-6 space-y-4 text-muted-foreground">
          <h2 className="text-xl font-semibold text-foreground mt-2">Not an official source</h2>
          <p>RankNav is an <strong>independent, unofficial</strong> tool.</p>

          <h2 className="text-xl font-semibold text-foreground mt-6">Data source</h2>
          <p>Cutoff data and predictions are derived from publicly available historical information, primarily the TGEAPCET previous years last-rank statement.</p>

          <h2 className="text-xl font-semibold text-foreground mt-6">Predictions are estimates</h2>
          <p>College predictions are statistical estimates based on past cutoffs. Actual 2026 cutoffs depend on the candidate pool, seat matrix, reservation rules, and counselling decisions, and <strong>may differ significantly</strong> from past trends.</p>

          <h2 className="text-xl font-semibold text-foreground mt-6">Verify with official sources</h2>
          <p>Always verify branch availability, eligibility, fee structure, and final allotment through the official TGCHE counselling portal and your allotment order. Official counselling results are the only authoritative outcome.</p>

          <p className="mt-6">For more details, read our <Link to="/terms" className="text-primary hover:underline">Terms</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
