import cutoffs from "@/data/cutoffs.json";
import meta from "@/data/meta.json";

export type Category =
  | "OC" | "BCA" | "BCB" | "BCC" | "BCD" | "BCE"
  | "SC1" | "SC2" | "SC3" | "ST" | "EWS";

export type Gender = "B" | "G";

export interface CutoffRow {
  inst: string;
  name: string;
  place: string;
  dist: string;
  coed: string;
  type: string;
  bcode: string;
  branch: string;
  aff: string;
  c: Record<string, number>;
}

export const ALL_ROWS = cutoffs as CutoffRow[];
export const META = meta as {
  colleges: Array<{ inst: string; name: string; place: string; dist: string; coed: string; type: string; aff: string }>;
  branches: Array<{ code: string; name: string }>;
  districts: string[];
};

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "OC", label: "OC" },
  { value: "BCA", label: "BC-A" },
  { value: "BCB", label: "BC-B" },
  { value: "BCC", label: "BC-C" },
  { value: "BCD", label: "BC-D" },
  { value: "BCE", label: "BC-E" },
  { value: "SC1", label: "SC-I" },
  { value: "SC2", label: "SC-II" },
  { value: "SC3", label: "SC-III" },
  { value: "ST", label: "ST" },
  { value: "EWS", label: "EWS" },
];

export const DISTRICT_NAMES: Record<string, string> = {
  HYD: "Hyderabad", RR: "Ranga Reddy", MDL: "Medchal-Malkajgiri", MED: "Medak",
  SRP: "Sangareddy", SDP: "Siddipet", NLG: "Nalgonda", SRC: "Suryapet",
  WGL: "Warangal", HNK: "Hanumakonda", KMR: "Karimnagar", JTL: "Jagtial",
  PDL: "Peddapalli", NZB: "Nizamabad", KGM: "Bhadradri Kothagudem",
  KHM: "Khammam", MBN: "Mahabubnagar", MHB: "Mahabubabad", NPT: "Nagarkurnool",
  SRD: "Suryapet", YBG: "Yadadri Bhuvanagiri", WNP: "Wanaparthy",
};

export function keyFor(cat: Category, g: Gender): string {
  return `${cat}_${g}`;
}

export interface PredictInput {
  rank: number;
  category: Category;
  gender: Gender;
  branches?: string[]; // branch codes
  districts?: string[];
  types?: string[]; // PVT / GOV / UNIV / SF
}

export interface PredictResult extends CutoffRow {
  closing: number;
  safety: "High Chance" | "Possible" | "Tough";
}

export function predict(input: PredictInput): PredictResult[] {
  const key = keyFor(input.category, input.gender);
  const out: PredictResult[] = [];
  for (const r of ALL_ROWS) {
    const closing = r.c[key];
    if (typeof closing !== "number") continue;
    if (input.rank > closing) continue;
    if (input.branches?.length && !input.branches.includes(r.bcode)) continue;
    if (input.districts?.length && !input.districts.includes(r.dist)) continue;
    if (input.types?.length && !input.types.includes(r.type)) continue;
    const gap = closing - input.rank;
    const ratio = gap / Math.max(closing, 1);
    const safety: PredictResult["safety"] =
      ratio > 0.35 ? "High Chance" : ratio > 0.1 ? "Possible" : "Tough";
    out.push({ ...r, closing, safety });
  }
  out.sort((a, b) => a.closing - b.closing);
  return out;
}

const POPULAR_BRANCHES = new Set(["CSE", "CSM", "AIM", "CSD", "INF", "AI", "ECE"]);

function bestClosingFor(inst: string): number {
  let best = Infinity;
  for (const r of ALL_ROWS) {
    if (r.inst !== inst) continue;
    if (!POPULAR_BRANCHES.has(r.bcode)) continue;
    const v = r.c["OC_B"];
    if (typeof v === "number" && v < best) best = v;
  }
  return best;
}

export interface CollegeQuality {
  inst: string;
  bestRank: number;
  tier: 1 | 2 | 3 | 4;
}

function computeCollegeQualities(): Map<string, CollegeQuality> {
  const map = new Map<string, CollegeQuality>();
  for (const c of META.colleges) {
    const best = bestClosingFor(c.inst);
    let tier: 1 | 2 | 3 | 4 = 4;
    if (best <= 15000) tier = 1;
    else if (best <= 40000) tier = 2;
    else if (best <= 80000) tier = 3;
    if (c.type === "GOV" || c.type === "UNIV") {
      tier = Math.max(1, tier - 1) as 1 | 2 | 3 | 4;
    }
    map.set(c.inst, { inst: c.inst, bestRank: best === Infinity ? 999999 : best, tier });
  }
  return map;
}

const COLLEGE_QUALITY = computeCollegeQualities();

export function getCollegeQuality(inst: string): CollegeQuality | undefined {
  return COLLEGE_QUALITY.get(inst);
}
