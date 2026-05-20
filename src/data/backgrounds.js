// D&D 5e Backgrounds — SRD content (CC BY 4.0 / CC BY-NC 4.0)

export const backgrounds = [
  // ── 2014 Backgrounds ──────────────────────────────────────────────────────
  {
    id: "acolyte",
    name: "Acolyte",
    edition: "2014",
    source: "PHB 2014",
    description:
      "You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine.",
    flavorText: '"The gods work in mysterious ways — and those who serve them even more so."',
    imagePlaceholder: "acolyte",
    skillProficiencies: ["Insight", "Religion"],
    toolProficiencies: [],
    languages: 2,
    equipment:
      "A holy symbol (a gift to you when you entered the priesthood), a prayer book or prayer wheel, 5 sticks of incense, vestments, a set of common clothes, and a pouch containing 15 gp.",
    feature: {
      name: "Shelter of the Faithful",
      description:
        "As an acolyte, you command the respect of those who share your faith, and you can perform the religious ceremonies of your deity. You and your adventuring companions can expect to receive free healing and care at a temple, shrine, or other established presence of your faith.",
    },
    personalityTraits: [
      "I idolize a particular hero of my faith, and constantly refer to that person's deeds and example.",
      "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace.",
      "I see omens in every event and action. The gods try to speak to us, we just need to listen.",
      "Nothing can shake my optimistic attitude.",
      "I quote (or misquote) sacred texts and proverbs in almost every situation.",
      "I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.",
      "I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me.",
      "I've spent so long in the temple that I have little practical experience dealing with people in the outside world.",
    ],
    ideals: [
      { ideal: "Tradition", description: "The ancient traditions of worship and sacrifice must be preserved and upheld.", alignment: "Lawful" },
      { ideal: "Charity", description: "I always try to help those in need, no matter what the personal cost.", alignment: "Good" },
      { ideal: "Change", description: "We must help bring about the changes the gods are constantly working in the world.", alignment: "Chaotic" },
      { ideal: "Power", description: "I hope to one day rise to the top of my faith's religious hierarchy.", alignment: "Lawful" },
      { ideal: "Faith", description: "I trust that my deity will guide my actions. I have faith that if I work hard, things will go well.", alignment: "Lawful" },
      { ideal: "Aspiration", description: "I seek to prove myself worthy of my god's favor by matching my actions against his or her teachings.", alignment: "Any" },
    ],
    bonds: [
      "I would die to recover an ancient relic of my faith that was lost long ago.",
      "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.",
      "I owe my life to the priest who took me in when my parents died.",
      "Everything I do is for the common people.",
      "I will do anything to protect the temple where I served.",
      "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.",
    ],
    flaws: [
      "I judge others harshly, and myself even more severely.",
      "I put too much trust in those who wield power within my temple's hierarchy.",
      "My piety sometimes leads me to blindly trust those that profess faith in my god.",
      "I am inflexible in my thinking.",
      "I am suspicious of strangers and expect the worst of them.",
      "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.",
    ],
  },
  {
    id: "criminal",
    name: "Criminal",
    edition: "2014",
    source: "PHB 2014",
    description:
      "You are an experienced criminal with a history of breaking the law. You have spent a lot of time among other criminals and still have contacts within the criminal underworld.",
    flavorText: '"Every lock has a key. Every guard has a price. Every rule has an exception."',
    imagePlaceholder: "criminal",
    skillProficiencies: ["Deception", "Stealth"],
    toolProficiencies: ["One type of gaming set", "Thieves' tools"],
    languages: 0,
    equipment:
      "A crowbar, a set of dark common clothes including a hood, and a pouch containing 15 gp.",
    feature: {
      name: "Criminal Contact",
      description:
        "You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you.",
    },
    personalityTraits: [
      "I always have a plan for what to do when things go wrong.",
      "I am always calm, no matter what the situation. I never raise my voice or let my emotions control me.",
      "The first thing I do in a new place is note the locations of everything valuable—or where such things could be hidden.",
      "I would rather make a new friend than a new enemy.",
      "I am incredibly slow to trust. Those who seem the fairest often have the most to hide.",
      "I don't pay attention to the risks in a situation. Never tell me the odds.",
      "The best way to get me to do something is to tell me I can't do it.",
      "I blow up at the slightest insult.",
    ],
    ideals: [
      { ideal: "Honor", description: "I don't steal from others in the trade.", alignment: "Lawful" },
      { ideal: "Freedom", description: "Chains are meant to be broken, as are those who would forge them.", alignment: "Chaotic" },
      { ideal: "Charity", description: "I steal from the wealthy so that I can help people in need.", alignment: "Good" },
      { ideal: "Greed", description: "I will do whatever it takes to become wealthy.", alignment: "Evil" },
      { ideal: "People", description: "I'm loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care.", alignment: "Neutral" },
      { ideal: "Redemption", description: "There's a spark of good in everyone.", alignment: "Good" },
    ],
    bonds: [
      "I'm trying to pay off an old debt I owe to a generous benefactor.",
      "My ill-gotten gains go to support my family.",
      "Something important was taken from me, and I aim to steal it back.",
      "I will become the greatest thief that ever lived.",
      "I'm guilty of a terrible crime. I hope I can redeem myself for it.",
      "Someone I loved died because of a mistake I made. That will never happen again.",
    ],
    flaws: [
      "When I see something valuable, I can't think about anything but how to steal it.",
      "When faced with a choice between money and my friends, I usually choose the money.",
      "If there's a plan, I'll forget it. If I don't forget it, I'll ignore it.",
      "I have a 'tell' that reveals when I'm lying.",
      "I turn tail and run when things look bad.",
      "An innocent person is in prison for a crime that I committed. I'm okay with that.",
    ],
  },
  {
    id: "folk-hero",
    name: "Folk Hero",
    edition: "2014",
    source: "PHB 2014",
    description:
      "You come from a humble social rank, but you are destined for so much more. Already the people of your home village regard you as their champion, and your destiny calls you to stand against the tyrants and monsters that threaten the common folk everywhere.",
    flavorText: '"A people need a hero. I was just the one who showed up."',
    imagePlaceholder: "folk-hero",
    skillProficiencies: ["Animal Handling", "Survival"],
    toolProficiencies: ["One type of artisan's tools", "Vehicles (land)"],
    languages: 0,
    equipment:
      "A set of artisan's tools (one of your choice), a shovel, an iron pot, a set of common clothes, and a pouch containing 10 gp.",
    feature: {
      name: "Rustic Hospitality",
      description:
        "Since you come from the ranks of the common folk, you fit in among them with ease. You can find a place to hide, rest, or recuperate among other commoners, unless you have shown yourself to be a danger to them. They will shield you from the law or anyone else searching for you, though they will not risk their lives for you.",
    },
  },
  {
    id: "noble",
    name: "Noble",
    edition: "2014",
    source: "PHB 2014",
    description:
      "You understand wealth, power, and privilege. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence. You might be a pampered aristocrat unfamiliar with work or discomfort, a former merchant just elevated to the nobility, or a disinherited scoundrel with a disproportionate sense of entitlement.",
    flavorText: '"My family name opens doors. My own deeds will determine what lies beyond them."',
    imagePlaceholder: "noble",
    skillProficiencies: ["History", "Persuasion"],
    toolProficiencies: ["One type of gaming set"],
    languages: 1,
    equipment:
      "A set of fine clothes, a signet ring, a scroll of pedigree, and a purse containing 25 gp.",
    feature: {
      name: "Position of Privilege",
      description:
        "Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. The common folk make every effort to accommodate you and avoid your displeasure, and other people of high birth treat you as a member of the same social sphere.",
    },
  },
  {
    id: "sage",
    name: "Sage",
    edition: "2014",
    source: "PHB 2014",
    description:
      "You spent years learning the lore of the multiverse. You scoured manuscripts, studied scrolls, and listened to the greatest experts on the subjects that interest you. Your efforts have made you a master in your field of study.",
    flavorText: '"Knowledge is never truly lost — only temporarily misplaced."',
    imagePlaceholder: "sage",
    skillProficiencies: ["Arcana", "History"],
    toolProficiencies: [],
    languages: 2,
    equipment:
      "A bottle of black ink, a quill, a small knife, a letter from a dead colleague posing a question you have not yet been able to answer, a set of common clothes, and a pouch containing 10 gp.",
    feature: {
      name: "Researcher",
      description:
        "When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it. Usually, this information comes from a library, scriptorium, university, or a sage or other learned person or creature.",
    },
  },
  {
    id: "soldier",
    name: "Soldier",
    edition: "2014",
    source: "PHB 2014",
    description:
      "War has been your life for as long as you care to remember. You trained as a youth, studied the use of weapons and armor, learned basic survival techniques, including how to stay alive on the battlefield. You might have been a mercenary, part of a standing army, or a member of a local militia.",
    flavorText: '"I have seen what war costs. I fight now to make sure it was not in vain."',
    imagePlaceholder: "soldier",
    skillProficiencies: ["Athletics", "Intimidation"],
    toolProficiencies: ["One type of gaming set", "Vehicles (land)"],
    languages: 0,
    equipment:
      "An insignia of rank, a trophy taken from a fallen enemy (a dagger, broken blade, or piece of a banner), a set of bone dice or deck of cards, a set of common clothes, and a pouch containing 10 gp.",
    feature: {
      name: "Military Rank",
      description:
        "You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence, and they defer to you if they are of a lower rank.",
    },
  },
  {
    id: "outlander",
    name: "Outlander",
    edition: "2014",
    source: "PHB 2014",
    description:
      "You grew up in the wilds, far from civilization and the comforts of town and technology. You've witnessed the migration of herds larger than forests, survived weather more extreme than any city-dweller could comprehend, and enjoyed the solitude of being the only thinking creature for miles in any direction.",
    flavorText: '"The wild does not lie. It does not betray. It simply is — and it is honest."',
    imagePlaceholder: "outlander",
    skillProficiencies: ["Athletics", "Survival"],
    toolProficiencies: ["One type of musical instrument"],
    languages: 1,
    equipment:
      "A staff, a hunting trap, a trophy from an animal you killed, a set of traveler's clothes, and a pouch containing 10 gp.",
    feature: {
      name: "Wanderer",
      description:
        "You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. In addition, you can find food and fresh water for yourself and up to five other people each day, provided that the land offers berries, small game, water, and so forth.",
    },
  },
  {
    id: "hermit",
    name: "Hermit",
    edition: "2014",
    source: "PHB 2014",
    description:
      "You lived in seclusion—either in a sheltered community such as a monastery, or entirely alone—for a formative part of your life. In your time apart from the clamor of society, you found quiet, solitude, and perhaps some of the answers you were looking for.",
    flavorText: '"Silence is not the absence of speech — it is the presence of thought."',
    imagePlaceholder: "hermit",
    skillProficiencies: ["Medicine", "Religion"],
    toolProficiencies: ["Herbalism kit"],
    languages: 1,
    equipment:
      "A scroll case stuffed full of notes from your studies or prayers, a winter blanket, a set of common clothes, an herbalism kit, and 5 gp.",
    feature: {
      name: "Discovery",
      description:
        "The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion. It might be a great truth about the cosmos, the deities, the powerful beings of the outer planes, or the forces of nature.",
    },
  },
  {
    id: "entertainer",
    name: "Entertainer",
    edition: "2014",
    source: "PHB 2014",
    description:
      "You thrive in front of an audience. You know how to entrance them, entertain them, and even inspire them. Your poetics can stir the hearts of those who hear you, awakening grief or joy, laughter or anger.",
    flavorText: '"The crowd is my instrument — I merely play them."',
    imagePlaceholder: "entertainer",
    skillProficiencies: ["Acrobatics", "Performance"],
    toolProficiencies: ["Disguise kit", "One type of musical instrument"],
    languages: 0,
    equipment:
      "A musical instrument (one of your choice), the favor of an admirer (love letter, lock of hair, or trinket), a costume, and a pouch containing 15 gp.",
    feature: {
      name: "By Popular Demand",
      description:
        "You can always find a place to perform, usually in an inn or tavern but possibly with a circus, at a theater, or even in a noble's court. At such a place, you receive free lodging and food of a modest or comfortable standard (depending on the quality of the establishment), as long as you perform each night.",
    },
  },
  {
    id: "charlatan",
    name: "Charlatan",
    edition: "2014",
    source: "PHB 2014",
    description:
      "You have always had a way with people. You know what makes them tick, you can tease out their heart's desires after a few minutes of conversation, and with a few leading questions you can read them like they were children's books.",
    flavorText: '"Everyone is running a con. I just do it better."',
    imagePlaceholder: "charlatan",
    skillProficiencies: ["Deception", "Sleight of Hand"],
    toolProficiencies: ["Disguise kit", "Forgery kit"],
    languages: 0,
    equipment:
      "A set of fine clothes, a disguise kit, tools of the con of your choice (ten stoppered bottles filled with colored liquid, a set of weighted dice, a deck of marked cards, or a signet ring of an imaginary duke), and a pouch containing 15 gp.",
    feature: {
      name: "False Identity",
      description:
        "You have created a second identity that includes documentation, established acquaintances, and disguises that allow you to assume that persona. Additionally, you can forge documents including official papers and personal letters, as long as you have seen an example of the kind of document or the handwriting you are trying to copy.",
    },
  },
  {
    id: "guild-artisan",
    name: "Guild Artisan",
    edition: "2014",
    source: "PHB 2014",
    description:
      "You are a member of an artisan's guild, skilled in a particular field and closely associated with other artisans. You are a well-established part of the mercantile world, freed by talent and wealth from the constraints of a feudal social order.",
    flavorText: '"My craft is my identity. Through it I speak without words."',
    imagePlaceholder: "guild-artisan",
    skillProficiencies: ["Insight", "Persuasion"],
    toolProficiencies: ["One type of artisan's tools"],
    languages: 1,
    equipment:
      "A set of artisan's tools (one of your choice), a letter of introduction from your guild, a set of traveler's clothes, and a pouch containing 15 gp.",
    feature: {
      name: "Guild Membership",
      description:
        "As an established and respected member of a guild, you can rely on certain benefits that membership provides. Your fellow guild members will provide you with lodging and food if necessary, and pay for your funeral if needed. In some cities and towns, a guildhall offers a central place to meet other members of your profession.",
    },
  },
  {
    id: "sailor",
    name: "Sailor",
    edition: "2014",
    source: "PHB 2014",
    description:
      "You sailed on a seagoing vessel for years. In that time, you faced down mighty storms, monsters of the deep, and those who wanted to sink your craft to the bottomless depths. Your first love is the distant line of the horizon, but the time has come to try your hand at something new.",
    flavorText: '"The sea teaches patience. The sea does not negotiate."',
    imagePlaceholder: "sailor",
    skillProficiencies: ["Athletics", "Perception"],
    toolProficiencies: ["Navigator's tools", "Vehicles (water)"],
    languages: 0,
    equipment:
      "A belaying pin (club), 50 feet of silk rope, a lucky charm such as a rabbit foot or a small stone with a hole in the center (or you may roll for a random trinket on the Trinkets table in chapter 5), a set of common clothes, and a pouch containing 10 gp.",
    feature: {
      name: "Ship's Passage",
      description:
        "When you need to, you can secure free passage on a sailing ship for yourself and your adventuring companions. You might sail on the ship you served on, or another ship you have good relations with (perhaps one captained by a former crewmate). Because you're calling in a favor, you can't be certain of a schedule or route that will meet your every need.",
    },
  },

  // ── 2024 Backgrounds ──────────────────────────────────────────────────────
  {
    id: "acolyte-2024",
    name: "Acolyte",
    edition: "2024",
    source: "PHB 2024",
    description:
      "You have spent your life in service to a temple, performing sacred rites and learning holy lore. In 2024, your Background grants Ability Score Increases rather than your Species.",
    flavorText: '"Faith is the armor I wear. Devotion is the weapon I wield."',
    imagePlaceholder: "acolyte",
    abilityScoreIncreases: [{ ability: "Intelligence", amount: 1 }, { ability: "Wisdom", amount: 1 }, { ability: "Charisma", amount: 1 }],
    skillProficiencies: ["Insight", "Religion"],
    toolProficiencies: [],
    languages: 2,
    feat: "Magic Initiate (Divine)",
    equipment: "Holy Symbol, Prayer Book, 5 Candles, Vestments, Common Clothes, 15 GP",
    feature: {
      name: "Shelter of the Faithful",
      description:
        "You and your companions can receive free healing and care at temples aligned with your faith, as long as you are in good standing with your deity.",
    },
  },
  {
    id: "criminal-2024",
    name: "Criminal",
    edition: "2024",
    source: "PHB 2024",
    description:
      "You have a history of breaking the law and surviving by your wits in the criminal underworld. In 2024, your Background grants Ability Score Increases.",
    flavorText: '"Rules are just someone else\'s idea of how things should be."',
    imagePlaceholder: "criminal",
    abilityScoreIncreases: [{ ability: "Dexterity", amount: 1 }, { ability: "Constitution", amount: 1 }, { ability: "Intelligence", amount: 1 }],
    skillProficiencies: ["Sleight of Hand", "Stealth"],
    toolProficiencies: ["Thieves' Tools"],
    languages: 1,
    feat: "Alert",
    equipment: "Crowbar, 2 Daggers, Thieves' Tools, Dark Common Clothes with Hood, 50 GP",
    feature: {
      name: "Criminal Contact",
      description:
        "You have a reliable contact in the criminal underworld who can relay messages and pass along information through clandestine channels.",
    },
  },
  {
    id: "sage-2024",
    name: "Sage",
    edition: "2024",
    source: "PHB 2024",
    description:
      "You spent years in scholarly study, learning the lore of the multiverse. In 2024, your Background grants Ability Score Increases and a starting feat.",
    flavorText: '"The pursuit of knowledge is its own reward — though gold helps too."',
    imagePlaceholder: "sage",
    abilityScoreIncreases: [{ ability: "Constitution", amount: 1 }, { ability: "Intelligence", amount: 1 }, { ability: "Wisdom", amount: 1 }],
    skillProficiencies: ["Arcana", "History"],
    toolProficiencies: [],
    languages: 2,
    feat: "Magic Initiate (Wizard)",
    equipment: "Quarterstaff, Spellbook, Ink Bottle, Ink Pen, Common Clothes, 5 GP",
    feature: {
      name: "Researcher",
      description:
        "When you attempt to learn or recall a piece of lore, if you don't know the information, you know where and from whom you can obtain it.",
    },
  },
  {
    id: "soldier-2024",
    name: "Soldier",
    edition: "2024",
    source: "PHB 2024",
    description:
      "You have trained as a warrior and lived a life in arms. In 2024, your Background grants Ability Score Increases and a starting feat.",
    flavorText: '"Discipline. Honor. Brotherhood. These are the pillars I stand on."',
    imagePlaceholder: "soldier",
    abilityScoreIncreases: [{ ability: "Strength", amount: 1 }, { ability: "Dexterity", amount: 1 }, { ability: "Constitution", amount: 1 }],
    skillProficiencies: ["Athletics", "Intimidation"],
    toolProficiencies: ["Gaming Set (any)"],
    languages: 1,
    feat: "Savage Attacker",
    equipment: "Spear, Shortbow, 20 Arrows, Gaming Set, Common Clothes, 10 GP",
    feature: {
      name: "Military Rank",
      description:
        "You have a military rank that soldiers loyal to your former organization recognize, deferring to you if they are of lower rank.",
    },
  },
  {
    id: "noble-2024",
    name: "Noble",
    edition: "2024",
    source: "PHB 2024",
    description:
      "You were born into a family of wealth and privilege. In 2024, your Background grants Ability Score Increases and a starting feat.",
    flavorText: '"Noblesse oblige. The privilege of rank comes with the duty to lead."',
    imagePlaceholder: "noble",
    abilityScoreIncreases: [{ ability: "Intelligence", amount: 1 }, { ability: "Wisdom", amount: 1 }, { ability: "Charisma", amount: 1 }],
    skillProficiencies: ["History", "Persuasion"],
    toolProficiencies: ["Gaming Set (any)"],
    languages: 1,
    feat: "Skilled",
    equipment: "Fine Clothes, Signet Ring, Scroll of Pedigree, Gaming Set, 25 GP",
    feature: {
      name: "Position of Privilege",
      description:
        "Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society and treated with deference by commoners.",
    },
  },
  {
    id: "hermit-2024",
    name: "Hermit",
    edition: "2024",
    source: "PHB 2024",
    description:
      "You lived in seclusion, either alone or in a sheltered community, for a formative part of your life. In 2024, your Background grants Ability Score Increases and a starting feat.",
    flavorText: '"In silence, I found the truth the world was too loud to hear."',
    imagePlaceholder: "hermit",
    abilityScoreIncreases: [{ ability: "Constitution", amount: 1 }, { ability: "Intelligence", amount: 1 }, { ability: "Wisdom", amount: 1 }],
    skillProficiencies: ["Medicine", "Religion"],
    toolProficiencies: ["Herbalism Kit"],
    languages: 1,
    feat: "Magic Initiate (Druid)",
    equipment: "Quarterstaff, Herbalism Kit, Scroll Case, Bedroll, Common Clothes, 5 GP",
    feature: {
      name: "Discovery",
      description:
        "Your hermitage granted you a unique discovery — a great truth about the cosmos, deities, the outer planes, or nature. Work with your DM to define this revelation.",
    },
  },
  {
    id: "entertainer-2024",
    name: "Entertainer",
    edition: "2024",
    source: "PHB 2024",
    description:
      "You thrive in front of an audience. You know how to entrance them, entertain them, and inspire them. In 2024, your Background grants Ability Score Increases and a starting feat.",
    flavorText: '"Every performance is a chance to be something more than yourself."',
    imagePlaceholder: "entertainer",
    abilityScoreIncreases: [{ ability: "Strength", amount: 1 }, { ability: "Dexterity", amount: 1 }, { ability: "Charisma", amount: 1 }],
    skillProficiencies: ["Acrobatics", "Performance"],
    toolProficiencies: ["Musical Instrument (any)"],
    languages: 1,
    feat: "Tavern Brawler",
    equipment: "Musical Instrument (your choice), 2 Costumes, Mirror, Perfume, Common Clothes, 11 GP",
    feature: {
      name: "By Popular Demand",
      description:
        "You can always find a place to perform and receive free modest lodging and food in exchange for nightly performances.",
    },
  },
  {
    id: "guide-2024",
    name: "Guide",
    edition: "2024",
    source: "PHB 2024",
    description:
      "You are an experienced wilderness guide who leads others through untamed landscapes. This is a new background in the 2024 Player's Handbook.",
    flavorText: '"If you want to survive out there, you follow my lead."',
    imagePlaceholder: "guide",
    abilityScoreIncreases: [{ ability: "Dexterity", amount: 1 }, { ability: "Constitution", amount: 1 }, { ability: "Wisdom", amount: 1 }],
    skillProficiencies: ["Stealth", "Survival"],
    toolProficiencies: ["Cartographer's Tools"],
    languages: 1,
    feat: "Skilled",
    equipment: "Shortbow, 20 Arrows, Cartographer's Tools, Bedroll, Rations (5 days), Waterskin, Common Clothes, 16 GP",
    feature: {
      name: "Wanderer",
      description:
        "You have an excellent memory for maps and geography and can always recall the general layout of terrain, settlements, and other features around you. You can also find food and fresh water for yourself and up to five companions daily in natural environments.",
    },
  },
  {
    id: "merchant-2024",
    name: "Merchant",
    edition: "2024",
    source: "PHB 2024",
    description:
      "You are experienced in the world of trade and commerce, with a keen eye for value and a silver tongue for deals. A new background in the 2024 Player's Handbook.",
    flavorText: '"Everything has a price. Knowing the right price — that is wisdom."',
    imagePlaceholder: "merchant",
    abilityScoreIncreases: [{ ability: "Constitution", amount: 1 }, { ability: "Intelligence", amount: 1 }, { ability: "Charisma", amount: 1 }],
    skillProficiencies: ["Animal Handling", "Persuasion"],
    toolProficiencies: ["Navigator's Tools"],
    languages: 1,
    feat: "Lucky",
    equipment: "Merchant's Scale, 6 Torches, Common Clothes, Pouch with 25 GP",
    feature: {
      name: "Trade Connections",
      description:
        "You have contacts in trading companies, guilds, and merchant circles across the region. These contacts can provide market information, facilitate deals, or offer you a place to conduct business.",
    },
  },
];
