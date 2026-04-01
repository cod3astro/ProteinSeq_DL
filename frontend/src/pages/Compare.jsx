/* ─────────────────────────────────────────────────────────────────────────────
   pages/Compare.jsx
   Side-by-side comparison of your model predictions vs ESM-2 and ESMFold
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import LoadingDNA       from "../components/LoadingDNA.jsx";
import RadialConfidence from "../components/RadialConfidence.jsx";
import ValidityBar      from "../components/ValidityBar.jsx";
import { analyzeSequence, compareGOSets } from "../utils/sequenceUtils.js";
import { MODELS } from "../data/constants.js";

/* ─── Helpers ─────────────────────────────────────────────────────────────────── */

function ModelHeader({ model }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${model.color}33`,
        borderTop: `3px solid ${model.color}`,
        borderRadius: "var(--radius-md)",
        padding: "14px 16px",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: model.color,
          fontFamily: "var(--font-mono)",
          letterSpacing: 2,
          marginBottom: 5,
          opacity: 0.8,
        }}
      >
        {model.org.toUpperCase()}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 3 }}>
        {model.name}
      </div>
      <div
        style={{
          fontSize: 10,
          color: "var(--text-dim)",
          fontFamily: "var(--font-mono)",
          marginBottom: 10,
        }}
      >
        {model.approach} · {model.params} params
      </div>
      <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
        {model.description}
      </p>
    </div>
  );
}

function AgreementCard({ modelA, modelB }) {
  const stats = compareGOSets(modelA.goTerms, modelB.goTerms);
  const color =
    stats.jaccard >= 70 ? "#00ff9f" :
    stats.jaccard >= 40 ? "#FFD700" : "#FF4500";

  return (
    <div
      style={{
        background: "var(--bg-input)",
        border: "1px solid var(--border-dim)",
        borderRadius: "var(--radius-md)",
        padding: "14px 16px",
        flex: 1,
      }}
    >
      <div style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: 1, fontFamily: "var(--font-mono)", marginBottom: 10 }}>
        {modelA.shortName} vs {modelB.shortName}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1 }}>
            {stats.jaccard}%
          </div>
          <div style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: 0.5, marginTop: 2, fontFamily: "var(--font-mono)" }}>
            Jaccard similarity
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="agreement-bar-track">
            <div
              className="agreement-bar-fill"
              style={{
                width: `${stats.jaccard}%`,
                background: `linear-gradient(90deg, ${color}66, ${color})`,
                boxShadow: `0 0 8px ${color}55`,
              }}
            />
          </div>
          <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 4, fontFamily: "var(--font-mono)" }}>
            {stats.shared} shared / {stats.total} unique GO terms
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── GO term comparison rows ─────────────────────────────────────────────────── */

const CAT_COLOR = {
  "Molecular Function": "#00ff9f",
  "Biological Process": "#00d4ff",
  "Cellular Component": "#bf5fff",
};

function CompareGoRows({ models }) {
  // Collect all unique GO IDs across all models
  const allIds = new Map();
  models.forEach((m) => {
    m.goTerms.forEach((t) => {
      if (!allIds.has(t.id)) allIds.set(t.id, { id: t.id, name: t.name, category: t.category });
    });
  });

  // For each ID, gather per-model confidence
  const rows = [...allIds.values()].map((meta) => {
    const cells = models.map((m) => {
      const found = m.goTerms.find((t) => t.id === meta.id);
      return found ? found.confidence : null;
    });
    const presentCount = cells.filter((c) => c !== null).length;
    const agreement = presentCount === models.length ? "match" : presentCount > 1 ? "partial" : "miss";
    return { ...meta, cells, agreement };
  });

  // Sort: full agreement first, then partial, then miss
  const order = { match: 0, partial: 1, miss: 2 };
  rows.sort((a, b) => order[a.agreement] - order[b.agreement]);

  return (
    <div>
      {/* Column headers */}
      <div className="compare-header-row" style={{ marginBottom: 10 }}>
        {models.map((m) => (
          <div
            key={m.key}
            style={{
              fontSize: 10,
              color: m.color,
              fontFamily: "var(--font-mono)",
              letterSpacing: 1,
              textAlign: "center",
              padding: "6px 0",
              borderBottom: `2px solid ${m.color}44`,
            }}
          >
            {m.shortName.toUpperCase()}
          </div>
        ))}
      </div>

      {rows.map((row, ri) => (
        <div
          key={row.id}
          className="compare-go-row"
          style={{ animationDelay: `${ri * 60}ms` }}
        >
          {row.cells.map((conf, ci) => {
            const m = models[ci];
            const cellClass =
              row.agreement === "match"   ? "match" :
              row.agreement === "partial" && conf !== null ? "partial" :
              conf !== null               ? "partial" : "miss";

            return (
              <div key={ci} className={`compare-cell ${cellClass}`}>
                {conf !== null ? (
                  <>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-primary)", marginBottom: 3 }}>
                      {row.name}
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: CAT_COLOR[row.category] ?? "var(--text-dim)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: 0.5,
                        marginBottom: 8,
                      }}
                    >
                      {row.id}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div
                        style={{
                          flex: 1,
                          height: 4,
                          background: "var(--border-dim)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${Math.round(conf * 100)}%`,
                            background: m.color,
                            boxShadow: `0 0 5px ${m.color}88`,
                            borderRadius: 2,
                            transition: "width 0.8s ease",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontFamily: "var(--font-mono)",
                          color: m.color,
                          width: 34,
                        }}
                      >
                        {Math.round(conf * 100)}%
                      </span>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      fontSize: 10,
                      color: "var(--text-faint)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: 0.5,
                    }}
                  >
                    — not predicted
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Legend */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 18,
          flexWrap: "wrap",
        }}
      >
        {[
          { cls: "match",   label: "All models agree",  color: "#00ff9f" },
          { cls: "partial", label: "Partial agreement",  color: "#FFD700" },
          { cls: "miss",    label: "Single model only",  color: "#FF4500" },
        ].map(({ cls, label, color }) => (
          <div
            key={cls}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: `${color}22`,
                border: `1px solid ${color}66`,
              }}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function Compare() {
  const [sequence,  setSequence]  = useState("");
  const [loading,   setLoading]   = useState(false);
  const [result,    setResult]    = useState(null);
  const [error,     setError]     = useState("");

  const liveAnalysis = sequence ? analyzeSequence(sequence) : null;

  const handleCompare = async () => {
    const ana = analyzeSequence(sequence);
    if (!ana.clean.length) { setError("Please enter a protein sequence."); return; }
    if (ana.score < 30)    { setError("Sequence appears invalid — use standard amino acid letters."); return; }
    setError("");
    setLoading(true);
    setResult(null);

    /* ══════════════════════════════════════════════════════════════════════════
       👇 REPLACE THIS with calls to all three model endpoints:
    
       const [mine, esm2, esmfold] = await Promise.all([
         fetch("/api/predict",      { method:"POST", body: JSON.stringify({sequence:ana.clean}) }).then(r=>r.json()),
         fetch("/api/esm2/predict", { method:"POST", body: JSON.stringify({sequence:ana.clean}) }).then(r=>r.json()),
         fetch("/api/esmfold/fn",   { method:"POST", body: JSON.stringify({sequence:ana.clean}) }).then(r=>r.json()),
       ]);
       setResult({ models: [ {...MODELS[0], goTerms:mine.go_terms}, ...etc ] });
    ════════════════════════════════════════════════════════════════════════════ */
    await new Promise((r) => setTimeout(r, 3000));
    setResult({ models: MODELS });
    /* ════════════════════════════════════════════════════════════════════════ */

    setLoading(false);
  };

  const handleReset = () => {
    setResult(null);
    setSequence("");
    setError("");
  };

  return (
    <div className="page-content page-enter">

      {/* Header */}
      <div style={{ marginBottom: 44 }}>
        <div className="section-badge">▸ CROSS-MODEL BENCHMARKING</div>
        <h1 className="page-title">Model<br />Comparison</h1>
        <p className="page-subtitle">
          Compare your model's GO term predictions against Meta's ESM-2 and ESMFold.
          See where models agree, diverge, and complement each other.
        </p>
      </div>

      {/* Model info cards */}
      <div className="compare-header-row" style={{ marginBottom: 24 }}>
        {MODELS.map((m) => (
          <ModelHeader key={m.key} model={m} />
        ))}
      </div>

      {/* Input */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="label" style={{ marginBottom: 12 }}>
          AMINO ACID SEQUENCE — same sequence will be run through all three models
        </div>

        <textarea
          className="seq-input"
          value={sequence}
          rows={4}
          onChange={(e) => setSequence(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleCompare();
          }}
          placeholder="Paste FASTA or raw sequence, e.g. MKTAYIAKQRQISFVK..."
        />

        {liveAnalysis && liveAnalysis.clean.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <ValidityBar
              score={liveAnalysis.score}
              message={liveAnalysis.msg}
              length={liveAnalysis.len}
            />
          </div>
        )}

        {error && (
          <div
            style={{
              marginTop: 10,
              fontSize: 11,
              color: "var(--accent-red)",
              fontFamily: "var(--font-mono)",
            }}
          >
            ⚠ {error}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <button
            className="btn-primary"
            onClick={handleCompare}
            disabled={loading || !sequence.trim()}
          >
            {loading ? "COMPARING…" : "⇌  COMPARE ALL MODELS"}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="card-flat">
          <LoadingDNA message="RUNNING ALL MODELS..." />
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className="page-enter">

          {/* Agreement summary */}
          <div className="label" style={{ marginBottom: 12 }}>AGREEMENT OVERVIEW</div>

          <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
            <AgreementCard modelA={MODELS[0]} modelB={MODELS[1]} />
            <AgreementCard modelA={MODELS[0]} modelB={MODELS[2]} />
            <AgreementCard modelA={MODELS[1]} modelB={MODELS[2]} />
          </div>

          {/* Per-model confidence summary */}
          <div className="label" style={{ marginBottom: 12 }}>CONFIDENCE OVERVIEW PER MODEL</div>

          <div className="compare-header-row" style={{ marginBottom: 24 }}>
            {result.models.map((m) => {
              const avgConf = Math.round(
                (m.goTerms.reduce((s, t) => s + t.confidence, 0) / m.goTerms.length) * 100
              );
              return (
                <div
                  key={m.key}
                  className="card-flat"
                  style={{ textAlign: "center" }}
                >
                  <RadialConfidence value={avgConf} size={80} />
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 11,
                      color: m.color,
                      fontFamily: "var(--font-mono)",
                      letterSpacing: 1,
                    }}
                  >
                    {m.shortName}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 3 }}>
                    avg confidence
                  </div>
                </div>
              );
            })}
          </div>

          {/* GO term comparison grid */}
          <div className="label" style={{ marginBottom: 14 }}>
            GO TERM COMPARISON — all predicted terms
          </div>

          <div className="card-flat" style={{ padding: "20px" }}>
            <CompareGoRows models={result.models} />
          </div>

          {/* Interpretation */}
          <div
            className="card-flat"
            style={{
              marginTop: 20,
              borderLeft: "3px solid var(--accent-amber)",
              boxShadow: "0 0 20px #FFD70008",
            }}
          >
            <div className="label" style={{ color: "#FFD70088", marginBottom: 10 }}>
              ▸ INTERPRETATION NOTES
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {[
                "Green rows indicate GO terms predicted by all three models — these are high-confidence annotations.",
                "Yellow rows show partial agreement — worth manual review or additional validation.",
                "Terms predicted by only your model may reflect unique training data not covered by ESM-2/ESMFold.",
                "ESMFold uses predicted 3D structure; unique predictions from it suggest structure-dependent functions.",
                "Jaccard similarity measures set overlap — higher values indicate stronger cross-model consensus.",
              ].map((note, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 12,
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    paddingLeft: 16,
                    borderLeft: "2px solid var(--border-dim)",
                  }}
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Reset */}
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button className="btn-ghost" onClick={handleReset}>
              ↩ CLEAR &amp; START OVER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
