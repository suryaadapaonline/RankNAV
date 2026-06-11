import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — RankNav TG EAPCET Predictor" },
      { name: "description", content: "Terms governing use of the RankNav TG EAPCET college predictor, including limitations and acceptable use." },
      { property: "og:title", content: "Terms & Conditions — RankNav" },
      { property: "og:description", content: "Rules for using the RankNav college predictor." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-bold">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>

        <section className="mt-6 space-y-4 text-muted-foreground">
          <p>By accessing RankNav you agree to these Terms. If you do not agree, please do not use the site.</p>

          <h2 className="text-xl font-semibold text-foreground mt-6">Educational use only</h2>
          <p>RankNav provides educational and informational content. College predictions are <strong>estimates</strong> based on past cutoff data and do not guarantee admission to any college or branch.</p>

          <h2 className="text-xl font-semibold text-foreground mt-6">No warranty</h2>
          <p>Content is provided "as is" without warranties of any kind. Cutoffs, seat matrices, and counselling rules change every year — official TGCHE counselling results are the only authoritative source.</p>

          <h2 className="text-xl font-semibold text-foreground mt-6">Limitation of liability</h2>
          <p>We are not liable for any admission outcome, loss, or damage arising from use of this site, errors, omissions, or outdated information.</p>

          <h2 className="text-xl font-semibold text-foreground mt-6">Acceptable use</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>No automated scraping, bulk downloading, or reverse-engineering of the predictor.</li>
            <li>No abuse, spam, or attempts to disrupt the service.</li>
            <li>No misrepresenting the data as official TGCHE/JNTUH output.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-6">Changes</h2>
          <p>We may update these terms at any time. Continued use of the site means you accept the latest version.</p>

          <p>See also our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link to="/disclaimer" className="text-primary hover:underline">Disclaimer</Link>.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
