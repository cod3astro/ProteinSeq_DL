/* ─────────────────────────────────────────────────────────────────────────────
   components/LoadingDNA.jsx
   Animated DNA helix loading indicator
   ───────────────────────────────────────────────────────────────────────────── */

export default function LoadingDNA({ message = "ANALYZING SEQUENCE..." }) {
  const PAIRS = 8;

  return (
    <div className="loading-container">
      {/* DNA helix */}
      <div className="dna-wrap">
        {Array.from({ length: PAIRS }).map((_, i) => {
          const isLeft = i % 2 === 0;
          const color  = isLeft ? "#00ff9f" : "#00d4ff";
          return (
            <div
              key={i}
              className="dna-dot"
              style={{
                top: i * 9,
                ...(isLeft ? { left: 0 } : { right: 0 }),
                background: color,
                boxShadow: `0 0 7px ${color}`,
                animation: `dnaBouce 1s ease-in-out ${i * 0.11}s infinite alternate`,
              }}
            />
          );
        })}

        {/* Rungs */}
        {Array.from({ length: PAIRS - 1 }).map((_, i) => (
          <div
            key={i}
            className="dna-rung"
            style={{
              top: i * 9 + 5,
              background: "linear-gradient(90deg, #00ff9f33, #00d4ff33)",
            }}
          />
        ))}
      </div>

      {/* Text */}
      <div
        style={{
          color: "#00ff9f",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: 2,
          animation: "blink 1.1s step-end infinite",
        }}
      >
        {message}
      </div>

      <div
        style={{
          color: "var(--text-faint)",
          fontSize: 10,
          letterSpacing: 1,
          fontFamily: "var(--font-mono)",
        }}
      >
        Running deep learning inference
      </div>
    </div>
  );
}
