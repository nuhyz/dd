import { useState } from "react";
import { useCharacterStore } from "../../store/characterStore";
import { PageHeader } from "../ui/PageHeader";

const ALIGNMENTS = [
  "Lawful Good", "Neutral Good", "Chaotic Good",
  "Lawful Neutral", "True Neutral", "Chaotic Neutral",
  "Lawful Evil", "Neutral Evil", "Chaotic Evil",
];

export function WelcomeStep() {
  const { name, setName, alignment, setAlignment, nextStep } = useCharacterStore();

  return (
    <div className="fade-in">
      <PageHeader
        title="Begin Your Adventure"
        subtitle="Every great hero needs a name. Fill in the basics and embark on your journey."
      />

      <div className="phb-section-box" style={{ maxWidth: 500 }}>
        <h3 className="mb-2">Character Name</h3>
        <input
          className="search-input"
          placeholder="Enter your character's name…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "0" }}
        />
      </div>

      <div className="phb-section-box mt-2" style={{ maxWidth: 500 }}>
        <h3 className="mb-2">Alignment</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.4rem" }}>
          {ALIGNMENTS.map((a) => (
            <button
              key={a}
              className={`filter-chip${alignment === a ? " active" : ""}`}
              onClick={() => setAlignment(a)}
              style={{ textTransform: "none", fontSize: "0.72rem" }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="info-block mt-2" style={{ maxWidth: 500 }}>
        <strong>What is this tool?</strong> A complete D&D 5e character creator supporting both the 2014 and 2024 editions of the Player's Handbook. All content is drawn from the Systems Reference Document (SRD) under Creative Commons. You control everything — no paywalls, no locked content.
      </div>

      <div className="nav-buttons">
        <span />
        <button className="btn btn-primary" onClick={nextStep}>
          Choose Species →
        </button>
      </div>
    </div>
  );
}
