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

// Spells Known (leveled spells, index = level 1-20)
const SPELLS_KNOWN = {
  bard:     [null, 4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,16,16,16,17],
  ranger:   [null, 2,3,3,4,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11],
  sorcerer: [null, 2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,15,15,15,15,15],
  warlock:  [null, 2,3,4,4,5,5,6,6,7,7,8,8,9,9,9,9,9,9,9,9],
};

// Cantrips Known (index = level 1-20)
const CANTRIPS_KNOWN = {
  bard:     [null, 2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
  cleric:   [null, 3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5],
  druid:    [null, 2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
  sorcerer: [null, 4,4,4,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6],
  warlock:  [null, 2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4],
  wizard:   [null, 3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5],
};

// Prepared casters: spells prepared = abilityMod + level (or half level)
const PREPARED_CASTERS = {
  cleric:  { label: "Wisdom", key: "Wisdom", halfLevel: false },
  druid:   { label: "Wisdom", key: "Wisdom", halfLevel: false },
  paladin: { label: "Charisma", key: "Charisma", halfLevel: true },
  wizard:  { label: "Intelligence", key: "Intelligence", halfLevel: false },
};

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
    getModifier,
    nextStep, prevStep,
  } = useCharacterStore();

  const [levelFilter, setLevelFilter] = useState("all");
  const [schoolFilter, setSchoolFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedSpell, setExpandedSpell] = useState(null);

  const classId = selectedClass?.id || "";
  const isNonCaster = !selectedClass || NON_CASTERS.includes(classId);

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

  // ── Spell limit calculations ──────────────────────────────────────────────
  const knownCantrips = knownSpells.filter((id) => {
    const sp = spells.find((s) => s.id === id);
    return sp?.level === 0;
  });
  const knownLeveled = knownSpells.filter((id) => {
    const sp = spells.find((s) => s.id === id);
    return sp && sp.level > 0;
  });

  const maxCantrips = CANTRIPS_KNOWN[classId]?.[level] ?? null;
  const maxLeveled  = SPELLS_KNOWN[classId]?.[level] ?? null;

  // Prepared casters
  const prepConfig = PREPARED_CASTERS[classId] || null;
  let maxPrepared = null;
  if (prepConfig) {
    const abilityMod = getModifier(prepConfig.key);
    const lvlContrib = prepConfig.halfLevel ? Math.floor(level / 2) : level;
    maxPrepared = Math.max(1, abilityMod + lvlContrib);
  }

  // Can the user still pick more?
  function canSelectMore(spell) {
    if (knownSpells.includes(spell.id)) return true; // already selected — can deselect
    if (spell.level === 0 && maxCantrips !== null && knownCantrips.length >= maxCantrips) return false;
    if (spell.level > 0 && maxLeveled !== null && knownLeveled.length >= maxLeveled) return false;
    if (spell.level > 0 && prepConfig && knownLeveled.length >= maxPrepared) return false;
    return true;
  }

  function badgeClass(current, max) {
    if (max === null) return null;
    if (current > max) return "over";
    if (current === max) return "full";
    return "ok";
  }

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

      {/* Spell limit counters */}
      <div className="spell-limit-bar">
        {maxCantrips !== null && (
          <div className={`spell-limit-badge ${badgeClass(knownCantrips.length, maxCantrips)}`}>
            <span>Cantrips</span>
            <span className="slb-num">{knownCantrips.length}</span>
            <span style={{ opacity: 0.6 }}>/ {maxCantrips}</span>
          </div>
        )}
        {maxLeveled !== null && (
          <div className={`spell-limit-badge ${badgeClass(knownLeveled.length, maxLeveled)}`}>
            <span>Spells Known</span>
            <span className="slb-num">{knownLeveled.length}</span>
            <span style={{ opacity: 0.6 }}>/ {maxLeveled}</span>
          </div>
        )}
        {prepConfig && maxPrepared !== null && (
          <div className={`spell-limit-badge ${badgeClass(knownLeveled.length, maxPrepared)}`}>
            <span>Prepared</span>
            <span className="slb-num">{knownLeveled.length}</span>
            <span style={{ opacity: 0.6 }}>/ {maxPrepared}</span>
          </div>
        )}
        {maxCantrips === null && maxLeveled === null && !prepConfig && (
          <div className="spell-limit-badge ok">
            <span>{knownSpells.length} spell{knownSpells.length !== 1 ? "s" : ""} selected</span>
          </div>
        )}
      </div>

      {prepConfig && (
        <div className="info-block mb-2" style={{ fontSize: "0.85rem" }}>
          As a {selectedClass.name}, you prepare spells each day: <strong>{prepConfig.label} modifier + {prepConfig.halfLevel ? "½ " : ""}Level</strong> = <strong>{maxPrepared} spell{maxPrepared !== 1 ? "s" : ""}</strong>. Click a spell to add/remove it from your prepared list.
        </div>
      )}

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
            const known    = knownSpells.includes(sp.id);
            const expanded = expandedSpell === sp.id;
            const blocked  = !known && !canSelectMore(sp);

            return (
              <div
                key={sp.id}
                className={`spell-row${known ? " known" : ""}`}
                onClick={() => !blocked && toggleSpell(sp.id)}
                onContextMenu={(e) => { e.preventDefault(); setExpandedSpell(expanded ? null : sp.id); }}
                style={{ opacity: blocked ? 0.45 : 1, cursor: blocked ? "not-allowed" : "pointer" }}
                title={blocked ? "Spell limit reached" : undefined}
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
                {blocked && (
                  <span style={{ fontSize: "0.7rem", color: "rgba(249,245,231,0.4)", fontFamily: "var(--font-header)", letterSpacing: "0.04em", flexShrink: 0, alignSelf: "center" }}>LIMIT</span>
                )}
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
