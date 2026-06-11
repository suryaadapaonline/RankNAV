import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — RankNav TG EAPCET Predictor" },
      { name: "description", content: "How RankNav collects, uses, and protects your data, including analytics and advertising cookies." },
      { property: "og:title", content: "Privacy Policy — RankNav" },
      { property: "og:description", content: "How we handle data, analytics, and ad cookies on RankNav." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>

        <section className="mt-6 space-y-4 text-muted-foreground">
          <p>RankNav ("we", "us") respects your privacy. This policy explains what information we collect when you use our TG EAPCET college predictor and how we use it.</p>

          <h2 className="text-xl font-semibold text-foreground mt-6">Information we collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Predictor inputs:</strong> rank, category, gender, branch and district preferences. These are processed in your browser to generate predictions and are not stored on our servers.</li>
            <li><strong>Contact form submissions:</strong> name, email, subject and message you send via our <Link to="/contact" className="text-primary hover:underline">Contact</Link> page.</li>
            <li><strong>Analytics &amp; cookies:</strong> standard logs, device/browser info, and cookies via Google Analytics to understand site usage.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-6">Advertising</h2>
          <p>We use Google AdSense to display ads. Google and its partners may use cookies to serve ads based on prior visits to this and other websites. You can opt out of personalized advertising via <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" href="https://www.google.com/settings/ads">Google Ads Settings</a>.</p>

          <h2 className="text-xl font-semibold text-foreground mt-6">How we use information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To operate and improve the predictor.</li>
            <li>To respond to contact-form inquiries.</li>
            <li>To measure aggregate site usage and ad performance.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-6">Sharing</h2>
          <p>We do <strong>not</strong> sell your personal information. Limited data may be processed by third-party services we use (Google Analytics, Google AdSense, hosting providers) strictly to provide the service.</p>

          <h2 className="text-xl font-semibold text-foreground mt-6">Your rights</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Request access to or deletion of any contact data you submitted.</li>
            <li>Disable cookies via your browser settings.</li>
            <li>Opt out of personalized ads through Google's preferences.</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-6">Contact</h2>
          <p>Questions? Reach us via the <Link to="/contact" className="text-primary hover:underline">Contact page</Link> or email <a className="text-primary hover:underline" href="mailto:postboxno0143@gmail.com">postboxno0143@gmail.com</a>.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
