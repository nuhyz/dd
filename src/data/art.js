// Art map: imagePlaceholder key → public/art/ image path
// Drop your images into public/art/ and they will automatically appear on cards.
// Supported formats: .webp (recommended), .jpg, .png
// Recommended size: 400×280 px landscape or 280×400 px portrait

const base = "/art/";

export const artMap = {
  // ── Classes ──────────────────────────────────────────────────────────────
  barbarian:  base + "barbarian.webp",
  bard:       base + "bard.webp",
  cleric:     base + "cleric.webp",
  druid:      base + "druid.webp",
  fighter:    base + "fighter.webp",
  monk:       base + "monk.webp",
  paladin:    base + "paladin.webp",
  ranger:     base + "ranger.webp",
  rogue:      base + "rogue.webp",
  sorcerer:   base + "sorcerer.webp",
  warlock:    base + "warlock.webp",
  wizard:     base + "wizard.webp",

  // ── Species (2014) ───────────────────────────────────────────────────────
  "hill-dwarf":         base + "hill-dwarf.webp",
  "mountain-dwarf":     base + "mountain-dwarf.webp",
  "high-elf":           base + "high-elf.webp",
  "wood-elf":           base + "wood-elf.webp",
  "drow":               base + "drow.webp",
  "lightfoot-halfling": base + "lightfoot-halfling.webp",
  "stout-halfling":     base + "stout-halfling.webp",
  "human":              base + "human.webp",
  "dragonborn":         base + "dragonborn.webp",
  "forest-gnome":       base + "forest-gnome.webp",
  "rock-gnome":         base + "rock-gnome.webp",
  "half-elf":           base + "half-elf.webp",
  "half-orc":           base + "half-orc.webp",
  "tiefling":           base + "tiefling.webp",

  // ── Species (2024 — new keys) ────────────────────────────────────────────
  "aasimar":  base + "aasimar.webp",
  "dwarf":    base + "dwarf.webp",
  "elf":      base + "elf.webp",
  "goliath":  base + "goliath.webp",
  "halfling": base + "halfling.webp",
  "orc":      base + "orc.webp",
  "gnome":    base + "gnome.webp",

  // ── Backgrounds (2014) ───────────────────────────────────────────────────
  "acolyte":       base + "acolyte.webp",
  "criminal":      base + "criminal.webp",
  "folk-hero":     base + "folk-hero.webp",
  "noble":         base + "noble.webp",
  "sage":          base + "sage.webp",
  "soldier":       base + "soldier.webp",
  "outlander":     base + "outlander.webp",
  "hermit":        base + "hermit.webp",
  "entertainer":   base + "entertainer.webp",
  "charlatan":     base + "charlatan.webp",
  "guild-artisan": base + "guild-artisan.webp",
  "sailor":        base + "sailor.webp",

  // ── Backgrounds (2024 — new keys) ───────────────────────────────────────
  "guide":    base + "guide.webp",
  "merchant": base + "merchant.webp",
};
