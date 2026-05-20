import { useCharacterStore, ALL_SKILLS, ABILITY_ABBREVS } from "../../store/characterStore";
import { PageHeader } from "../ui/PageHeader";

function sign(n) { return n >= 0 ? `+${n}` : `${n}`; }

export function SkillsStep() {
  const {
    skills, toggleSkill, expertiseSkills, toggleExpertise,
    class: selectedClass, background, species,
    abilityScores, getProficiencyBonus, getModifier,
    nextStep, prevStep,
  } = useCharacterStore();

  const profBonus = getProficiencyBonus();

  // Determine which skills are granted by class/background/species
  const classSkills = selectedClass?.skillChoices?.from === "Any"
    ? ALL_SKILLS.map((s) => s.name)
    : (selectedClass?.skillChoices?.from || []);
  const classCount = selectedClass?.skillChoices?.count || 0;

  const bgSkills = background?.skillProficiencies || [];
  const speciesSkills = species?.traits?.filter((t) => t.name === "Keen Senses").map(() => "Perception") || [];
  const rogueExpertise = selectedClass?.id === "rogue" || selectedClass?.id === "bard";

  // Auto-grant background/species skills
  const autoSkills = [...new Set([...bgSkills, ...speciesSkills])];

  // User-selectable (from class)
  const userSelectedCount = skills.filter((sk) => !autoSkills.includes(sk)).length;
  const canSelect = userSelectedCount < classCount;

  function toggleUserSkill(skillName) {
    const isAuto = autoSkills.includes(skillName);
    if (isAuto) return; // Can't toggle auto-granted skills
    if (!skills.includes(skillName) && !canSelect) return; // At limit
    if (!classSkills.includes(skillName) && !skills.includes(skillName)) return; // Not in class list
    toggleSkill(skillName);
  }

  function getSkillBonus(skill) {
    const abilityMod = getModifier(skill.ability);
    const isProficient = skills.includes(skill.name) || autoSkills.includes(skill.name);
    const isExpert = expertiseSkills.includes(skill.name);
    return abilityMod + (isExpert ? profBonus * 2 : isProficient ? profBonus : 0);
  }

  return (
    <div className="fade-in">
      <PageHeader
        title="Skills & Proficiencies"
        subtitle="Choose your skill proficiencies. Proficient skills add your Proficiency Bonus to checks."
      />

      <div className="info-block mb-2">
        <strong>Class allows:</strong> Choose {classCount} skills from {
          classSkills.length > 8
            ? "any skill"
            : classSkills.join(", ")
        }.
        You have selected <strong>{userSelectedCount}/{classCount}</strong>.
        {bgSkills.length > 0 && <><br /><strong>Background grants:</strong> {bgSkills.join(", ")}.</>}
        {speciesSkills.length > 0 && <><br /><strong>Species grants:</strong> {speciesSkills.join(", ")}.</>}
      </div>

      {rogueExpertise && (
        <div className="info-block mb-2">
          As a {selectedClass.name}, you gain <strong>Expertise</strong> in 2 skills. Click a proficient skill a second time to mark it with Expertise (2× proficiency bonus).
        </div>
      )}

      <div style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="font-header text-xs uppercase text-muted">Proficiency Bonus: {sign(profBonus)}</span>
      </div>

      <div className="skills-grid">
        {ALL_SKILLS.map((skill) => {
          const isAuto = autoSkills.includes(skill.name);
          const isProficient = skills.includes(skill.name) || isAuto;
          const isExpert = expertiseSkills.includes(skill.name) && isProficient;
          const canToggle = isAuto ? false : classSkills.includes(skill.name) || isProficient;
          const bonus = getSkillBonus(skill);

          return (
            <div
              key={skill.name}
              className={`skill-row${isProficient ? " proficient" : ""}${!canToggle && !isProficient ? " disabled" : ""}`}
              onClick={() => {
                if (isExpert) { toggleExpertise(skill.name); return; }
                if (isProficient && rogueExpertise) { toggleExpertise(skill.name); return; }
                toggleUserSkill(skill.name);
              }}
            >
              <div className={`skill-checkbox${isExpert ? " expertise" : isProficient ? " checked" : ""}`}>
                {isExpert ? "★" : isProficient ? "✓" : ""}
              </div>
              <span className="skill-name">
                {skill.name}
                {isAuto && <span className="card-tag" style={{ marginLeft: "0.4rem", fontSize: "0.6rem", verticalAlign: "middle" }}>auto</span>}
              </span>
              <span className="skill-ability">{ABILITY_ABBREVS[skill.ability]}</span>
              <span className="skill-bonus">{sign(bonus)}</span>
            </div>
          );
        })}
      </div>

      <div className="phb-section-box mt-3">
        <h4 className="mb-2">Saving Throws</h4>
        <div className="skills-grid">
          {["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"].map((ability) => {
            const isProficient = selectedClass?.savingThrows?.includes(ability);
            const mod = getModifier(ability);
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
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>← Back</button>
        <button className="btn btn-primary" onClick={nextStep}>
          Spells →
        </button>
      </div>
    </div>
  );
}
