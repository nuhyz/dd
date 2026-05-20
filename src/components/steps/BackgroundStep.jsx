import { useState } from "react";
import { useCharacterStore } from "../../store/characterStore";
import { backgrounds } from "../../data/backgrounds";
import { PHBCard } from "../ui/PHBCard";
import { PageHeader } from "../ui/PageHeader";

export function BackgroundStep() {
  const { edition, background, setBackground, nextStep, prevStep } = useCharacterStore();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("overview");

  const editionFilter = edition === "2024" ? "2024" : "2014";
  const list = backgrounds.filter((b) => b.edition === editionFilter);

  const visible = list.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase())
  );

  const sel = list.find((b) => b.id === background?.id) || null;

  return (
    <div className="fade-in">
      <PageHeader
        title="Choose Your Background"
        subtitle="Your character's background reveals where you came from, how you became an adventurer, and your place in the world."
      />

      {edition === "2024" && (
        <div className="info-block mb-2">
          In 2024 D&D, your Background grants your Ability Score Increases (+1 to three abilities) and a Starting Feat.
        </div>
      )}

      <input
        className="search-input"
        placeholder="Search backgrounds…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="cards-grid">
        {visible.map((b) => (
          <PHBCard
            key={b.id}
            selected={background?.id === b.id}
            onClick={() => setBackground(b)}
            imageKey={b.imagePlaceholder}
            title={b.name}
            subtitle={b.skillProficiencies?.join(", ")}
            description={b.description}
            tags={[
              ...(b.abilityScoreIncreases?.map((a) => ({ label: `${a.ability.slice(0, 3).toUpperCase()} +${a.amount}` })) || []),
              ...(b.feat ? [{ label: b.feat, gold: true }] : []),
            ]}
          />
        ))}
        {visible.length === 0 && (
          <p className="text-muted italic" style={{ gridColumn: "1/-1", textAlign: "center", padding: "2rem 0" }}>
            No backgrounds match your search.
          </p>
        )}
      </div>

      {sel && (
        <div className="detail-panel mt-3 fade-in">
          <h3>{sel.name}</h3>
          {sel.flavorText && <p className="flavor">{sel.flavorText}</p>}

          <div className="tabs">
            {["overview", "traits"].map((t) => (
              <button key={t} className={`tab-btn${tab === t ? " active" : ""}`} onClick={() => setTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div>
              <p className="text-sm mb-2">{sel.description}</p>
              <div className="phb-rule" />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.75rem" }}>
                <div className="phb-section-box">
                  <strong className="text-red font-header text-xs uppercase">Skill Proficiencies</strong>
                  <p className="text-sm mt-1">{sel.skillProficiencies?.join(", ") || "None"}</p>
                </div>
                <div className="phb-section-box">
                  <strong className="text-red font-header text-xs uppercase">Tool Proficiencies</strong>
                  <p className="text-sm mt-1">{sel.toolProficiencies?.length > 0 ? sel.toolProficiencies.join(", ") : "None"}</p>
                </div>
                {sel.languages > 0 && (
                  <div className="phb-section-box">
                    <strong className="text-red font-header text-xs uppercase">Languages</strong>
                    <p className="text-sm mt-1">
                      {sel.languages === 1 ? "One language of your choice" : `${sel.languages} languages of your choice`}
                    </p>
                  </div>
                )}
                {sel.feat && (
                  <div className="phb-section-box">
                    <strong className="text-red font-header text-xs uppercase">Starting Feat</strong>
                    <p className="text-sm mt-1">{sel.feat}</p>
                  </div>
                )}
                {sel.abilityScoreIncreases?.length > 0 && (
                  <div className="phb-section-box" style={{ gridColumn: "1/-1" }}>
                    <strong className="text-red font-header text-xs uppercase">Ability Score Increases</strong>
                    <div className="stats-row mt-1">
                      {sel.abilityScoreIncreases.map((a, i) => (
                        <div key={i} className="stat-box">
                          <span className="stat-label">{a.ability.slice(0, 3).toUpperCase()}</span>
                          <span className="stat-value" style={{ color: "var(--phb-red)" }}>+{a.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="phb-rule" />

              {sel.feature && (
                <div className="phb-section-box">
                  <strong className="text-red font-header text-sm">{sel.feature.name}</strong>
                  <p className="text-sm mt-1">{sel.feature.description}</p>
                </div>
              )}

              <div className="phb-section-box mt-2">
                <strong className="text-red font-header text-xs uppercase">Equipment</strong>
                <p className="text-sm mt-1">{sel.equipment}</p>
              </div>
            </div>
          )}

          {tab === "traits" && (
            <div>
              {sel.personalityTraits ? (
                <>
                  <div className="phb-section-box mb-2">
                    <strong className="text-red font-header text-xs uppercase">Personality Traits</strong>
                    <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
                      {sel.personalityTraits?.map((t, i) => (
                        <li key={i} className="text-sm" style={{ marginBottom: "0.3rem" }}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div className="phb-section-box">
                      <strong className="text-red font-header text-xs uppercase">Ideals</strong>
                      <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
                        {sel.ideals?.map((id, i) => (
                          <li key={i} className="text-sm" style={{ marginBottom: "0.3rem" }}>
                            <em>{id.ideal}</em> ({id.alignment}). {id.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="phb-section-box">
                      <strong className="text-red font-header text-xs uppercase">Bonds</strong>
                      <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
                        {sel.bonds?.map((b, i) => (
                          <li key={i} className="text-sm" style={{ marginBottom: "0.3rem" }}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="phb-section-box">
                      <strong className="text-red font-header text-xs uppercase">Flaws</strong>
                      <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem" }}>
                        {sel.flaws?.map((f, i) => (
                          <li key={i} className="text-sm" style={{ marginBottom: "0.3rem" }}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-muted italic">Personality tables not available for this background.</p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>← Back</button>
        <button className="btn btn-primary" onClick={nextStep} disabled={!sel}>
          Ability Scores →
        </button>
      </div>
    </div>
  );
}
