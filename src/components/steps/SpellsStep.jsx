import { useState } from "react";
import { useCharacterStore } from "../../store/characterStore";
import { spells, spellSchools } from "../../data/spells";
import { PageHeader } from "../ui/PageHeader";

const SCHOOL_COLORS = {
  Abjuration: "#4a6fa5", Conjuration: "#7a5ea5", Divination: "#5e9a8a",
  Enchantment: "#9a5e8a", Evocation: "#c0522a", Illusion: "#4a8a6a",
  Necromancy: "#3a5a3a", Transmutation: "#8a7a30",
};

const NON_CASTERS = ["barbarian", "fighter", "monk", "rogue"];

function levelLabel(level) {
  if (level === 0) return "Cantrip";
  if (level === 1) return "1st";
  if (level === 2) return "2nd";
  if (level === 3) return "3rd";
  return `${level}th`;
}

export function SpellsStep() {
  const {
    class: selectedClass, level, spells: knownSpells, toggleSpell,
    nextStep, prevStep,
  } = useCharacterStore();

  const [levelFilter, setLevelFilter] = useState("all");
  const [schoolFilter, setSchoolFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedSpell, setExpandedSpell] = useState(null);

  const isNonCaster = !selectedClass || NON_CASTERS.includes(selectedClass.id);

  // Filter spells accessible to the class
  const classSpells = isNonCaster
    ? []
    : spells.filter((sp) =>
        sp.classes.some((c) => c.toLowerCase() === selectedClass?.name?.toLowerCase())
      );

  const maxSpellLevel = Math.min(Math.ceil(level / 2), 9);

  const visible = classSpells.filter((sp) => {
    const matchLevel = levelFilter === "all" || sp.level === parseInt(levelFilter);
    const matchSchool = schoolFilter === "all" || sp.school === schoolFilter;
    const matchSearch =
      sp.name.toLowerCase().includes(search.toLowerCase()) ||
      sp.description.toLowerCase().includes(search.toLowerCase());
    const withinLevel = sp.level === 0 || sp.level <= maxSpellLevel;
    return matchLevel && matchSchool && matchSearch && withinLevel;
  });

  const levels = [0, 1, 2, 3, 4, 5].filter((l) => l === 0 || l <= maxSpellLevel);

  if (isNonCaster) {
    return (
      <div className="fade-in">
        <PageHeader title="Spells" subtitle="Spellcasting" />
        <div className="info-block">
          {selectedClass?.name || "This class"} does not use spells.
          {selectedClass?.id === "fighter" && " (Eldritch Knights cast wizard spells — see subclass.)"}
          {selectedClass?.id === "rogue" && " (Arcane Tricksters cast wizard spells — see subclass.)"}
        </div>
        <div className="nav-buttons">
          <button className="btn btn-secondary" onClick={prevStep}>← Back</button>
          <button className="btn btn-primary" onClick={nextStep}>View Character Sheet →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <PageHeader
        title="Spells"
        subtitle={`Select spells for your ${selectedClass?.name} (Level ${level}). Max spell level: ${levelLabel(maxSpellLevel)}.`}
      />

      <div className="info-block mb-2">
        {knownSpells.length} spell{knownSpells.length !== 1 ? "s" : ""} selected.
        {" "}Click a spell to add/remove it from your list.
      </div>

      <input
        className="search-input"
        placeholder="Search spells by name or description…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="spell-filters">
        <button className={`filter-chip${levelFilter === "all" ? " active" : ""}`} onClick={() => setLevelFilter("all")}>All Levels</button>
        {levels.map((l) => (
          <button key={l} className={`filter-chip${levelFilter === String(l) ? " active" : ""}`} onClick={() => setLevelFilter(String(l))}>
            {l === 0 ? "Cantrips" : `${levelLabel(l)} Level`}
          </button>
        ))}
      </div>

      <div className="spell-filters mb-2">
        <button className={`filter-chip${schoolFilter === "all" ? " active" : ""}`} onClick={() => setSchoolFilter("all")}>All Schools</button>
        {spellSchools.map((s) => (
          <button key={s} className={`filter-chip${schoolFilter === s ? " active" : ""}`} onClick={() => setSchoolFilter(s)}>{s}</button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-muted italic" style={{ padding: "2rem 0" }}>No spells match your filters.</p>
      ) : (
        <div className="spell-list">
          {visible.map((sp) => {
            const known = knownSpells.includes(sp.id);
            const expanded = expandedSpell === sp.id;

            return (
              <div
                key={sp.id}
                className={`spell-row${known ? " known" : ""}`}
                onClick={() => toggleSpell(sp.id)}
                onContextMenu={(e) => { e.preventDefault(); setExpandedSpell(expanded ? null : sp.id); }}
              >
                <span className={`spell-level-badge${sp.level === 0 ? " cantrip" : ""}`}>
                  {sp.level === 0 ? "Cantrip" : `${levelLabel(sp.level)}`}
                </span>
                <span
                  className="spell-school-dot"
                  style={{ background: SCHOOL_COLORS[sp.school] || "#888" }}
                  title={sp.school}
                />
                <div className="spell-info">
                  <div className="spell-name">{sp.name}</div>
                  <div className="spell-meta">
                    {sp.castingTime} • {sp.range} • {sp.duration}
                    {" · "}{sp.school}
                    {" · "}{sp.components.join(", ")}
                  </div>
                  {expanded && (
                    <p className="spell-desc-preview" style={{ WebkitLineClamp: "unset", marginTop: "0.5rem" }}>
                      {sp.description}
                    </p>
                  )}
                  {!expanded && (
                    <p className="spell-desc-preview">{sp.description}</p>
                  )}
                  <div className="spell-badges">
                    {sp.ritual && <span className="spell-badge ritual">Ritual</span>}
                    {sp.concentration && <span className="spell-badge concentration">Concentration</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="text-xs text-muted mt-2 italic">
        Left-click to add/remove. Right-click to expand description.
      </p>

      {knownSpells.length > 0 && (
        <div className="phb-section-box mt-3">
          <h4 className="mb-1">Selected Spells ({knownSpells.length})</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {knownSpells.map((id) => {
              const sp = spells.find((s) => s.id === id);
              if (!sp) return null;
              return (
                <span
                  key={id}
                  className="card-tag"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleSpell(id)}
                  title="Click to remove"
                >
                  {sp.name} ×
                </span>
              );
            })}
          </div>
        </div>
      )}

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>← Back</button>
        <button className="btn btn-primary" onClick={nextStep}>View Character Sheet →</button>
      </div>
    </div>
  );
}
