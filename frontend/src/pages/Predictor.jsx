/* ─────────────────────────────────────────────────────────────────────────────
   pages/Predictor.jsx
   Main protein function prediction page
   ───────────────────────────────────────────────────────────────────────────── */

import { useState, useRef } from "react";
import ValidityBar      from "../components/ValidityBar.jsx";
import SequenceDisplay  from "../components/SequenceDisplay.jsx";
import GOTermCard       from "../components/GOTermCard.jsx";
import LoadingDNA       from "../components/LoadingDNA.jsx";
import RadialConfidence from "../components/RadialConfidence.jsx";
import { analyzeSequence } from "../utils/sequenceUtils.js";
import { MY_MODEL_GO, PREDICTION_SUMMARY } from "../data/constants.js";

export default function Predictor() {
  const [sequence,  setSequence]  = useState("");
  const [loading,   setLoading]   = useState(false);
  const [result,    setResult]    = useState(null);
  const [analysis,  setAnalysis]  = useState(null);
  const [error,     setError]     = useState("");

  const textareaRef = useRef(null);
  const liveAnalysis = sequence ? analyzeSequence(sequence) : null;

  /* ── Submission ─────────────────────────────────────────────────────────── */
  const handleSubmit = async () => {
    const ana = analyzeSequence(sequence);
    if (!ana.clean.length) { setError("Please enter a protein sequence."); return; }
    if (ana.score < 30)    { setError("Sequence appears invalid — use standard amino acid letters (A–Z)."); return; }

    setError("");
    setAnalysis(ana);
    setLoading(true);
    setResult(null);

    /* ══════════════════════════════════════════════════════════════════════════
       👇 REPLACE THIS BLOCK with your real API call, e.g.:
    
       const res  = await fetch("http://localhost:8000/predict", {
         method:  "POST",
         headers: { "Content-Type": "application/json" },
         body:    JSON.stringify({ sequence: ana.clean }),
       });
       const data = await res.json();
       setResult({ goTerms: data.go_terms, overallConfidence: data.confidence, summary: data.summary });
    ══════════════════════════════════════════════════════════════════════════ */
    await new Promise((r) => setTimeout(r, 2600)); // fake network delay
    setResult({
      goTerms:           MY_MODEL_GO,
      overallConfidence: 87,
      summary:           PREDICTION_SUMMARY,
    });
    /* ════════════════════════════════════════════════════════════════════════ */

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") handleSubmit();
  };

  const handleReset = () => {
    setResult(null);
    setAnalysis(null);
    setSequence("");
    setError("");
    textareaRef.current?.focus();
  };

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    <div className="page-content page-enter">

      {/* Header */}
      <div style={{ marginBottom: 44 }}>
        <div className="section-badge">▸ DEEP NEURAL NETWORK ENGINE v1.0</div>
        <h1 className="page-title">Protein Function<br />Predictor</h1>
        <p className="page-subtitle">
          Input an amino acid sequence to predict GO terms, molecular function,
          and biological role using deep learning.
        </p>
      </div>

      {/* Input card */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="label" style={{ marginBottom: 12 }}>
          AMINO ACID SEQUENCE —{" "}
          <span style={{ color: "#00ff9f44" }}>FASTA or raw (Ctrl+Enter to submit)</span>
        </div>

        <textarea
          ref={textareaRef}
          className="seq-input"
          value={sequence}
          rows={5}
          onChange={(e) => setSequence(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste FASTA or raw sequence, e.g. MKTAYIAKQRQISFVKSHFSRQ..."
        />

        {/* Live validity */}
        {liveAnalysis && liveAnalysis.clean.length > 0 && (
          <div style={{ marginTop: 16 }}>
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
              marginTop: 12,
              fontSize: 11,
              color: "var(--accent-red)",
              fontFamily: "var(--font-mono)",
              letterSpacing: 0.5,
            }}
          >
            ⚠ {error}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading || !sequence.trim()}
          >
            {loading ? "ANALYZING…" : "▶  PREDICT FUNCTION"}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="card-flat">
          <LoadingDNA />
        </div>
      )}

      {/* Results */}
      {result && analysis && !loading && (
        <div className="page-enter">

          {/* Sequence analysis card */}
          <div className="card-flat" style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 14,
                gap: 12,
              }}
            >
              <div className="label">SEQUENCE ANALYSIS</div>
              <RadialConfidence value={result.overallConfidence} size={88} />
            </div>

            <ValidityBar
              score={analysis.score}
              message={analysis.msg}
              length={analysis.len}
            />

            <SequenceDisplay clean={analysis.clean} groupCounts={analysis.groupCounts} />
          </div>

          {/* Prediction summary */}
          <div
            className="card-flat"
            style={{
              marginBottom: 20,
              borderLeft: "3px solid var(--accent-green)",
              boxShadow: "0 0 28px #00ff9f07",
            }}
          >
            <div className="section-badge" style={{ marginBottom: 10 }}>
              ▸ PREDICTION SUMMARY
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.8 }}>
              {result.summary}
            </p>
          </div>

          {/* GO Terms */}
          <div>
            <div className="label" style={{ marginBottom: 16 }}>
              PREDICTED GO TERMS — {result.goTerms.length} results
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {result.goTerms.map((term, i) => (
                <GOTermCard key={term.id} term={term} delay={i * 140} />
              ))}
            </div>
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
