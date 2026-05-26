import { useState } from "react";
import { useCharacterStore } from "../../store/characterStore";
import { PageHeader } from "../ui/PageHeader";

export function PossessionsStep() {
  const {
    class: selectedClass,
    background,
    customPossessions,
    addCustomPossession,
    removeCustomPossession,
    nextStep,
    prevStep,
  } = useCharacterStore();

  const [newItem, setNewItem] = useState("");

  const classEquipment = selectedClass?.startingEquipment || [];
  const bgEquipment = background?.equipment || null;

  function handleAdd() {
    const trimmed = newItem.trim();
    if (trimmed) {
      addCustomPossession(trimmed);
      setNewItem("");
    }
  }

  return (
    <div className="fade-in">
      <PageHeader
        title="Possessions & Equipment"
        subtitle="Your starting gear is determined by your class and background. You may also list any additional items with your DM's approval."
      />

      {/* Class Equipment */}
      {classEquipment.length > 0 && (
        <div className="phb-section-box">
          <strong className="text-red font-header text-xs uppercase" style={{ color: "var(--phb-gold)" }}>
            Class Starting Equipment — {selectedClass.name}
          </strong>
          <ul style={{ paddingLeft: "1.3rem", marginTop: "0.6rem" }}>
            {classEquipment.map((item, i) => (
              <li key={i} className="text-sm" style={{ marginBottom: "0.35rem", color: "rgba(249,245,231,0.82)" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!classEquipment.length && !selectedClass && (
        <div className="info-block">No class selected — go back and choose a class first.</div>
      )}

      {/* Background Equipment */}
      {bgEquipment && (
        <div className="phb-section-box">
          <strong className="text-red font-header text-xs uppercase" style={{ color: "var(--phb-gold)" }}>
            Background Equipment — {background.name}
          </strong>
          <p className="text-sm mt-1" style={{ color: "rgba(249,245,231,0.82)" }}>{bgEquipment}</p>
        </div>
      )}

      {!bgEquipment && !background && (
        <div className="info-block">No background selected — go back and choose a background first.</div>
      )}

      {/* Custom / Extra Items */}
      <div className="phb-section-box">
        <strong className="text-red font-header text-xs uppercase" style={{ color: "var(--phb-gold)" }}>
          Custom Items
        </strong>

        <div className="info-block" style={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}>
          ⚠️ <strong>DM Approval Required</strong> — Adding items beyond your standard starting equipment requires your Dungeon Master's permission. Discuss any additions with your DM before play.
        </div>

        {customPossessions.length > 0 && (
          <div style={{ marginBottom: "0.75rem" }}>
            {customPossessions.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.4rem 0",
                  borderBottom: "1px solid rgba(181,158,84,0.15)",
                }}
              >
                <span className="text-sm" style={{ color: "rgba(249,245,231,0.85)" }}>• {item}</span>
                <button
                  onClick={() => removeCustomPossession(i)}
                  style={{
                    background: "rgba(88,24,13,0.3)",
                    border: "1px solid rgba(88,24,13,0.5)",
                    color: "#f87171",
                    borderRadius: "3px",
                    padding: "0.15rem 0.55rem",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-header)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {customPossessions.length === 0 && (
          <p className="text-sm italic" style={{ color: "rgba(249,245,231,0.4)", marginBottom: "0.75rem" }}>
            No custom items added yet.
          </p>
        )}

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "stretch" }}>
          <input
            className="search-input"
            placeholder="e.g. Heirloom dagger, Lucky coin, Spellbook…"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
            style={{ marginBottom: 0, flex: 1 }}
          />
          <button
            className="btn btn-primary"
            onClick={handleAdd}
            disabled={!newItem.trim()}
            style={{ flexShrink: 0 }}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Custom Background / Patron */}
      <div className="phb-section-box">
        <strong className="text-red font-header text-xs uppercase" style={{ color: "var(--phb-gold)" }}>
          Define Your Own Background or Patron
        </strong>
        <p className="text-sm mt-1" style={{ color: "rgba(249,245,231,0.65)", fontStyle: "italic", marginBottom: "0.75rem" }}>
          The next step (Ability Scores) and the Character Info step let you define a custom patron, deity, or organisation, and add personal notes. These are free-form fields for your own records.
        </p>
        <div className="info-block">
          💡 Want a fully custom background? Work with your DM to agree on skill proficiencies, a feature, and equipment, then select the closest existing background above and note the changes here.
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>← Background</button>
        <button className="btn btn-primary" onClick={nextStep}>Ability Scores →</button>
      </div>
    </div>
  );
}
