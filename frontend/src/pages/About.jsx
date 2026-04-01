/* ─────────────────────────────────────────────────────────────────────────────
   pages/About.jsx
   Author bio, project overview, and contact section
   ─────────────────────────────────────────────────────────────────────────────
   ✏️  PERSONALISE: search for 【 and replace the placeholder values with your
       real name, institution, links, and bio text.
   ───────────────────────────────────────────────────────────────────────────── */

/* ─── Data — edit this section ───────────────────────────────────────────────── */
const AUTHORS = [
  {
    initials: "AT",      
    name: "Abdullateef Tijani",    
    role: "Lead Researcher · Deep Learning",
    institution: "Universityof Ilorin",  // 【 institution 】
    bio: "Researcher specialising in computational biology, AI & ML in Healthcare. Building tools that bridge technology with biological knowledge graphs.", // 【 your bio 】
    links: {
      email:    "molabosipolateef@gmail.com",       // 【 your email 】
      github:   "https://github.com/cod3astro",   // 【 GitHub URL 】
      twitter:  "https://x.com/cod3astro",        // 【 Twitter/X URL 】
      linkedin: "https://linkedin.com/abdullatef-tijani", // 【 LinkedIn URL 】
    },
  },
  {
    initials: "AA",
    name:     "Aisha Alimi",
    role:     "Bioinformatics · Data Curation",
    institution: "University of Lagos",
    bio: "Co-investigator focused on curating high-quality training datasets from UniProtKB.",
    links: { email: "co@example.com", github: "", twitter: "", linkedin: "", scholar: "" },
  },
  
];

const PROJECT = {
  name:        "NeuralProt",
  version:     "v1.0.0",
  description: `NeuralProt is an open-source deep learning tool for predicting protein function
    directly from amino acid sequence. It outputs Gene Ontology (GO) term predictions
    across Molecular Function, Biological Process, and Cellular Component ontologies,
    with per-term confidence scores and cross-model comparison against state-of-the-art
    baselines like Meta's ESM-2 and ESMFold.`,
  model:       "Custom sequence-to-function transformer",
  training:    "SwissProt + TrEMBL subsets via UniProtKB",
  license:     "MIT",
  citation:    `Tijani & Aisha (2025). NeuralProt: Deep Neural Network for Protein Function Prediction. `, // 【 update when you have a preprint/paper 】
};
/* ─── End of editable data ───────────────────────────────────────────────────── */

/* ─── Sub-components ─────────────────────────────────────────────────────────── */

function ContactPill({ icon, label, href, color = "var(--accent-green)" }) {
  if (!href || href === "") return null;
  return (
    <a
      href={href.startsWith("mailto") ? href : href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-pill"
      style={{}}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function AuthorCard({ author, index }) {
  const delay = index * 100;
  return (
    <div
      className="card-flat page-enter"
      style={{ marginBottom: 16, animationDelay: `${delay}ms` }}
    >
      <div className="author-card">
        {/* Avatar */}
        <div className="author-avatar">{author.initials}</div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 19, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
            {author.name}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--accent-green)",
              fontFamily: "var(--font-mono)",
              letterSpacing: 1,
              marginBottom: 4,
            }}
          >
            {author.role}
          </div>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 14 }}>
            {author.institution}
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.75, marginBottom: 18 }}>
            {author.bio}
          </p>

          {/* Contact links */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <ContactPill icon="✉" label={author.links.email} href={`mailto:${author.links.email}`} />
            <ContactPill icon="⌥" label="GitHub"    href={author.links.github}   />
            <ContactPill icon="◆" label="Twitter/X" href={author.links.twitter}  />
            <ContactPill icon="▣" label="LinkedIn"  href={author.links.linkedin} />
            {author.links.scholar && (
              <ContactPill icon="◎" label="Scholar" href={author.links.scholar} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        padding: "10px 0",
        borderBottom: "1px solid var(--border-dim)",
        fontSize: 13,
      }}
    >
      <span
        style={{
          width: 140,
          color: "var(--text-dim)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: 0.5,
          flexShrink: 0,
          paddingTop: 1,
        }}
      >
        {label}
      </span>
      <span style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>{value}</span>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function About() {
  return (
    <div className="page-content page-enter">

      {/* Header */}
      <div style={{ marginBottom: 44 }}>
        <div className="section-badge">▸ PROJECT &amp; AUTHORS</div>
        <h1 className="page-title">About<br />NeuralProt</h1>
        <p className="page-subtitle">
          Meet the team behind the tool and learn how to get in touch or cite the work.
        </p>
      </div>

      {/* Project overview */}
      <div
        className="card"
        style={{ marginBottom: 36, borderLeft: "3px solid var(--accent-cyan)" }}
      >
        <div className="label" style={{ marginBottom: 14 }}>PROJECT OVERVIEW</div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, #00ff9f22, #00d4ff22)",
              border: "1px solid #00ff9f33",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            🧬
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)" }}>
              {PROJECT.name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--accent-green)",
                fontFamily: "var(--font-mono)",
                letterSpacing: 1,
              }}
            >
              {PROJECT.version}
            </div>
          </div>
        </div>

        <p
          style={{
            fontSize: 13,
            color: "var(--text-muted)",
            lineHeight: 1.8,
            marginBottom: 24,
            whiteSpace: "pre-line",
          }}
        >
          {PROJECT.description}
        </p>

        <div>
          <InfoRow label="Model"     value={PROJECT.model}    />
          <InfoRow label="Training"  value={PROJECT.training} />
          <InfoRow label="License"   value={PROJECT.license}  />
          <InfoRow label="Citation"  value={PROJECT.citation} />
        </div>
      </div>

      {/* Authors */}
      <div className="label" style={{ marginBottom: 16 }}>
        AUTHORS — {AUTHORS.length} contributor{AUTHORS.length > 1 ? "s" : ""}
      </div>

      {AUTHORS.map((author, i) => (
        <AuthorCard key={author.name} author={author} index={i} />
      ))}

      {/* Tech stack note */}
      <div
        className="card-flat"
        style={{
          marginTop: 12,
          borderLeft: "3px solid #333",
          padding: "16px 20px",
        }}
      >
        <div className="label" style={{ marginBottom: 10 }}>TECH STACK</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {[
    "Python",
    "FastAPI",
    "Uvicorn",
    "PyTorch",
    "Pydantic",
    "HuggingFace datasets",
    "CORS middleware",
    "python-dotenv",
    "React",
    "Vite",
    "JavaScript (ES6+)",
    "Tailwind CSS",
    "Axios (API calls)",
    "React Router",
    "BCEWithLogitsLoss",
    "ReduceLROnPlateau",
    "SimpleProteinCNN",
    "scikit-learn",
    "NumPy",
    "Checkpoint saving (.pt)",
    "pandas",
    "BioPython (SeqIO)",
    "psutil",
    "gc",
    "UniProtKB"
].map(
            (tag) => (
              <span
                key={tag}
                style={{
                  background: "#0d0d1a",
                  border: "1px solid var(--border-dim)",
                  borderRadius: 100,
                  padding: "4px 12px",
                  fontSize: 11,
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: 0.3,
                }}
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
