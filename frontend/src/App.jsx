/* ─────────────────────────────────────────────────────────────────────────────
   App.jsx
   Root component — navigation bar + page routing (no external router needed)
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import Predictor from "./pages/Predictor.jsx";
import About     from "./pages/About.jsx";
import Compare   from "./pages/Compare.jsx";

const PAGES = [
  { key: "predictor", label: "Predictor" },
  { key: "compare",   label: "Compare"   },
  { key: "about",     label: "About"     },
];

export default function App() {
  const [page, setPage] = useState("predictor");

  return (
    <>
      {/* ── Background effects ─────────────────────────────────────────── */}
      <div className="bg-grid" />
      <div className="bg-scanlines" />

      {/* ── Navigation ────────────────────────────────────────────────── */}
      <nav className="nav">
        <div className="nav-inner">
          {/* Logo */}
          <span className="nav-logo" onClick={() => setPage("predictor")}>
            🧬 NeuralProt
          </span>

          {/* Page links */}
          <div className="nav-links">
            {PAGES.map(({ key, label }) => (
              <button
                key={key}
                className={`nav-link ${page === key ? "active" : ""}`}
                onClick={() => setPage(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Page content (offset for fixed nav) ───────────────────────── */}
      <main style={{ paddingTop: 56 }}>
        {page === "predictor" && <Predictor key="predictor" />}
        {page === "compare"   && <Compare   key="compare"   />}
        {page === "about"     && <About     key="about"     />}
      </main>
    </>
  );
}
