// Reserved AdSense container. Replace the inner markup with the real
// <ins class="adsbygoogle"> snippet once AdSense is approved.
import { cn } from "@/lib/utils";

type Props = {
  slot: string;
  className?: string;
  label?: string;
  minHeight?: number;
};

export function AdSlot({ slot, className, label = "Advertisement", minHeight = 90 }: Props) {
  return (
    <div
      data-ad-slot={slot}
      className={cn(
        "w-full rounded-xl border border-dashed border-border bg-muted/40 text-muted-foreground",
        "grid place-items-center text-[11px] uppercase tracking-wider",
        className,
      )}
      style={{ minHeight }}
      aria-label={label}
      role="complementary"
    >
      <span className="opacity-60">{label} · {slot}</span>
    </div>
  );
}

export function StickyMobileAd() {
  return (
    <div className="md:hidden sticky bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur">
      <AdSlot slot="mobile-footer" minHeight={60} className="rounded-none border-0 border-t border-dashed" />
    </div>
  );
}
