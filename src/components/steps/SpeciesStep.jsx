import { useState } from "react";
import { useCharacterStore } from "../../store/characterStore";
import { species } from "../../data/species";
import { PHBCard } from "../ui/PHBCard";
import { TraitList } from "../ui/TraitList";
import { PageHeader } from "../ui/PageHeader";

const SCHOOL_ICONS = {
  Dwarf: "⛏️", Elf: "🏹", Halfling: "🍀", Human: "🧑", Dragonborn: "🐉",
  Gnome: "⚙️", "Half-Elf": "✨", "Half-Orc": "⚔️", Tiefling: "🔥",
  Aasimar: "☀️", Goliath: "🏔️", Orc: "💪",
};

export function SpeciesStep() {
  const { edition, species: selectedSpecies, setSpecies, nextStep, prevStep,
    draconicAncestry, setDraconicAncestry,
    elvenLineage, setElvenLineage,
    tieflingLegacy, setTieflingLegacy,
    gnomeLineage, setGnomeLineage,
    aasimar_revelation, setAasimarRevelation,
  } = useCharacterStore();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const editionFilter = edition === "2024" ? "2024" : "2014";
  const list = species.filter((s) => s.edition === editionFilter);
  const categories = ["All", ...new Set(list.map((s) => s.category))];

  const visible = list.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || s.category === filter;
    return matchSearch && matchFilter;
  });

  const sel = list.find((s) => s.id === selectedSpecies?.id) || null;

  function handleSelect(s) {
    setSpecies(s);
    setDraconicAncestry(null);
    setElvenLineage(null);
    setTieflingLegacy(null);
    setGnomeLineage(null);
    setAasimarRevelation(null);
  }

  const needsDragon = sel?.draconicAncestry;
  const needsLineage = sel?.lineage;
  const needsLegacy = sel?.legacyOptions;
  const needsGnome = sel?.lineageOptions && sel?.category === "Gnome";

  const canContinue = sel && (
    (!needsDragon || draconicAncestry) &&
    (!needsLineage || elvenLineage) &&
    (!needsLegacy || tieflingLegacy) &&
    (!needsGnome || gnomeLineage)
  );

  function modStr(amount) {
    return amount > 0 ? `+${amount}` : `${amount}`;
  }

  return (
    <div className="fade-in">
      <PageHeader
        title={edition === "2024" ? "Choose Your Species" : "Choose Your Race"}
        subtitle="Your character's species shapes their abilities, culture, and how others perceive them."
      />

      <input
        className="search-input"
        placeholder="Search by name or description…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="spell-filters">
        {categories.map((c) => (
          <button key={c} className={`filter-chip${filter === c ? " active" : ""}`} onClick={() => setFilter(c)}>
            {SCHOOL_ICONS[c] || ""} {c}
          </button>
        ))}
      </div>

      <div className="cards-grid">
        {visible.map((s) => (
          <PHBCard
            key={s.id}
            selected={selectedSpecies?.id === s.id}
            onClick={() => handleSelect(s)}
            imageKey={s.imagePlaceholder}
            title={s.name}
            subtitle={`${s.size} • ${s.speed} ft. speed`}
            description={s.description}
            tags={[
              ...(s.abilityScoreIncreases?.map((a) => ({ label: `${a.ability.slice(0, 3).toUpperCase()} ${modStr(a.amount)}` })) || []),
              { label: s.source, gold: true },
            ]}
          />
        ))}
        {visible.length === 0 && (
          <p className="text-muted italic" style={{ gridColumn: "1/-1", textAlign: "center", padding: "2rem 0" }}>
            No species match your search.
          </p>
        )}
      </div>

      {/* Detail Panel */}
      {sel && (
        <div className="detail-panel mt-3 fade-in">
          <div className="flex items-center gap-2 mb-2">
            <h3>{sel.name}</h3>
            <span className="card-tag gold">{sel.source}</span>
          </div>

          {sel.flavorText && <p className="flavor">{sel.flavorText}</p>}

          <div className="stats-row">
            <div className="stat-box">
              <span className="stat-label">Size</span>
              <span className="stat-value" style={{ fontSize: "0.95rem" }}>{sel.size}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Speed</span>
              <span className="stat-value">{sel.speed}</span>
              <span className="stat-mod">ft.</span>
            </div>
            {sel.abilityScoreIncreases?.map((a, i) => (
              <div key={i} className="stat-box">
                <span className="stat-label">{a.ability.slice(0, 3).toUpperCase()}</span>
                <span className="stat-value" style={{ color: "var(--phb-red)" }}>{modStr(a.amount)}</span>
              </div>
            ))}
          </div>

          {sel.note && (
            <div className="info-block mb-2">
              <strong>Note:</strong> {sel.note}
            </div>
          )}

          {sel.languages?.length > 0 && (
            <div className="mb-2">
              <strong className="text-red font-header text-xs uppercase">Languages: </strong>
              <span className="text-sm">{sel.languages.join(", ")}</span>
            </div>
          )}

          <div className="phb-rule" />

          <h4 style={{ marginBottom: "0.5rem" }}>Racial Traits</h4>
          <TraitList traits={sel.traits} />

          {/* Draconic Ancestry Picker */}
          {needsDragon && (
            <div className="phb-section-box mt-3">
              <h4>Choose Your Draconic Ancestry</h4>
              <p className="text-sm italic mb-2">Your ancestry determines your breath weapon damage type and resistance.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "0.4rem" }}>
                {sel.draconicAncestryOptions.map((o) => (
                  <button
                    key={o.dragon}
                    className={`filter-chip${draconicAncestry?.dragon === o.dragon ? " active" : ""}`}
                    onClick={() => setDraconicAncestry(o)}
                  >
                    {o.dragon} ({o.damage})
                  </button>
                ))}
              </div>
              {draconicAncestry && (
                <div className="info-block mt-2">
                  <strong>{draconicAncestry.dragon} Dragon:</strong> {draconicAncestry.damage} damage
                  {draconicAncestry.breath && ` — ${draconicAncestry.breath}`}
                </div>
              )}
            </div>
          )}

          {/* Elven Lineage Picker */}
          {needsLineage && sel.lineageOptions && (
            <div className="phb-section-box mt-3">
              <h4>Choose Your Elven Lineage</h4>
              <p className="text-sm italic mb-2">Your lineage grants additional spells and traits.</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {sel.lineageOptions.map((o) => (
                  <button
                    key={o.name}
                    className={`filter-chip${elvenLineage?.name === o.name ? " active" : ""}`}
                    onClick={() => setElvenLineage(o)}
                  >
                    {o.name}
                  </button>
                ))}
              </div>
              {elvenLineage && (
                <div className="info-block mt-2">
                  <strong>{elvenLineage.name}:</strong> {elvenLineage.description}
                </div>
              )}
            </div>
          )}

          {/* Tiefling Legacy Picker */}
          {needsLegacy && (
            <div className="phb-section-box mt-3">
              <h4>Choose Your Fiendish Legacy</h4>
              <p className="text-sm italic mb-2">Your legacy determines your damage resistance and spells.</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {sel.legacyOptions.map((o) => (
                  <button
                    key={o.name}
                    className={`filter-chip${tieflingLegacy?.name === o.name ? " active" : ""}`}
                    onClick={() => setTieflingLegacy(o)}
                  >
                    {o.name} (Resist {o.resistance})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Gnome Lineage Picker */}
          {needsGnome && (
            <div className="phb-section-box mt-3">
              <h4>Choose Your Gnomish Lineage</h4>
              <p className="text-sm italic mb-2">Forest Gnome or Rock Gnome — each grants different abilities.</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {sel.lineageOptions.map((o) => (
                  <button
                    key={o.name}
                    className={`filter-chip${gnomeLineage?.name === o.name ? " active" : ""}`}
                    onClick={() => setGnomeLineage(o)}
                  >
                    {o.name}
                  </button>
                ))}
              </div>
              {gnomeLineage && (
                <div className="info-block mt-2">
                  <strong>{gnomeLineage.name}:</strong> {gnomeLineage.description}
                </div>
              )}
            </div>
          )}

          {/* Age & Alignment Info */}
          <div className="phb-section-box mt-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <strong className="text-red font-header text-xs uppercase">Age</strong>
              <p className="text-sm mt-1">{sel.age}</p>
            </div>
            <div>
              <strong className="text-red font-header text-xs uppercase">Alignment</strong>
              <p className="text-sm mt-1">{sel.alignment}</p>
            </div>
          </div>
        </div>
      )}

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep} disabled>← Character Info</button>
        <button className="btn btn-primary" onClick={nextStep} disabled={!canContinue}>
          Choose Class →
        </button>
      </div>
    </div>
  );
}
