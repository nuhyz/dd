import { useState } from "react";
import { useCharacterStore } from "../../store/characterStore";
import { classes } from "../../data/classes";
import { artMap } from "../../data/art";
import { PHBCard } from "../ui/PHBCard";
import { TraitList } from "../ui/TraitList";
import { PageHeader } from "../ui/PageHeader";

const CLASS_ICONS = {
  barbarian: "⚡", bard: "🎵", cleric: "✝️", druid: "🌿", fighter: "🛡️",
  monk: "👊", paladin: "⚖️", ranger: "🏹", rogue: "🗡️", sorcerer: "💫",
  warlock: "👁️", wizard: "📚",
};

export function ClassStep() {
  const { edition, class: selectedClass, setClass, level, setLevel, nextStep, prevStep } = useCharacterStore();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("overview");

  const visible = classes.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const sel = classes.find((c) => c.id === selectedClass?.id) || null;

  const currentLevelFeatures = sel?.classFeaturesByLevel?.filter((l) => l.level <= level) || [];

  return (
    <div className="fade-in">
      <PageHeader
        title="Choose Your Class"
        subtitle="Your class determines your combat role, spellcasting, and the special abilities you develop as you level up."
      />

      <input
        className="search-input"
        placeholder="Search classes…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="cards-grid">
        {visible.map((c) => (
          <PHBCard
            key={c.id}
            selected={selectedClass?.id === c.id}
            onClick={() => setClass(c)}
            imageSrc={artMap[c.imagePlaceholder]}
            imageKey={c.imagePlaceholder}
            title={`${CLASS_ICONS[c.id] || ""} ${c.name}`}
            subtitle={`Hit Die: ${c.hitDie} • Primary: ${c.primaryAbility}`}
            description={c.description}
            tags={[
              { label: `Saves: ${c.savingThrows.map((s) => s.slice(0, 3).toUpperCase()).join(" + ")}` },
              ...(c.spellcastingAbility ? [{ label: `Spells: ${c.spellcastingAbility.slice(0, 3).toUpperCase()}`, gold: true }] : []),
            ]}
          />
        ))}
      </div>

      {sel && (
        <div className="detail-panel mt-3 fade-in">
          <div className="flex items-center gap-2 mb-2">
            <h3>{CLASS_ICONS[sel.id]} {sel.name}</h3>
          </div>

          {sel.flavorText && <p className="flavor">{sel.flavorText}</p>}

          <div className="stats-row">
            <div className="stat-box">
              <span className="stat-label">Hit Die</span>
              <span className="stat-value">{sel.hitDie}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Primary</span>
              <span className="stat-value" style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}>{sel.primaryAbility}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Saves</span>
              <span className="stat-value" style={{ fontSize: "0.75rem" }}>{sel.savingThrows.map((s) => s.slice(0, 3).toUpperCase()).join(", ")}</span>
            </div>
            {sel.spellcastingAbility && (
              <div className="stat-box">
                <span className="stat-label">Casting</span>
                <span className="stat-value" style={{ fontSize: "0.75rem", color: "var(--phb-gold)" }}>{sel.spellcastingAbility.slice(0, 3).toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Level Picker */}
          <div className="phb-section-box">
            <h4 className="mb-1">Choose Level</h4>
            <div className="level-selector">
              {Array.from({ length: 20 }, (_, i) => i + 1).map((l) => (
                <button key={l} className={`level-chip${level === l ? " selected" : ""}`} onClick={() => setLevel(l)}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs">
            {["overview", "features", "proficiencies", "subclasses"].map((t) => (
              <button key={t} className={`tab-btn${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div>
              <p className="text-sm mb-2">{sel.description}</p>
              <div className="phb-rule" />
              <h4 className="mb-1">Level 1 Features</h4>
              <TraitList traits={sel.classFeaturesByLevel?.find((l) => l.level === 1)?.features || []} />
            </div>
          )}

          {tab === "features" && (
            <div>
              <table className="feature-table">
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Proficiency Bonus</th>
                    <th>Features</th>
                  </tr>
                </thead>
                <tbody>
                  {sel.classFeaturesByLevel?.map((row) => (
                    <tr key={row.level} className={row.level === level ? "current-level" : ""}>
                      <td>{row.level}</td>
                      <td>+{Math.ceil(row.level / 4) + 1}</td>
                      <td>{row.features.map((f) => f.name).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="phb-rule" style={{ margin: "1.5rem 0" }} />
              <h4 className="mb-1">Features at Level {level}</h4>
              {currentLevelFeatures.flatMap((row) => row.features).length > 0 ? (
                <TraitList traits={currentLevelFeatures.flatMap((row) => row.features)} />
              ) : (
                <p className="text-muted italic">No features yet.</p>
              )}
            </div>
          )}

          {tab === "proficiencies" && (
            <div className="flex flex-col gap-2">
              {sel.armorProficiencies?.length > 0 && (
                <div className="phb-section-box">
                  <strong className="text-red font-header text-xs uppercase">Armor</strong>
                  <p className="text-sm mt-1">{sel.armorProficiencies.join(", ") || "None"}</p>
                </div>
              )}
              <div className="phb-section-box">
                <strong className="text-red font-header text-xs uppercase">Weapons</strong>
                <p className="text-sm mt-1">{sel.weaponProficiencies?.join(", ") || "None"}</p>
              </div>
              {sel.toolProficiencies?.length > 0 && (
                <div className="phb-section-box">
                  <strong className="text-red font-header text-xs uppercase">Tools</strong>
                  <p className="text-sm mt-1">{sel.toolProficiencies.join(", ")}</p>
                </div>
              )}
              {sel.skillChoices && (
                <div className="phb-section-box">
                  <strong className="text-red font-header text-xs uppercase">Skills</strong>
                  <p className="text-sm mt-1">
                    Choose {sel.skillChoices.count} from:{" "}
                    {Array.isArray(sel.skillChoices.from) ? sel.skillChoices.from.join(", ") : sel.skillChoices.from}
                  </p>
                </div>
              )}
              {sel.savingThrows?.length > 0 && (
                <div className="phb-section-box">
                  <strong className="text-red font-header text-xs uppercase">Saving Throws</strong>
                  <p className="text-sm mt-1">{sel.savingThrows.join(", ")}</p>
                </div>
              )}
            </div>
          )}

          {tab === "subclasses" && (
            <div>
              <p className="text-sm italic mb-2">You choose your subclass at the indicated level.</p>
              <div className="cards-grid-2">
                {sel.subclasses?.map((sub) => (
                  <div key={sub.id} className="phb-card" style={{ cursor: "default" }}>
                    <div className="card-body">
                      <div className="card-title">{sub.name}</div>
                      <p className="card-description">{sub.description}</p>
                      {sub.features?.slice(0, 2).map((f, i) => (
                        <div key={i} className="trait-item mt-1">
                          <span className="trait-name" style={{ fontSize: "0.78rem" }}>Level {f.level}: {f.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>← Back</button>
        <button className="btn btn-primary" onClick={nextStep} disabled={!sel}>
          Choose Subclass →
        </button>
      </div>
    </div>
  );
}
