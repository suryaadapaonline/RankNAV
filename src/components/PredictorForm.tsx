import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CATEGORIES, META, DISTRICT_NAMES, type Category, type Gender } from "@/lib/predictor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Branches ordered by current demand/popularity among TG EAPCET aspirants.
// Higher = more sought-after. Anything not listed falls to the bottom alphabetically.
const POPULARITY: string[] = [
  "CSE",  // Computer Science
  "CSM",  // CSE - AI & ML
  "AID",  // AI & Data Science
  "CSD",  // CSE - Data Science
  "AIM",  // AI & ML
  "AI",   // Artificial Intelligence
  "CSA",  // CSE - AI
  "INF",  // Information Technology
  "CSC",  // CSE - Cyber Security
  "CIC",  // CSE - IoT & Cyber Security
  "CSO",  // CSE - IoT
  "CSN",  // CSE - Networks
  "CSI",  // CSE & IT
  "CSB",  // CSE - Business Systems
  "CSG",  // CS & Design
  "CME",  // Computer Engineering
  "CSW",  // Computer Engg (Software)
  "ECE",  // Electronics & Communication
  "ECM",  // Electronics & Computer
  "EVL",  // Electronics VLSI
  "ECI",  // Electronics Comm & Instrumentation
  "EIE",  // Electronics & Instrumentation
  "ETM",  // Electronics & Telematics
  "EEE",  // Electrical & Electronics
  "MEC",  // Mechanical
  "MCT",  // Mechatronics
  "CIV",  // Civil
  "CHE",  // Chemical
  "BME",  // Bio-Medical
  "BIO",  // Bio-Technology
  "AUT",  // Automobile
  "ANE",  // Aeronautical
  "MET",  // Metallurgical
  "MIN",  // Mining
  "AGR",  // Agricultural
  "FDT",  // Food Technology
  "DRG",  // Dairying
  "GEO",  // Geo Informatics
  "BSE",  // Building Services
  "DTD",  // Digital Techniques for Design
];

const SORTED_BRANCHES = [...META.branches].sort((a, b) => {
  const ai = POPULARITY.indexOf(a.code);
  const bi = POPULARITY.indexOf(b.code);
  if (ai === -1 && bi === -1) return a.name.localeCompare(b.name);
  if (ai === -1) return 1;
  if (bi === -1) return -1;
  return ai - bi;
});

export function PredictorForm({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState<Category>("OC");
  const [gender, setGender] = useState<Gender>("B");
  const [branches, setBranches] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function toggle(list: string[], setList: (s: string[]) => void, val: string) {
    setList(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const r = parseInt(rank, 10);
    if (!r || r < 1) return;
    setSubmitting(true);
    // Brief delay so users see the loading state for fast predictions
    setTimeout(() => {
      navigate({
        to: "/results",
        search: {
          rank: r,
          category,
          gender,
          branches: branches.length ? branches : undefined,
          districts: districts.length ? districts : undefined,
          types: types.length ? types : undefined,
        },
      });
    }, 500);
  }

  const TYPE_LABELS: Record<string, string> = {
    GOV: "Government",
    UNIV: "University",
    PVT: "Private",
    SF: "Self-Finance",
  };
  const TYPE_OPTIONS = ["GOV", "UNIV", "PVT", "SF"];

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className={`grid gap-4 ${compact ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
        <div className="space-y-2">
          <Label htmlFor="rank">EAPCET Rank</Label>
          <Input
            id="rank"
            type="number"
            inputMode="numeric"
            placeholder="e.g. 25000"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            min={1}
            required
            className="text-lg font-medium"
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select value={gender} onValueChange={(v) => setGender(v as Gender)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="B">Boys</SelectItem>
              <SelectItem value="G">Girls</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {compact && (
          <div className="flex items-end">
            <Button type="submit" variant="cta" size="lg" className="w-full" disabled={submitting}>
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
                  Predicting...
                </span>
              ) : "Predict Colleges"}
            </Button>
          </div>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-primary hover:underline"
        >
          {showAdvanced ? "− Hide" : "+ Add"} branch, district & college type filters
        </button>
      </div>

      {showAdvanced && (
        <div className="space-y-4 rounded-lg border border-border p-4 bg-muted/30">
          <div>
            <Label className="text-sm font-medium">College Type</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {TYPE_OPTIONS.map(t => (
                <button
                  type="button"
                  key={t}
                  onClick={() => toggle(types, setTypes, t)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ease-out active:scale-[0.96] ${types.includes(t) ? "bg-accent-green text-primary border-accent-green shadow-sm hover:shadow-md" : "bg-card border-border hover:bg-muted hover:-translate-y-0.5 hover:shadow-sm"}`}
                >
                  {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Branches ({SORTED_BRANCHES.length})</Label>
            <p className="text-xs text-muted-foreground mt-1">Sorted by current demand — top of the list is most popular.</p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-1 max-h-72 overflow-auto rounded-md border border-border bg-background p-2">
              {SORTED_BRANCHES.map(b => (
                <label key={b.code} className="flex items-center gap-2 text-xs px-2 py-1 rounded hover:bg-muted cursor-pointer">
                  <Checkbox
                    checked={branches.includes(b.code)}
                    onCheckedChange={() => toggle(branches, setBranches, b.code)}
                  />
                  <span><span className="font-mono text-muted-foreground">{b.code}</span> {b.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Districts</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {META.districts.map(d => (
                <button
                  type="button"
                  key={d}
                  onClick={() => toggle(districts, setDistricts, d)}
                  className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200 ease-out active:scale-[0.96] ${districts.includes(d) ? "bg-sky border-sky text-foreground shadow-sm hover:shadow-md" : "bg-card border-border hover:bg-muted hover:-translate-y-0.5 hover:shadow-sm"}`}
                >
                  {DISTRICT_NAMES[d] ?? d}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!compact && (
        <Button type="submit" variant="cta" size="lg" className="w-full md:w-auto" disabled={submitting}>
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
              Predicting your colleges...
            </span>
          ) : "Predict My Colleges →"}
        </Button>
      )}
    </form>
  );
}
