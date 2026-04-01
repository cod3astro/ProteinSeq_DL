/* ─────────────────────────────────────────────────────────────────────────────
   components/SequenceDisplay.jsx
   Renders colored residue map and per-group composition bars
   ───────────────────────────────────────────────────────────────────────────── */

import { AA_COLORS } from "../data/constants.js";

const MAX_DISPLAY = 200;

export default function SequenceDisplay({ clean, groupCounts }) {
  const display  = clean.slice(0, MAX_DISPLAY);
  const truncated = clean.length > MAX_DISPLAY;
  const total    = Object.values(groupCounts).reduce((s, { cnt }) => s + cnt, 0);

  return (
    <div style={{ marginTop: 20 }}>
      {/* Sequence map */}
      <div className="label" style={{ marginBottom: 8 }}>
        SEQUENCE MAP
        {truncated && (
          <span style={{ color: "var(--text-faint)", marginLeft: 6 }}>
            (first {MAX_DISPLAY} of {clean.length} residues)
          </span>
        )}
      </div>

      <div className="seq-map">
        {[...display].map((aa, i) => (
          <span
            key={i}
            title={`${aa} (pos ${i + 1})`}
            style={{
              color: AA_COLORS[aa] ?? "#ff4444",
              textShadow: `0 0 5px ${AA_COLORS[aa] ?? "#ff4444"}55`,
              cursor: "default",
            }}
          >
            {aa}
          </span>
        ))}
        {truncated && <span style={{ color: "#333" }}>…</span>}
      </div>

      {/* Composition bars */}
      <div className="label" style={{ marginTop: 18, marginBottom: 10 }}>
        RESIDUE COMPOSITION
      </div>

      <div>
        {Object.entries(groupCounts)
          .sort((a, b) => b[1].cnt - a[1].cnt)
          .map(([group, { cnt, color }]) => {
            const pct = Math.round((cnt / total) * 100);
            return (
              <div key={group} className="comp-row">
                <div className="comp-name">{group}</div>
                <div className="comp-track">
                  <div
                    className="comp-fill"
                    style={{
                      width: `${pct}%`,
                      background: color,
                      boxShadow: `0 0 5px ${color}88`,
                    }}
                  />
                </div>
                <div className="comp-pct" style={{ color }}>{pct}%</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
