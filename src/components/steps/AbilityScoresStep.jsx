import { useState } from "react";
import { useCharacterStore, ABILITIES, ABILITY_ABBREVS, STANDARD_ARRAY, POINT_BUY_COSTS, POINT_BUY_BUDGET } from "../../store/characterStore";
import { PageHeader } from "../ui/PageHeader";

function modSign(score) {
  const mod = Math.floor((score - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function usedPoints(scores) {
  return Object.values(scores).reduce((sum, v) => sum + (POINT_BUY_COSTS[v] ?? 0), 0);
}

export function AbilityScoresStep() {
  const {
    abilityScores, setAbilityScore, setAllAbilityScores,
    abilityScoreMethod, setAbilityScoreMethod,
    edition, background, species,
    nextStep, prevStep,
  } = useCharacterStore();

  const [stdAssignments, setStdAssignments] = useState({});

  const used = usedPoints(abilityScores);
  const remaining = POINT_BUY_BUDGET - used;

  // Background ASI (2024)
  const bgAsi = edition === "2024" && background?.abilityScoreIncreases || [];
  // Species ASI (2014)
  const speciesAsi = edition === "2014" && species?.abilityScoreIncreases || [];

  function getTotalScore(ability) {
    let base = abilityScores[ability];
    const bgBonus = bgAsi.find((a) => a.ability === ability)?.amount || 0;
    const speciesBonus = speciesAsi.find((a) => a.ability === ability)?.amount || 0;
    return base + bgBonus + speciesBonus;
  }

  function handlePointBuy(ability, delta) {
    const current = abilityScores[ability];
    const next = current + delta;
    if (next < 8 || next > 15) return;
    const nextUsed = used - (POINT_BUY_COSTS[current] ?? 0) + (POINT_BUY_COSTS[next] ?? 0);
    if (nextUsed > POINT_BUY_BUDGET) return;
    setAbilityScore(ability, next);
  }

  function applyStandardArray() {
    const newScores = { ...abilityScores };
    Object.entries(stdAssignments).forEach(([ability, value]) => {
      newScores[ability] = parseInt(value);
    });
    setAllAbilityScores(newScores);
  }

  function resetPointBuy() {
    const reset = {};
    ABILITIES.forEach((a) => (reset[a] = 8));
    setAllAbilityScores(reset);
  }

  const unassigned = STANDARD_ARRAY.filter(
    (v) => !Object.values(stdAssignments).includes(String(v))
  );

  return (
    <div className="fade-in">
      <PageHeader
        title="Ability Scores"
        subtitle="Choose your method and assign ability scores. These six scores define your character's physical and mental capabilities."
      />

      {/* Method selector */}
      <div className="spell-filters mb-2">
        {[
          { id: "pointbuy", label: "Point Buy" },
          { id: "standardarray", label: "Standard Array" },
          { id: "manual", label: "Manual Entry" },
        ].map((m) => (
          <button
            key={m.id}
            className={`filter-chip${abilityScoreMethod === m.id ? " active" : ""}`}
            onClick={() => { setAbilityScoreMethod(m.id); resetPointBuy(); }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Method descriptions */}
      {abilityScoreMethod === "pointbuy" && (
        <div className="budget-bar mb-2">
          <span className="budget-label">Points Remaining</span>
          <span className={`budget-number${remaining < 0 ? " over" : remaining === 0 ? " done" : ""}`}>
            {remaining} / {POINT_BUY_BUDGET}
          </span>
          <span className="text-muted text-sm">Scores 8–15 (before bonuses)</span>
        </div>
      )}

      {abilityScoreMethod === "standardarray" && (
        <div className="info-block mb-2">
          Assign these values in any order: <strong>{STANDARD_ARRAY.join(", ")}</strong>
          {unassigned.length > 0 && <> — Remaining: <strong>{unassigned.join(", ")}</strong></>}
        </div>
      )}

      {abilityScoreMethod === "manual" && (
        <div className="info-block mb-2">
          Enter any values you wish. This is useful for importing an existing character.
        </div>
      )}

      {/* Racial / Background bonuses notice */}
      {(bgAsi.length > 0 || speciesAsi.length > 0) && (
        <div className="info-block mb-2">
          {edition === "2024" && bgAsi.length > 0 && (
            <>Background grants: {bgAsi.map((a) => `${a.ability} +${a.amount}`).join(", ")}. </>
          )}
          {edition === "2014" && speciesAsi.length > 0 && (
            <>Species grants: {speciesAsi.map((a) => `${a.ability} +${a.amount}`).join(", ")}. </>
          )}
          These are shown in the <em>Total</em> column.
        </div>
      )}

      {/* Ability Score Grid */}
      <div className="ability-grid">
        {ABILITIES.map((ability) => {
          const base = abilityScores[ability];
          const total = getTotalScore(ability);
          const mod = Math.floor((total - 10) / 2);
          const stdVal = stdAssignments[ability] || "";

          return (
            <div key={ability} className="ability-block">
              <div className="ability-label">{ABILITY_ABBREVS[ability]}</div>

              {abilityScoreMethod === "pointbuy" && (
                <div className="score-stepper">
                  <button onClick={() => handlePointBuy(ability, -1)} disabled={base <= 8}>−</button>
                  <span className="ability-score-display">{base}</span>
                  <button onClick={() => handlePointBuy(ability, 1)} disabled={base >= 15 || remaining <= 0 || (POINT_BUY_COSTS[base + 1] === undefined)}>+</button>
                </div>
              )}

              {abilityScoreMethod === "standardarray" && (
                <select
                  className="ability-input"
                  value={stdVal}
                  onChange={(e) => {
                    const v = e.target.value;
                    setStdAssignments((prev) => ({ ...prev, [ability]: v }));
                    if (v) setAbilityScore(ability, parseInt(v));
                  }}
                  style={{ fontSize: "1.2rem" }}
                >
                  <option value="">—</option>
                  {STANDARD_ARRAY.map((v) => (
                    <option key={v} value={String(v)} disabled={Object.entries(stdAssignments).some(([a, val]) => val === String(v) && a !== ability)}>
                      {v}
                    </option>
                  ))}
                </select>
              )}

              {abilityScoreMethod === "manual" && (
                <input
                  type="number"
                  className="ability-input"
                  min={1}
                  max={30}
                  value={base}
                  onChange={(e) => setAbilityScore(ability, parseInt(e.target.value) || 10)}
                />
              )}

              {/* Bonus badges */}
              {(bgAsi.find((a) => a.ability === ability) || speciesAsi.find((a) => a.ability === ability)) && (
                <span className="card-tag gold" style={{ fontSize: "0.6rem" }}>
                  +{bgAsi.find((a) => a.ability === ability)?.amount || speciesAsi.find((a) => a.ability === ability)?.amount} bonus
                </span>
              )}

              <div className="ability-modifier">{modSign(total)}</div>
              {total !== base && (
                <div className="text-xs text-muted">Total: {total}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Row */}
      <div className="phb-section-box mt-3">
        <h4 className="mb-2">Final Ability Scores</h4>
        <div className="stats-row">
          {ABILITIES.map((ability) => {
            const total = getTotalScore(ability);
            return (
              <div key={ability} className="stat-box">
                <span className="stat-label">{ABILITY_ABBREVS[ability]}</span>
                <span className="stat-value">{total}</span>
                <span className="stat-mod">{modSign(total)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>← Back</button>
        <button className="btn btn-primary" onClick={nextStep}>
          Skills & Proficiencies →
        </button>
      </div>
    </div>
  );
}
