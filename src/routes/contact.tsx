import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — RankNav TG EAPCET Predictor" },
      { name: "description", content: "Get in touch for feedback, corrections, partnerships, or technical issues with the TG EAPCET college predictor." },
      { property: "og:title", content: "Contact RankNav" },
      { property: "og:description", content: "Reach the RankNav team for support, feedback, or partnerships." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError(null);
    const body = `From: ${form.name} <${form.email}>\n\n${form.message}`;
    window.location.href = `mailto:postboxno0143@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-2xl">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-3 text-muted-foreground">
          Have feedback, found a correction, want to partner, or hit a technical issue? Send us a message — we read every one.
        </p>

        <div className="mt-6 rounded-3xl border border-border/60 bg-card p-6 shadow-sm space-y-2 text-sm">
          <p><strong className="text-foreground">Email:</strong> <a className="text-primary hover:underline" href="mailto:postboxno0143@gmail.com">postboxno0143@gmail.com</a></p>
          <p><strong className="text-foreground">Telegram:</strong> <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" href="https://t.me/suryaaheree">@suryaaheree</a></p>
          <p><strong className="text-foreground">Telegram Group:</strong> <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" href="https://t.me/inter_apts">t.me/inter_apts</a></p>
          <p><strong className="text-foreground">Telegram Channel:</strong> <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" href="https://t.me/inter2023ap">t.me/inter2023ap</a></p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 rounded-3xl border border-border/60 bg-card p-6 shadow-sm space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="name">Name</label>
            <input id="name" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input id="email" type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="subject">Subject</label>
            <input id="subject" required maxLength={150} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="message">Message</label>
            <textarea id="message" required maxLength={1000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1 w-full rounded-xl border border-border/60 bg-background px-3 py-2 text-sm" />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {sent && <p className="text-sm text-green-700">Your email client should have opened. If not, write to postboxno0143@gmail.com directly.</p>}
          <button type="submit" className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition">Send Message</button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          See our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link to="/terms" className="text-primary hover:underline">Terms</Link>.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
