/* ─────────────────────────────────────────────────────────────────────────────
   components/GOTermCard.jsx
   Individual GO term result card with confidence radial
   ───────────────────────────────────────────────────────────────────────────── */

import { useEffect, useState } from "react";
import RadialConfidence from "./RadialConfidence.jsx";

const CAT_ICONS = {
  "Molecular Function": "⚗",
  "Biological Process": "⬡",
  "Cellular Component": "◈",
};

export default function GOTermCard({ term, delay = 0 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`go-card ${visible ? "visible" : ""}`}
      style={{
        border: `1px solid ${term.color}28`,
        borderLeft: `3px solid ${term.color}`,
        boxShadow: `0 0 20px ${term.color}09`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 10,
          gap: 12,
        }}
      >
        {/* Left: meta */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 10,
              color: "var(--text-dim)",
              letterSpacing: 1,
              marginBottom: 5,
              fontFamily: "var(--font-mono)",
            }}
          >
            {CAT_ICONS[term.category] ?? "○"}&nbsp;&nbsp;{term.category.toUpperCase()}
          </div>

          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: 4,
            }}
          >
            {term.name}
          </div>

          <div
            style={{
              fontSize: 10,
              color: `${term.color}99`,
              fontFamily: "var(--font-mono)",
              letterSpacing: 0.5,
            }}
          >
            {term.id}
          </div>
        </div>

        {/* Right: confidence radial */}
        <RadialConfidence value={Math.round(term.confidence * 100)} size={72} />
      </div>

      <p
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {term.description}
      </p>
    </div>
  );
}
