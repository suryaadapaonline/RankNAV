import { createFileRoute } from "@tanstack/react-router";
import { PredictorForm } from "@/components/PredictorForm";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { AdSlot, StickyMobileAd } from "@/components/AdSlot";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TG EAPCET 2026 College Predictor — Find Your Engineering College" },
      { name: "description", content: "Predict TG EAPCET 2026 engineering college admissions using previous years last-rank cutoff data. Free, instant, no signup." },
      { property: "og:title", content: "TG EAPCET 2026 College Predictor" },
      { property: "og:description", content: "Enter your rank, category and branch — get colleges you can target, instantly." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Soft pastel background blobs */}
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-mint blur-3xl opacity-60" />
          <div aria-hidden className="pointer-events-none absolute top-32 -right-20 h-80 w-80 rounded-full bg-lavender blur-3xl opacity-60" />
          <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-peach blur-3xl opacity-50" />

          <div className="container relative mx-auto px-4 py-14 md:py-20 text-5xl">
            <div className="lg:flex lg:items-start lg:gap-6">
              {/* Desktop-only left ad */}
              <aside className="hidden lg:block lg:w-[200px] lg:shrink-0">
                <AdSlot slot="hero-left" minHeight={600} label="Sponsored" className="rounded-3xl bg-card border-border/60 sticky top-24" />
              </aside>

              <div className="lg:flex-1 lg:min-w-0">
                <div className="mx-auto max-w-3xl text-left">
                  <div className="inline-flex items-center gap-2 rounded-full bg-card border border-border/60 shadow-sm px-3 py-1.5 text-xs font-semibold text-foreground mb-5 animate-enter">
                    <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
                    Based on TGEAPCET Previous years CutOffs
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.15] animate-enter py-[15px] my-0" style={{ animationDelay: '80ms' }}>
                    Find your <span className="bg-mint px-3 rounded-2xl inline-block pb-1">engineering</span> college,<br />
                    in <span className="bg-peach rounded-2xl px-[9px] inline-block pb-1">seconds</span>.
                  </h1>
                  <p className="mt-5 text-lg text-muted-foreground max-w-2xl animate-enter" style={{ animationDelay: '160ms' }}>
                    Enter your expected TG EAPCET 2026 rank and instantly see the colleges and branches you're most likely to get — built on the official previous years last-rank statement.
                  </p>
                </div>

                <div className="mx-auto mt-10 max-w-3xl space-y-6 animate-enter" style={{ animationDelay: '240ms' }}>
                  <div className="rounded-3xl bg-card shadow-[0_10px_40px_-12px_rgba(15,17,23,0.12)] p-6 md:p-8 border border-border/60">
                    <PredictorForm />
                  </div>

                  {/* Telegram CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="https://t.me/inter_apts"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-muted hover:-translate-y-0.5 hover:shadow-md hover:border-[#229ED9]/40 transition-all duration-200 ease-out"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#229ED9" aria-hidden="true"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
                      Join Our Telegram Group
                    </a>
                    <a
                      href="https://t.me/inter2023ap"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-muted hover:-translate-y-0.5 hover:shadow-md hover:border-[#229ED9]/40 transition-all duration-200 ease-out"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#229ED9" aria-hidden="true"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>
                      Join Our Telegram Channel
                    </a>
                  </div>

                  {/* Visible ad right below the Predict button */}
                  <AdSlot slot="home-below-predict" minHeight={120} label="Sponsored" className="rounded-3xl bg-card border-border/60" />
                </div>
              </div>

              {/* Desktop-only right ad */}
              <aside className="hidden lg:block lg:w-[200px] lg:shrink-0">
                <AdSlot slot="hero-right" minHeight={600} label="Sponsored" className="rounded-3xl bg-card border-border/60 sticky top-24" />
              </aside>
            </div>
          </div>
        </section>



        {/* How it works */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold animate-enter-subtle">How it works</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <Step n={1} title="Enter your details" delay="0ms">
              Provide your expected TG EAPCET 2026 rank, category, and gender. Optionally narrow by preferred branches or districts.
            </Step>
            <Step n={2} title="We match against Previous Year cutoffs" delay="100ms">
              We compare your rank against the last admitted rank for every college-branch-category combination from the Previous Phases.

            </Step>
            <Step n={3} title="See High Chance / Possible / Tough picks" delay="200ms">
              Results are sorted from best chance to most ambitious, with each option tagged so you can plan your preference list.
            </Step>
          </div>

          <div className="mt-10 rounded-lg border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
            <strong className="text-foreground">Disclaimer:</strong> Cutoffs change every year based on the candidate pool, seat matrix, and reservation rules. Use these predictions as a planning tool, not a guarantee.
          </div>
        </section>

        {/* Ad before FAQ */}
        <section className="container mx-auto px-4 pb-6">
          <AdSlot slot="home-before-faq" minHeight={100} label="Sponsored" />
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold animate-enter-subtle">Frequently asked questions</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <Faq q="Is this an official predictor?" delay="0ms">
              No — this is an independent planning tool built on the publicly released previous years last-rank statement.
            </Faq>
            <Faq q="How accurate is the prediction?" delay="80ms">
              Predictions are indicative. 2026 cutoffs will shift slightly based on the candidate pool and seat matrix, so treat High Chance / Possible / Tough as a planning guide.
            </Faq>
            <Faq q="Which categories are supported?" delay="160ms">
              All TG EAPCET categories — OC, BC-A through BC-E, SC, ST, EWS — for both Boys and Girls quotas.
            </Faq>
            <Faq q="Do I need to sign up?" delay="240ms">
              No. The predictor is completely free and works without an account.
            </Faq>
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyMobileAd />
    </div>
  );
}

function Faq({ q, delay = "0ms", children }: { q: string; delay?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-accent-green/20 transition-all duration-300 ease-out will-change-transform animate-enter-subtle" style={{ animationDelay: delay }}>
      <h3 className="font-semibold">{q}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}


function Step({ n, title, delay = "0ms", children }: { n: number; title: string; delay?: string; children: React.ReactNode }) {
  const tints = ["bg-mint", "bg-sky", "bg-peach"];
  const tint = tints[(n - 1) % tints.length];
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-accent-green/20 transition-all duration-300 ease-out will-change-transform animate-enter-subtle" style={{ animationDelay: delay }}>
      <div className={`h-10 w-10 rounded-2xl ${tint} text-foreground grid place-items-center font-bold`}>{n}</div>
      <h3 className="mt-4 font-semibold text-lg">{title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
