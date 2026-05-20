import { useCharacterStore } from "../../store/characterStore";
import { TraitList } from "../ui/TraitList";
import { PageHeader } from "../ui/PageHeader";

export function SubclassStep() {
  const { class: selectedClass, level, subclass, setSubclass, nextStep, prevStep } = useCharacterStore();

  if (!selectedClass) {
    return (
      <div className="fade-in">
        <PageHeader title="Choose Subclass" subtitle="Please select a class first." />
        <div className="nav-buttons">
          <button className="btn btn-secondary" onClick={prevStep}>← Back to Class</button>
        </div>
      </div>
    );
  }

  const subclasses = selectedClass.subclasses || [];

  const subclassLevelMap = {
    barbarian: 3, bard: 3, cleric: 1, druid: 2, fighter: 3,
    monk: 3, paladin: 3, ranger: 3, rogue: 3, sorcerer: 1, warlock: 1, wizard: 2,
  };
  const unlockLevel = subclassLevelMap[selectedClass.id] || 3;
  const isUnlocked = level >= unlockLevel;

  return (
    <div className="fade-in">
      <PageHeader
        title={`Choose ${selectedClass.name} Subclass`}
        subtitle={
          isUnlocked
            ? `You unlock your ${selectedClass.name} subclass at level ${unlockLevel}.`
            : `You are level ${level}. Your subclass unlocks at level ${unlockLevel}. You can still preview and pre-select.`
        }
      />

      {!isUnlocked && (
        <div className="info-block mb-2">
          You haven't reached level {unlockLevel} yet, but you can preview and pre-select your subclass now.
        </div>
      )}

      <div className="cards-grid-2">
        {subclasses.map((sub) => (
          <div
            key={sub.id}
            className={`phb-card${subclass?.id === sub.id ? " selected" : ""}`}
            onClick={() => setSubclass(sub)}
          >
            <div className="card-body">
              <div className="card-title">{sub.name}</div>
              <p className="card-description" style={{ display: "block", WebkitLineClamp: "unset" }}>
                {sub.description}
              </p>
              <div className="phb-rule" style={{ margin: "0.75rem 0" }} />
              <TraitList traits={sub.features?.map((f) => ({ name: `Level ${f.level}: ${f.name}`, description: f.description })) || []} />
            </div>
          </div>
        ))}
      </div>

      {subclass && (
        <div className="detail-panel mt-3 fade-in">
          <h3>{subclass.name}</h3>
          <p className="flavor mt-1">{subclass.description}</p>
          <div className="phb-rule" />
          <TraitList traits={subclass.features?.map((f) => ({ name: `Level ${f.level}: ${f.name}`, description: f.description }))} />
        </div>
      )}

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>← Back to Class</button>
        <button className="btn btn-primary" onClick={nextStep} disabled={!subclass}>
          Choose Background →
        </button>
      </div>
    </div>
  );
}
