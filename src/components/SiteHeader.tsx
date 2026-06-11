import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/ranknav-logo.png.asset.json";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-nav text-nav-foreground">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <img src={logoAsset.url} alt="RankNav logo" className="h-9 w-9 rounded-2xl object-contain bg-white" />
          <span className="tracking-tight">RankNav</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link to="/" className="px-3 py-2 rounded-full text-nav-foreground/70 hover:text-nav-foreground hover:bg-white/10" activeOptions={{ exact: true }} activeProps={{ className: "px-3 py-2 rounded-full bg-white/15 text-nav-foreground font-medium" }}>Predict</Link>
          <Link to="/colleges" className="px-3 py-2 rounded-full text-nav-foreground/70 hover:text-nav-foreground hover:bg-white/10" activeProps={{ className: "px-3 py-2 rounded-full bg-white/15 text-nav-foreground font-medium" }}>Colleges</Link>
          <Link to="/about" className="px-3 py-2 rounded-full text-nav-foreground/70 hover:text-nav-foreground hover:bg-white/10" activeProps={{ className: "px-3 py-2 rounded-full bg-white/15 text-nav-foreground font-medium" }}>About</Link>
          <Link to="/contact" className="hidden sm:inline-flex px-3 py-2 rounded-full text-nav-foreground/70 hover:text-nav-foreground hover:bg-white/10" activeProps={{ className: "px-3 py-2 rounded-full bg-white/15 text-nav-foreground font-medium" }}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60">
      <div className="container mx-auto px-4 py-10 text-sm text-muted-foreground">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-semibold text-foreground">RankNav</p>
            <p className="mt-2">TG EAPCET 2026 college predictor. Based on TGEAPCET 2025 Final Phase last-rank statement. For guidance only — verify with official TGCHE counselling.</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Site</p>
            <ul className="mt-2 space-y-1.5">
              <li><Link to="/" className="hover:text-foreground">Predict</Link></li>
              <li><Link to="/colleges" className="hover:text-foreground">Colleges</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">Legal</p>
            <ul className="mt-2 space-y-1.5">
              <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground">Terms &amp; Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} RankNav. All rights reserved.</p>
          <p>Not affiliated with TG EAPCET, TGCHE, or JNTUH.</p>
        </div>
      </div>
    </footer>
  );
}
