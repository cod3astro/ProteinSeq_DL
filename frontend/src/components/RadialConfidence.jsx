/* ─────────────────────────────────────────────────────────────────────────────
   components/RadialConfidence.jsx
   Circular confidence gauge with animated stroke
   ───────────────────────────────────────────────────────────────────────────── */

export default function RadialConfidence({ value = 0, size = 90 }) {
  const r      = 38;
  const circ   = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color  = value >= 80 ? "#00ff9f" : value >= 60 ? "#FFD700" : "#FF4500";

  return (
    <div className="radial-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 90 90">
        {/* Track */}
        <circle cx="45" cy="45" r={r} fill="none" stroke="#1a1a2e" strokeWidth="7" />
        {/* Progress arc */}
        <circle
          cx="45" cy="45" r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transformOrigin: "50% 50%",
            transform: "rotate(-90deg)",
            filter: `drop-shadow(0 0 5px ${color}aa)`,
            transition: "stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </svg>

      <div className="radial-inner">
        <span
          style={{
            fontSize: size < 80 ? 15 : 18,
            fontWeight: 700,
            color,
            fontFamily: "var(--font-mono)",
            lineHeight: 1,
            textShadow: `0 0 8px ${color}88`,
          }}
        >
          {value}%
        </span>
        <span
          style={{
            fontSize: 8,
            color: "var(--text-dim)",
            marginTop: 3,
            letterSpacing: 1,
            fontFamily: "var(--font-mono)",
          }}
        >
          CONF
        </span>
      </div>
    </div>
  );
}
