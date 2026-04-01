/* ─────────────────────────────────────────────────────────────────────────────
   utils/sequenceUtils.js
   Pure helpers for parsing and analyzing amino acid sequences
   ───────────────────────────────────────────────────────────────────────────── */

import { VALID_AA, AA_GROUPS } from "../data/constants.js";

/**
 * Strip FASTA header and whitespace, return raw uppercase sequence.
 */
export function parseFasta(raw) {
  return raw
    .split("\n")
    .filter((line) => !line.startsWith(">"))
    .join("")
    .toUpperCase()
    .replace(/\s/g, "");
}

/**
 * Full analysis of a sequence string.
 * @returns {{ score, clean, comp, valid, len, msg, groupCounts }}
 */
export function analyzeSequence(raw) {
  const clean = parseFasta(raw);

  if (!clean.length) {
    return { score: 0, clean: "", comp: {}, valid: false, len: 0, msg: "Empty sequence", groupCounts: {} };
  }

  const validChars = [...clean].filter((c) => VALID_AA.has(c));
  const score = Math.round((validChars.length / clean.length) * 100);

  // Per-residue composition
  const comp = {};
  for (const c of clean) {
    if (VALID_AA.has(c)) comp[c] = (comp[c] || 0) + 1;
  }

  // Per-group composition
  const groupCounts = {};
  for (const [group, { aas, color }] of Object.entries(AA_GROUPS)) {
    const cnt = aas.reduce((s, a) => s + (comp[a] || 0), 0);
    if (cnt > 0) groupCounts[group] = { cnt, color };
  }

  let msg;
  if (score === 100) msg = "Valid protein sequence";
  else if (score >= 85) msg = "Mostly valid — minor non-standard characters detected";
  else if (score >= 50) msg = "Partially valid — significant non-AA characters found";
  else msg = "Low validity — check for non-standard characters";

  return { score, clean, comp, valid: score >= 85, len: clean.length, msg, groupCounts };
}

/**
 * Validity bar color based on score.
 */
export function validityColor(score) {
  if (score === 100) return "#00ff9f";
  if (score >= 85)   return "#FFD700";
  return "#FF4500";
}

/**
 * Compare two lists of GO IDs and return agreement stats.
 */
export function compareGOSets(goA, goB) {
  const idsA = new Set(goA.map((t) => t.id));
  const idsB = new Set(goB.map((t) => t.id));
  const shared = [...idsA].filter((id) => idsB.has(id));
  const union  = new Set([...idsA, ...idsB]);
  const jaccard = union.size > 0 ? Math.round((shared.length / union.size) * 100) : 0;
  return { shared: shared.length, total: union.size, jaccard };
}
