import { useState, useRef, useEffect } from "react";
import { useCharacterStore } from "./store/characterStore";
import { CharacterSheet } from "./components/sheet/CharacterSheet";
import { WelcomeStep } from "./components/steps/WelcomeStep";
import { SpeciesStep } from "./components/steps/SpeciesStep";
import { ClassStep } from "./components/steps/ClassStep";
import { SubclassStep } from "./components/steps/SubclassStep";
import { BackgroundStep } from "./components/steps/BackgroundStep";
import { PossessionsStep } from "./components/steps/PossessionsStep";
import { AbilityScoresStep } from "./components/steps/AbilityScoresStep";
import { SkillsStep } from "./components/steps/SkillsStep";
import { SpellsStep } from "./components/steps/SpellsStep";
import "./styles/phb.css";

// ── Download helpers ──────────────────────────────────────────────────────────
function exportJSON(state) {
  const {
    name, edition, species, class: cls, subclass, background, level, alignment,
    abilityScores, abilityScoreMethod, skills, expertiseSkills, spells, preparedSpells,
    draconicAncestry, elvenLineage, tieflingLegacy, goliathAncestry, gnomeLineage, aasimar_revelation,
    customPossessions, customPatron, customNotes, extraAbilityBonuses,
  } = state;

  const data = {
    name, edition, level, alignment, abilityScoreMethod,
    species:   species  ? { id: species.id,  name: species.name  } : null,
    class:     cls      ? { id: cls.id,      name: cls.name      } : null,
    subclass:  subclass ? { id: subclass.id, name: subclass.name } : null,
    background: background ? { id: background.id, name: background.name } : null,
    abilityScores, skills, expertiseSkills, spells, preparedSpells,
    draconicAncestry, elvenLineage, tieflingLegacy, goliathAncestry, gnomeLineage, aasimar_revelation,
    customPossessions, customPatron, customNotes, extraAbilityBonuses,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `${name || "character"}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Sheet step component (with download dropdown) ─────────────────────────────
function SheetStep() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="fade-in">
      <CharacterSheet />
      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={() => useCharacterStore.getState().prevStep()}>
          ← Back to Spells
        </button>

        <div className="download-dropdown" ref={menuRef}>
          <button className="btn btn-gold" onClick={() => setMenuOpen((v) => !v)}>
            ⬇ Export / Print ▾
          </button>
          {menuOpen && (
            <div className="download-menu">
              <button
                className="download-menu-item"
                onClick={() => { setMenuOpen(false); window.print(); }}
              >
                <span className="dm-icon">🖨</span> Print Sheet
              </button>
              <button
                className="download-menu-item"
                onClick={() => { setMenuOpen(false); exportJSON(useCharacterStore.getState()); }}
              >
                <span className="dm-icon">📄</span> Export JSON
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Step list ──────────────────────────────────────────────────────────────────
const STEPS = [
  { id: "start",       label: "Character Info",  component: WelcomeStep },
  { id: "species",     label: "Species / Race",  component: SpeciesStep },
  { id: "class",       label: "Class",           component: ClassStep },
  { id: "subclass",    label: "Subclass",        component: SubclassStep },
  { id: "background",  label: "Background",      component: BackgroundStep },
  { id: "possessions", label: "Possessions",     component: PossessionsStep },
  { id: "abilities",   label: "Ability Scores",  component: AbilityScoresStep },
  { id: "skills",      label: "Skills",          component: SkillsStep },
  { id: "spells",      label: "Spells",          component: SpellsStep },
  { id: "sheet",       label: "Character Sheet", component: SheetStep },
];

export default function App() {
  const { step, setStep, edition, setEdition, name, species, class: cls, resetCharacter } = useCharacterStore();

  const StepComponent = STEPS[step]?.component;

  function isCompleted(i) {
    if (i === 0) return !!name;
    if (i === 1) return !!species;
    if (i === 2) return !!cls;
    return i < step;
  }

  function canNavigateTo(i) {
    if (i === 0) return true;
    if (i === 1) return true;
    if (i === 2) return !!species;
    if (i === 3) return !!cls;
    // Steps 4–9: freely navigable once you've been there
    return i <= step + 1;
  }

  return (
    <div className="app-bg">
      {/* Topbar */}
      <header className="topbar">
        <div>
          <div className="topbar-title">⚔ Codex Arcanum</div>
          <div className="topbar-subtitle">D&D 5e Character Creator</div>
        </div>

        <div className="edition-toggle">
          <button className={`edition-btn${edition === "2014" ? " active" : ""}`} onClick={() => setEdition("2014")}>
            5e 2014
          </button>
          <button className={`edition-btn${edition === "2024" ? " active" : ""}`} onClick={() => setEdition("2024")}>
            5e 2024
          </button>
        </div>

        <button
          className="btn btn-secondary"
          style={{ fontSize: "0.65rem", padding: "0.35rem 0.85rem" }}
          onClick={() => { if (confirm("Reset your character? This cannot be undone.")) resetCharacter(); }}
        >
          ↺ Reset
        </button>
      </header>

      {/* Main Layout */}
      <div className="creator-layout">
        {/* Step Nav */}
        <nav className="step-nav">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              className={`step-nav-item${step === i ? " active" : ""}${isCompleted(i) && step !== i ? " completed" : ""}${!canNavigateTo(i) ? " disabled" : ""}`}
              onClick={() => canNavigateTo(i) && setStep(i)}
            >
              <div className="step-nav-number">{isCompleted(i) && step !== i ? "✓" : i + 1}</div>
              <span>{s.label}</span>
            </button>
          ))}
          <div className="step-nav-divider" />
          <div style={{ padding: "0.75rem 1.5rem" }}>
            <p style={{ fontFamily: "var(--font-header)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(181,158,84,0.5)", marginBottom: "0.4rem" }}>
              Edition
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(249,245,231,0.6)", fontStyle: "italic" }}>
              {edition === "2024" ? "2024 Player's Handbook" : "2014 Player's Handbook"}
            </p>
          </div>
        </nav>

        {/* Step Content */}
        <main className="step-content">
          {StepComponent && <StepComponent />}
        </main>

        {/* Character Sheet Sidebar */}
        <CharacterSheet sidebar />
      </div>
    </div>
  );
}
