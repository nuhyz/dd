import { useCharacterStore, ABILITIES, ABILITY_ABBREVS, ALL_SKILLS } from "../../store/characterStore";
import { spells as allSpells } from "../../data/spells";

function sign(n) { return n >= 0 ? `+${n}` : `${n}`; }

export function CharacterSheet({ sidebar = false }) {
  const {
    name, species, class: cls, subclass, background, level,
    alignment, abilityScores, skills, expertiseSkills,
    spells: knownSpells, edition,
    getModifier, getProficiencyBonus,
  } = useCharacterStore();

  const profBonus = getProficiencyBonus();

  function getAbilityMod(ability) { return getModifier(ability); }
  function skillBonus(skill) {
    const mod = getAbilityMod(skill.ability);
    const prof = skills.includes(skill.name) || (background?.skillProficiencies || []).includes(skill.name);
    const exp = expertiseSkills.includes(skill.name);
    return mod + (exp ? profBonus * 2 : prof ? profBonus : 0);
  }

  // Passive Perception
  const percSkill = ALL_SKILLS.find((s) => s.name === "Perception");
  const passPerc = 10 + skillBonus(percSkill);

  // AC calculation
  const dexMod = getAbilityMod("Dexterity");
  const conMod = getAbilityMod("Constitution");
  const wisMod = getAbilityMod("Wisdom");
  const hasUnarmoredDef = cls?.id === "barbarian" || cls?.id === "monk";
  const ac = hasUnarmoredDef
    ? cls.id === "barbarian"
      ? 10 + dexMod + conMod
      : 10 + dexMod + wisMod
    : 10 + dexMod;

  // HP
  const hitDieNum = cls?.hitDie ? parseInt(cls.hitDie.replace("d", "")) : 8;
  const conBonus = conMod * level;
  const maxHp = hitDieNum + Math.floor((hitDieNum / 2 + 1) * (level - 1)) + conBonus;

  const selectedSpells = allSpells.filter((s) => knownSpells.includes(s.id));

  if (sidebar) {
    return (
      <aside className="character-sheet-sidebar">
        <div className="sheet-section">
          <div className="sheet-section-header">Character</div>
          <div className="sheet-section-body">
            <div className="sheet-field">
              <span className="sheet-field-label">Name</span>
              <span className="sheet-field-value">{name || "—"}</span>
            </div>
            <div className="sheet-field">
              <span className="sheet-field-label">Species</span>
              <span className="sheet-field-value">{species?.name || "—"}</span>
            </div>
            <div className="sheet-field">
              <span className="sheet-field-label">Class</span>
              <span className="sheet-field-value">{cls ? `${cls.name} ${level}` : "—"}</span>
            </div>
            <div className="sheet-field">
              <span className="sheet-field-label">Subclass</span>
              <span className="sheet-field-value">{subclass?.name || "—"}</span>
            </div>
            <div className="sheet-field">
              <span className="sheet-field-label">Background</span>
              <span className="sheet-field-value">{background?.name || "—"}</span>
            </div>
          </div>
        </div>

        <div className="sheet-section">
          <div className="sheet-section-header">Ability Scores</div>
          <div className="sheet-section-body" style={{ padding: "0.5rem" }}>
            <div className="sheet-ability-grid">
              {ABILITIES.map((ab) => {
                const score = abilityScores[ab];
                const mod = getAbilityMod(ab);
                return (
                  <div key={ab} className="sheet-ability-box">
                    <div className="sheet-ability-name">{ABILITY_ABBREVS[ab]}</div>
                    <div className="sheet-ability-score">{score}</div>
                    <div className="sheet-ability-mod">{sign(mod)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="sheet-section">
          <div className="sheet-section-header">Combat</div>
          <div className="sheet-section-body">
            <div className="sheet-field">
              <span className="sheet-field-label">AC</span>
              <span className="sheet-field-value">{ac}</span>
            </div>
            <div className="sheet-field">
              <span className="sheet-field-label">Max HP</span>
              <span className="sheet-field-value">{maxHp}</span>
            </div>
            <div className="sheet-field">
              <span className="sheet-field-label">Prof. Bonus</span>
              <span className="sheet-field-value">{sign(profBonus)}</span>
            </div>
            <div className="sheet-field">
              <span className="sheet-field-label">Passive Perc.</span>
              <span className="sheet-field-value">{passPerc}</span>
            </div>
            <div className="sheet-field">
              <span className="sheet-field-label">Speed</span>
              <span className="sheet-field-value">{species?.speed || 30} ft.</span>
            </div>
          </div>
        </div>

        {knownSpells.length > 0 && (
          <div className="sheet-section">
            <div className="sheet-section-header">Spells ({knownSpells.length})</div>
            <div className="sheet-section-body">
              {selectedSpells.slice(0, 6).map((sp) => (
                <div key={sp.id} className="sheet-field">
                  <span className="sheet-field-label" style={{ fontSize: "0.6rem" }}>
                    {sp.level === 0 ? "Cantrip" : `${sp.level}th`}
                  </span>
                  <span className="sheet-field-value" style={{ fontSize: "0.75rem" }}>{sp.name}</span>
                </div>
              ))}
              {selectedSpells.length > 6 && (
                <p className="text-xs text-muted italic" style={{ textAlign: "center", marginTop: "0.25rem" }}>
                  +{selectedSpells.length - 6} more
                </p>
              )}
            </div>
          </div>
        )}
      </aside>
    );
  }

  // Full sheet view
  return (
    <div className="character-sheet fade-in">
      <div className="cs-header">
        <div>
          <div className="cs-name">{name || "Unnamed Hero"}</div>
          <div className="cs-subtitle">
            {[
              species?.name,
              cls ? `${cls.name} ${level}` : null,
              subclass?.name,
              background?.name,
              alignment,
              `${edition} Edition`,
            ].filter(Boolean).join(" · ")}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
          <div className="stat-box" style={{ background: "rgba(181,158,84,0.15)", borderColor: "rgba(181,158,84,0.3)" }}>
            <span className="stat-label" style={{ color: "var(--phb-gold)" }}>Max HP</span>
            <span className="stat-value" style={{ color: "var(--phb-parchment)" }}>{maxHp}</span>
          </div>
        </div>
      </div>

      <div className="cs-body">
        <div className="cs-grid">
          {/* Left: abilities */}
          <div className="cs-abilities">
            {ABILITIES.map((ability) => {
              const score = abilityScores[ability];
              const mod = getAbilityMod(ability);
              return (
                <div key={ability} className="cs-ability">
                  <div className="cs-ability-name">{ability}</div>
                  <div className="cs-ability-score">{score}</div>
                  <div className="cs-ability-mod">{sign(mod)}</div>
                </div>
              );
            })}
          </div>

          {/* Right: combat stats + skills */}
          <div>
            <div className="stats-row mb-2">
              <div className="stat-box">
                <span className="stat-label">AC</span>
                <span className="stat-value">{ac}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Prof</span>
                <span className="stat-value">{sign(profBonus)}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Speed</span>
                <span className="stat-value">{species?.speed || 30}</span>
                <span className="stat-mod">ft.</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Passive Perc</span>
                <span className="stat-value">{passPerc}</span>
              </div>
              {cls?.hitDie && (
                <div className="stat-box">
                  <span className="stat-label">Hit Die</span>
                  <span className="stat-value">{cls.hitDie}</span>
                  <span className="stat-mod">×{level}</span>
                </div>
              )}
            </div>

            {/* Saving Throws */}
            <h4 className="mb-1">Saving Throws</h4>
            <div className="skills-grid mb-2">
              {ABILITIES.map((ability) => {
                const isProficient = cls?.savingThrows?.includes(ability);
                const mod = getAbilityMod(ability);
                const total = mod + (isProficient ? profBonus : 0);
                return (
                  <div key={ability} className={`skill-row${isProficient ? " proficient" : ""}`} style={{ cursor: "default" }}>
                    <div className={`skill-checkbox${isProficient ? " checked" : ""}`}>{isProficient ? "✓" : ""}</div>
                    <span className="skill-name">{ability}</span>
                    <span className="skill-ability">{ABILITY_ABBREVS[ability]}</span>
                    <span className="skill-bonus">{sign(total)}</span>
                  </div>
                );
              })}
            </div>

            {/* Skills */}
            <h4 className="mb-1">Skills</h4>
            <div className="skills-grid">
              {ALL_SKILLS.map((skill) => {
                const isProficient = skills.includes(skill.name) || (background?.skillProficiencies || []).includes(skill.name);
                const isExpert = expertiseSkills.includes(skill.name);
                const bonus = skillBonus(skill);
                return (
                  <div key={skill.name} className={`skill-row${isProficient ? " proficient" : ""}`} style={{ cursor: "default" }}>
                    <div className={`skill-checkbox${isExpert ? " expertise" : isProficient ? " checked" : ""}`}>
                      {isExpert ? "★" : isProficient ? "✓" : ""}
                    </div>
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-ability">{ABILITY_ABBREVS[skill.ability]}</span>
                    <span className="skill-bonus">{sign(bonus)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Proficiencies */}
        <div className="phb-rule" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <h4 className="mb-1">Armor</h4>
            <p className="text-sm">{cls?.armorProficiencies?.join(", ") || "None"}</p>
          </div>
          <div>
            <h4 className="mb-1">Weapons</h4>
            <p className="text-sm">{cls?.weaponProficiencies?.join(", ") || "None"}</p>
          </div>
          <div>
            <h4 className="mb-1">Languages</h4>
            <p className="text-sm">{species?.languages?.join(", ") || "Common"}</p>
          </div>
        </div>

        {/* Class Features */}
        {cls && (
          <>
            <div className="phb-rule" />
            <h3 className="mb-2">Class Features (Level {level})</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {cls.classFeaturesByLevel
                ?.filter((row) => row.level <= level)
                .flatMap((row) => row.features)
                .map((f, i) => (
                  <div key={i} className="trait-item">
                    <span className="trait-name">{f.name}.</span>
                    <span className="trait-desc"> {f.description}</span>
                  </div>
                ))}
            </div>
          </>
        )}

        {/* Species Traits */}
        {species?.traits?.length > 0 && (
          <>
            <div className="phb-rule" />
            <h3 className="mb-2">Species Traits</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {species.traits.map((t, i) => (
                <div key={i} className="trait-item">
                  <span className="trait-name">{t.name}.</span>
                  <span className="trait-desc"> {t.description}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Spells */}
        {selectedSpells.length > 0 && (
          <>
            <div className="phb-rule" />
            <h3 className="mb-2">Spells</h3>
            {[0, 1, 2, 3, 4, 5].map((lvl) => {
              const levelSpells = selectedSpells.filter((s) => s.level === lvl);
              if (!levelSpells.length) return null;
              return (
                <div key={lvl} className="mb-2">
                  <h4 className="mb-1">{lvl === 0 ? "Cantrips" : `${lvl}${lvl === 1 ? "st" : lvl === 2 ? "nd" : lvl === 3 ? "rd" : "th"} Level`}</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {levelSpells.map((sp) => (
                      <div key={sp.id} className="trait-item">
                        <span className="trait-name">{sp.name}</span>
                        <span className="trait-desc"> {sp.castingTime} · {sp.range} · {sp.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
