// Art map: imagePlaceholder key → public/art/ image path
// Drop your images into public/art/ and they will automatically appear on cards.
// Supported formats: .webp (recommended), .jpg, .png
// Recommended size: 400×280 px landscape or 280×400 px portrait

const base = "/art/";

export const artMap = {
  // ── Classes ──────────────────────────────────────────────────────────────
  barbarian:  base + "barbarian.jpeg",
  bard:       base + "bard.jpeg",
  cleric:     base + "cleric.jpeg",
  druid:      base + "druid.jpeg",
  fighter:    base + "fighter.jpeg,
  monk:       base + "monk.jpeg",
  paladin:    base + "paladin.jpeg",
  ranger:     base + "ranger.jpeg",
  rogue:      base + "rogue.jpeg",
  sorcerer:   base + "sorcerer.jpeg",
  warlock:    base + "warlock.jpeg",
  wizard:     base + "wizard.jpeg",

  // ── Species (2014) ───────────────────────────────────────────────────────
  "hill-dwarf":         base + "hill-dwarf.jpeg",
  "mountain-dwarf":     base + "mountain-dwarf.jpeg",
  "high-elf":           base + "high-elf.jpeg",
  "wood-elf":           base + "wood-elf.jpeg",
  "drow":               base + "drow.jpeg",
  "lightfoot-halfling": base + "lightfoot-halfling.jpeg",
  "stout-halfling":     base + "stout-halfling.jpeg",
  "human":              base + "human.jpeg",
  "dragonborn":         base + "dragonborn.jpeg",
  "forest-gnome":       base + "forest-gnome.jpeg",
  "rock-gnome":         base + "rock-gnome.jpeg",
  "half-elf":           base + "half-elf.jpeg",
  "half-orc":           base + "half-orc.jpeg",
  "tiefling":           base + "tiefling.jpeg",

  // ── Species (2024 — new keys) ────────────────────────────────────────────
  "aasimar":  base + "aasimar.jpeg",
  "dwarf":    base + "dwarf.jpeg",
  "elf":      base + "elf.jpeg",
  "goliath":  base + "goliath.jpeg",
  "halfling": base + "halfling.jpeg",
  "orc":      base + "orc.jpeg",
  "gnome":    base + "gnome.jpeg",

  // ── Backgrounds (2014) ───────────────────────────────────────────────────
  "acolyte":       base + "acolyte.jpeg",
  "criminal":      base + "criminal.jpeg",
  "folk-hero":     base + "folk-hero.jpeg",
  "noble":         base + "noble.jpeg",
  "sage":          base + "sage.jpeg",
  "soldier":       base + "soldier.jpeg",
  "outlander":     base + "outlander.jpeg",
  "hermit":        base + "hermit.jpeg",
  "entertainer":   base + "entertainer.jpeg",
  "charlatan":     base + "charlatan.jpeg",
  "guild-artisan": base + "guild-artisan.jpeg",
  "sailor":        base + "sailor.jpeg",

  // ── Backgrounds (2024 — new keys) ───────────────────────────────────────
  "guide":    base + "guide.jpeg",
  "merchant": base + "merchant.jpeg",
};
