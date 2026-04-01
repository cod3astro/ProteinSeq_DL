/* ─────────────────────────────────────────────────────────────────────────────
   data/constants.js
   All shared data: amino acid palettes, GO term mocks, model definitions
   ───────────────────────────────────────────────────────────────────────────── */

export const VALID_AA = new Set("ACDEFGHIKLMNPQRSTVWY");

export const AA_COLORS = {
  A: "#7CFC00", V: "#7CFC00", I: "#7CFC00", L: "#7CFC00", M: "#7CFC00",
  F: "#FF69B4", W: "#FF69B4", Y: "#FF69B4",
  S: "#FF8C00", T: "#FF8C00",
  C: "#FFD700",
  H: "#1E90FF", K: "#1E90FF", R: "#1E90FF",
  D: "#FF4500", E: "#FF4500",
  N: "#00CED1", Q: "#00CED1",
  G: "#AAAAAA", P: "#AAAAAA",
};

export const AA_GROUPS = {
  Hydrophobic: { aas: ["A", "V", "I", "L", "M"], color: "#7CFC00" },
  Aromatic:    { aas: ["F", "W", "Y"],            color: "#FF69B4" },
  "Polar (OH)":{ aas: ["S", "T"],                 color: "#FF8C00" },
  Sulfur:      { aas: ["C"],                       color: "#FFD700" },
  Positive:    { aas: ["H", "K", "R"],             color: "#1E90FF" },
  Negative:    { aas: ["D", "E"],                  color: "#FF4500" },
  Amide:       { aas: ["N", "Q"],                  color: "#00CED1" },
  Special:     { aas: ["G", "P"],                  color: "#AAAAAA" },
};

// ─── GO Terms returned by YOUR model (mock) ────────────────────────────────────
export const MY_MODEL_GO = [
  {
    id: "GO:0003824",
    name: "Catalytic Activity",
    category: "Molecular Function",
    confidence: 0.94,
    color: "#00ff9f",
    description: "Catalysis of a biochemical reaction at physiological temperatures. Essential enzyme activity.",
  },
  {
    id: "GO:0005488",
    name: "Binding",
    category: "Molecular Function",
    confidence: 0.87,
    color: "#00ff9f",
    description: "Selective, non-covalent, often stoichiometric interaction with a molecule or ion.",
  },
  {
    id: "GO:0009058",
    name: "Biosynthetic Process",
    category: "Biological Process",
    confidence: 0.79,
    color: "#00d4ff",
    description: "A chemical reaction or pathway resulting in the formation of a substance.",
  },
  {
    id: "GO:0005829",
    name: "Cytosol",
    category: "Cellular Component",
    confidence: 0.71,
    color: "#bf5fff",
    description: "The part of the cytoplasm that does not contain organelles or membrane systems.",
  },
  {
    id: "GO:0006807",
    name: "Nitrogen Compound Metabolism",
    category: "Biological Process",
    confidence: 0.65,
    color: "#00d4ff",
    description: "Chemical reactions and pathways involving nitrogen-containing compounds.",
  },
];

// ─── ESM-2 predictions (mock) ──────────────────────────────────────────────────
export const ESM2_GO = [
  {
    id: "GO:0003824",
    name: "Catalytic Activity",
    category: "Molecular Function",
    confidence: 0.97,
    color: "#00ff9f",
    description: "Strong agreement — ESM-2 assigns very high catalytic probability via its 650M parameter embedding.",
  },
  {
    id: "GO:0016740",
    name: "Transferase Activity",
    category: "Molecular Function",
    confidence: 0.91,
    color: "#00ff9f",
    description: "Transfer of a functional group from one compound to another. Subcategory of catalytic activity.",
  },
  {
    id: "GO:0005488",
    name: "Binding",
    category: "Molecular Function",
    confidence: 0.84,
    color: "#00ff9f",
    description: "Selective, non-covalent interaction. ESM-2 agrees with high overlap on binding function.",
  },
  {
    id: "GO:0009058",
    name: "Biosynthetic Process",
    category: "Biological Process",
    confidence: 0.76,
    color: "#00d4ff",
    description: "Biosynthetic process. ESM-2 shows similar but slightly lower confidence vs your model.",
  },
  {
    id: "GO:0044238",
    name: "Primary Metabolic Process",
    category: "Biological Process",
    confidence: 0.68,
    color: "#00d4ff",
    description: "Metabolism of compounds central to cell biology. Not predicted by your model.",
  },
];

// ─── ESMFold (structure-informed) predictions (mock) ──────────────────────────
export const ESMFOLD_GO = [
  {
    id: "GO:0003824",
    name: "Catalytic Activity",
    category: "Molecular Function",
    confidence: 0.96,
    color: "#00ff9f",
    description: "Structurally-inferred catalytic activity based on predicted 3D fold. High confidence.",
  },
  {
    id: "GO:0005488",
    name: "Binding",
    category: "Molecular Function",
    confidence: 0.89,
    color: "#00ff9f",
    description: "Binding pocket detected from predicted tertiary structure. Strong structural evidence.",
  },
  {
    id: "GO:0043167",
    name: "Ion Binding",
    category: "Molecular Function",
    confidence: 0.82,
    color: "#00ff9f",
    description: "Metal ion coordination predicted from structural motifs. Not found in your model.",
  },
  {
    id: "GO:0005829",
    name: "Cytosol",
    category: "Cellular Component",
    confidence: 0.78,
    color: "#bf5fff",
    description: "Cytosolic localization inferred from surface hydrophilicity and lack of signal peptide.",
  },
  {
    id: "GO:0006807",
    name: "Nitrogen Compound Metabolism",
    category: "Biological Process",
    confidence: 0.62,
    color: "#00d4ff",
    description: "Consistent with your model but lower confidence due to structural ambiguity.",
  },
];

// ─── Model metadata ────────────────────────────────────────────────────────────
export const MODELS = [
  {
    key: "mine",
    name: "Your Model",
    shortName: "Custom DL",
    version: "v1.0",
    org: "You",
    color: "#00ff9f",
    description: "Custom deep learning model trained for protein function prediction. Replace mock results with your actual API endpoint.",
    params: "Custom",
    approach: "Sequence-based",
    goTerms: MY_MODEL_GO,
  },
  {
    key: "esm2",
    name: "ESM-2",
    shortName: "ESM-2 650M",
    version: "650M",
    org: "Meta AI",
    color: "#00d4ff",
    description: "Meta's protein language model trained on 250M+ protein sequences. State-of-the-art sequence embeddings.",
    params: "650M",
    approach: "Language model",
    goTerms: ESM2_GO,
  },
  {
    key: "esmfold",
    name: "ESMFold",
    shortName: "ESMFold",
    version: "v1",
    org: "Meta AI",
    color: "#bf5fff",
    description: "End-to-end atomic structure prediction from sequence, using structural features to infer function.",
    params: "690M",
    approach: "Structure-based",
    goTerms: ESMFOLD_GO,
  },
];

// ─── Prediction summary (mock) ─────────────────────────────────────────────────
export const PREDICTION_SUMMARY =
  "This sequence exhibits strong catalytic properties consistent with an enzyme involved in nitrogen metabolism. " +
  "The predicted GO terms suggest it may function as a transferase or ligase in cytosolic biosynthetic pathways. " +
  "Cross-model agreement is high for catalytic activity and binding, with divergence on specific metabolic subcategories.";
