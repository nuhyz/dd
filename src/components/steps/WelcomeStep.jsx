import { useState } from "react";
import { useCharacterStore } from "../../store/characterStore";
import { PageHeader } from "../ui/PageHeader";

const ALIGNMENTS = [
  "Lawful Good", "Neutral Good", "Chaotic Good",
  "Lawful Neutral", "True Neutral", "Chaotic Neutral",
  "Lawful Evil", "Neutral Evil", "Chaotic Evil",
];

export function WelcomeStep() {
  const {
    name, setName,
    alignment, setAlignment,
    customPatron, setCustomPatron,
    customNotes, setCustomNotes,
    nextStep,
  } = useCharacterStore();

  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="fade-in">
      <PageHeader
        title="Begin Your Adventure"
        subtitle="Every great hero needs a name. Fill in the basics and embark on your journey."
      />

      <div className="phb-section-box" style={{ maxWidth: 520 }}>
        <h3 className="mb-2">Character Name</h3>
        <input
          className="search-input"
          placeholder="Enter your character's name…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "0" }}
        />
      </div>

      <div className="phb-section-box mt-2" style={{ maxWidth: 520 }}>
        <h3 className="mb-2">Alignment</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.4rem" }}>
          {ALIGNMENTS.map((a) => (
            <button
              key={a}
              className={`filter-chip${alignment === a ? " active" : ""}`}
              onClick={() => setAlignment(alignment === a ? "" : a)}
              style={{ textTransform: "none", fontSize: "0.72rem" }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced / Optional Fields */}
      <div style={{ maxWidth: 520, marginTop: "1rem" }}>
        <button
          className="btn btn-secondary"
          style={{ fontSize: "0.72rem", padding: "0.4rem 1rem" }}
          onClick={() => setShowAdvanced((v) => !v)}
        >
          {showAdvanced ? "▲ Hide" : "▼ Show"} Optional Fields (Patron, Notes, Custom Background)
        </button>
      </div>

      {showAdvanced && (
        <>
          <div className="phb-section-box mt-2" style={{ maxWidth: 520 }}>
            <h3 className="mb-1">Patron / Deity / Organisation</h3>
            <p className="text-sm italic mb-2" style={{ color: "rgba(249,245,231,0.6)" }}>
              Warlock patron, deity worshipped, guild affiliation, or any allegiance — free-form.
            </p>
            <input
              className="search-input"
              placeholder="e.g. The Raven Queen, Helm of Watchers, The Harpers…"
              value={customPatron}
              onChange={(e) => setCustomPatron(e.target.value)}
              style={{ marginBottom: "0" }}
            />
          </div>

          <div className="phb-section-box mt-2" style={{ maxWidth: 520 }}>
            <h3 className="mb-1">Personal Notes</h3>
            <p className="text-sm italic mb-2" style={{ color: "rgba(249,245,231,0.6)" }}>
              Backstory, physical description, custom background details, DM-approved house rules…
            </p>
            <textarea
              className="search-input"
              placeholder="Write anything you want to remember about this character…"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              rows={5}
              style={{ marginBottom: "0", resize: "vertical", fontFamily: "var(--font-body)" }}
            />
          </div>

          <div className="info-block mt-2" style={{ maxWidth: 520 }}>
            💡 <strong>Custom Background?</strong> Work with your DM to agree on proficiencies and features, then pick the closest standard background in the Background step and note your customisations above.
          </div>
        </>
      )}

      <div className="info-block mt-2" style={{ maxWidth: 520 }}>
        <strong>What is this tool?</strong> A complete D&D 5e character creator supporting both the 2014 and 2024 editions of the Player's Handbook. All content is drawn from the Systems Reference Document (SRD) under Creative Commons. No paywalls, no locked content.
      </div>

      <div className="nav-buttons">
        <span />
        <button className="btn btn-primary" disabled={!name.trim()} onClick={nextStep}>
          Choose Species →
        </button>
      </div>
    </div>
  );
}
