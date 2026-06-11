import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TG EAPCET 2026 College Predictor" },
      { name: "description", content: "How the TG EAPCET predictor works, data source, and limitations." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-bold">About RankNav</h1>

        <section className="mt-6 space-y-4 text-muted-foreground">
          <p>
            RankNav helps TG EAPCET / EAMCET aspirants predict engineering colleges and branches they're likely to get, based on their rank, category, gender, and preferences. Predictions use historical cutoff data and are meant as <strong>guidance only</strong> — not a guarantee of admission.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6">Our mission</h2>
          <p>
            To help every TG EAPCET aspirant make informed admission decisions — with transparent data, no signups, no paywalls, and no hype. Counselling is stressful enough; the right college list shouldn't be guesswork.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6">Data source</h2>
          <p>
            All predictions are derived from the <strong>TGEAPCET Previous years Last Rank Statement</strong> published by TGCHE. This dataset contains the last admitted rank for every college-branch combination, broken down by category (OC, BC-A/B/C/D/E, SC-I/II/III, ST, EWS) and gender (Boys/Girls).
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-6">How the prediction works</h2>
          <p>
            For your inputs, we find every college-branch row where the previous years last admitted rank for your specific category &amp; gender is greater than or equal to your rank. Results are sorted by closing rank (best match first) and tagged:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-green-700 dark:text-green-400">High Chance</strong> — your rank is well below the cutoff (very likely to get).</li>
            <li><strong className="text-amber-700 dark:text-amber-400">Possible</strong> — comfortable margin, decent chance.</li>
            <li><strong className="text-red-700 dark:text-red-400">Tough</strong> — close to the cutoff, ambitious pick.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-6">Limitations</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Cutoffs vary year to year based on candidate pool and seat matrix changes.</li>
            <li>New colleges, branches or seat increases for 2026 are not reflected.</li>
            <li>Special quotas (NCC, sports, PWD, etc.) are not modeled.</li>
            <li>This is a planning aid only. Always verify with official TGCHE counselling.</li>
          </ul>

          <p className="pt-2">
            Read our <Link to="/disclaimer" className="text-primary hover:underline">Disclaimer</Link>, <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, and <Link to="/terms" className="text-primary hover:underline">Terms</Link>, or <Link to="/contact" className="text-primary hover:underline">contact us</Link> with feedback.
          </p>
        </section>

        <div className="mt-8">
          <Link to="/" className="inline-flex items-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">Try the predictor →</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
