import { create } from "zustand";

const defaultAbilityScores = {
  Strength: 10,
  Dexterity: 10,
  Constitution: 10,
  Intelligence: 10,
  Wisdom: 10,
  Charisma: 10,
};

const defaultExtraAbilityBonuses = {
  Strength: 0,
  Dexterity: 0,
  Constitution: 0,
  Intelligence: 0,
  Wisdom: 0,
  Charisma: 0,
};

export const useCharacterStore = create((set, get) => ({
  // Meta
  step: 0,
  edition: "2014", // "2014" | "2024"

  // Character basics
  name: "",
  species: null,
  class: null,
  subclass: null,
  background: null,
  level: 1,
  alignment: "",
  abilityScores: { ...defaultAbilityScores },
  abilityScoreMethod: "pointbuy", // "pointbuy" | "standardarray" | "manual"
  skills: [],
  expertiseSkills: [],
  spells: [],
  preparedSpells: [],

  // Species sub-choices
  draconicAncestry: null,
  elvenLineage: null,
  tieflingLegacy: null,
  goliathAncestry: null,
  gnomeLineage: null,
  aasimar_revelation: null,

  // Custom / extra fields
  customPossessions: [],
  customPatron: "",
  customNotes: "",
  extraAbilityBonuses: { ...defaultExtraAbilityBonuses },

  // Actions
  setEdition: (edition) => set({ edition, species: null, class: null, subclass: null, background: null }),
  setStep: (step) => set({ step }),
  nextStep: () => set((s) => ({ step: s.step + 1 })),
  prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),

  setName: (name) => set({ name }),
  setAlignment: (alignment) => set({ alignment }),
  setLevel: (level) => set({ level }),
  setSpecies: (species) => set({ species, subclass: null }),
  setClass: (cls) => set({ class: cls, subclass: null, spells: [], preparedSpells: [] }),
  setSubclass: (subclass) => set({ subclass }),
  setBackground: (background) => set({ background }),

  setAbilityScore: (ability, value) =>
    set((s) => ({ abilityScores: { ...s.abilityScores, [ability]: value } })),
  setAllAbilityScores: (scores) => set({ abilityScores: { ...scores } }),
  setAbilityScoreMethod: (method) => set({ abilityScoreMethod: method }),

  toggleSkill: (skill) =>
    set((s) => ({
      skills: s.skills.includes(skill)
        ? s.skills.filter((sk) => sk !== skill)
        : [...s.skills, skill],
    })),
  setSkills: (skills) => set({ skills }),

  toggleExpertise: (skill) =>
    set((s) => ({
      expertiseSkills: s.expertiseSkills.includes(skill)
        ? s.expertiseSkills.filter((sk) => sk !== skill)
        : [...s.expertiseSkills, skill],
    })),

  toggleSpell: (spellId) =>
    set((s) => ({
      spells: s.spells.includes(spellId)
        ? s.spells.filter((id) => id !== spellId)
        : [...s.spells, spellId],
    })),
  togglePreparedSpell: (spellId) =>
    set((s) => ({
      preparedSpells: s.preparedSpells.includes(spellId)
        ? s.preparedSpells.filter((id) => id !== spellId)
        : [...s.preparedSpells, spellId],
    })),

  setDraconicAncestry: (a) => set({ draconicAncestry: a }),
  setElvenLineage: (l) => set({ elvenLineage: l }),
  setTieflingLegacy: (l) => set({ tieflingLegacy: l }),
  setGoliathAncestry: (a) => set({ goliathAncestry: a }),
  setGnomeLineage: (l) => set({ gnomeLineage: l }),
  setAasimarRevelation: (r) => set({ aasimar_revelation: r }),

  // Custom possessions
  addCustomPossession: (item) =>
    set((s) => ({ customPossessions: [...s.customPossessions, item] })),
  removeCustomPossession: (index) =>
    set((s) => ({ customPossessions: s.customPossessions.filter((_, i) => i !== index) })),

  // Custom patron / notes
  setCustomPatron: (customPatron) => set({ customPatron }),
  setCustomNotes: (customNotes) => set({ customNotes }),

  // Extra ability bonuses (require DM approval)
  setExtraAbilityBonus: (ability, amount) =>
    set((s) => ({ extraAbilityBonuses: { ...s.extraAbilityBonuses, [ability]: amount } })),

  // Computed helpers
  getModifier: (ability) => {
    const state = get();
    const score = state.abilityScores[ability];
    const edition = state.edition;
    const background = state.background;
    const species = state.species;

    // Background ASI (2024 edition)
    const bgBonus =
      edition === "2024" && background?.abilityScoreIncreases
        ? (background.abilityScoreIncreases.find((a) => a.ability === ability)?.amount || 0)
        : 0;

    // Species ASI (2014 edition)
    const speciesBonus =
      edition === "2014" && species?.abilityScoreIncreases
        ? (species.abilityScoreIncreases.find((a) => a.ability === ability)?.amount || 0)
        : 0;

    // Extra DM-approved bonus
    const extraBonus = state.extraAbilityBonuses?.[ability] || 0;

    return Math.floor((score + bgBonus + speciesBonus + extraBonus - 10) / 2);
  },
  getProficiencyBonus: () => {
    const level = get().level;
    return Math.ceil(level / 4) + 1;
  },
  getPassivePerception: () => {
    const mod = get().getModifier("Wisdom");
    const prof = get().getProficiencyBonus();
    const hasPerception = get().skills.includes("Perception");
    const hasExpertise = get().expertiseSkills.includes("Perception");
    return 10 + mod + (hasExpertise ? prof * 2 : hasPerception ? prof : 0);
  },

  resetCharacter: () =>
    set({
      step: 0,
      name: "",
      species: null,
      class: null,
      subclass: null,
      background: null,
      level: 1,
      alignment: "",
      abilityScores: { ...defaultAbilityScores },
      abilityScoreMethod: "pointbuy",
      skills: [],
      expertiseSkills: [],
      spells: [],
      preparedSpells: [],
      draconicAncestry: null,
      elvenLineage: null,
      tieflingLegacy: null,
      goliathAncestry: null,
      gnomeLineage: null,
      aasimar_revelation: null,
      customPossessions: [],
      customPatron: "",
      customNotes: "",
      extraAbilityBonuses: { ...defaultExtraAbilityBonuses },
    }),
}));

export const ABILITIES = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
export const ABILITY_ABBREVS = { Strength: "STR", Dexterity: "DEX", Constitution: "CON", Intelligence: "INT", Wisdom: "WIS", Charisma: "CHA" };

export const ALL_SKILLS = [
  { name: "Acrobatics", ability: "Dexterity" },
  { name: "Animal Handling", ability: "Wisdom" },
  { name: "Arcana", ability: "Intelligence" },
  { name: "Athletics", ability: "Strength" },
  { name: "Deception", ability: "Charisma" },
  { name: "History", ability: "Intelligence" },
  { name: "Insight", ability: "Wisdom" },
  { name: "Intimidation", ability: "Charisma" },
  { name: "Investigation", ability: "Intelligence" },
  { name: "Medicine", ability: "Wisdom" },
  { name: "Nature", ability: "Intelligence" },
  { name: "Perception", ability: "Wisdom" },
  { name: "Performance", ability: "Charisma" },
  { name: "Persuasion", ability: "Charisma" },
  { name: "Religion", ability: "Intelligence" },
  { name: "Sleight of Hand", ability: "Dexterity" },
  { name: "Stealth", ability: "Dexterity" },
  { name: "Survival", ability: "Wisdom" },
];

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

export const POINT_BUY_COSTS = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
export const POINT_BUY_BUDGET = 27;
