/* ─────────────────────────────────────────────────────────────────────────────
   components/ValidityBar.jsx
   Horizontal bar showing sequence validity % with color coding
   ───────────────────────────────────────────────────────────────────────────── */

import { validityColor } from "../utils/sequenceUtils.js";

export default function ValidityBar({ score, message, length }) {
  const color = validityColor(score);

  return (
    <div style={{ width: "100%" }}>
      <div className="vbar-label">
        <span>SEQUENCE VALIDITY</span>
        <span style={{ color, textShadow: `0 0 8px ${color}66` }}>{score}%</span>
      </div>

      <div className="vbar-track">
        <div
          className="vbar-fill"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 7px ${color}`,
          }}
        />
      </div>

      {message && (
        <div
          style={{
            marginTop: 6,
            fontSize: 10,
            color: `${color}99`,
            letterSpacing: 0.5,
            fontFamily: "var(--font-mono)",
          }}
        >
          {message}
          {length ? ` · ${length} residues` : ""}
        </div>
      )}
    </div>
  );
}
