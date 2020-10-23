const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ancestry: {
        type: String,
        required: true,
        enum: ["Dwarf", "Elf", "Gnome", "Goblin", "Halfling", "Human"]
    },
    heritage: {
        type: String,
        required: true,
        enum: ["Ancient-Blooded Dwarf", "Arctic Elf", "Cavern Elf", "Chameleon Gnome",
            "Charhide Goblin", "Death Warden Dwarf", "Fey-Touched Gnome", "Forge Dwarf",
            "Gutsy Halfling", "Half-Elf", "Half-Orc", "Hillock Halfling", "Irongut Goblin",
            "Nomadic Halfling", "Razortooth Goblin", "Rock Dwarf", "Seer Elf", "Sensate Gnome",
            "Skilled Heritage", "Snow Goblin", "Strong-Blooded Dwarf", "Twilight Halfling",
            "Umbral Gnome", "Unbreakable Goblin", "Versatile Heritage", "Wellspring Gnome",
            "Whisper Elf", "Wildwood Halfling", "Woodland Elf"
        ]
    },
    background: {
        type: String,
        required: true,
        enum: ["Acolyte", "Acrobat", "Animal Whisperer", "Artisan", "Artist", "Barkeep",
            "Barrister", "Bounty Hunter", "Charlatan", "Criminal", "Detective", "Emissary",
            "Entertainer", "Farmhand", "Field Medic", "Fortune Teller", "Gambler", "Gladiator",
            "Guard", "Herbalist", "Hermit", "Hunter", "Laborer", "Martial Disciple", "Merchant",
            "Miner", "Noble", "Nomad", "Prisoner", "Sailor", "Scholar", "Scout",
            "Street Urchin", "Tinker", "Warrior"
        ]
    },
    class: {
        type: String,
            required: true,
            enum: ["Alchemist", "Barbarian", "Bard", "Champion", "Cleric", "Druid", "Fighter",
                "Monk", "Ranger", "Rogue", "Sorcerer", "Wizard"
            ]
    },
    strength: {
        type: Number,
        required: true,
        min: 8,
        max: 22
    },
    dexterity: {
        type: Number,
        required: true,
        min: 8,
        max: 22
    },
    constitution: {
        type: Number,
        required: true,
        min: 8,
        max: 22
    },
    intelligence: {
        type: Number,
        required: true,
        min: 8,
        max: 22
    },
    wisdom: {
        type: Number,
        required: true,
        min: 8,
        max: 22
    },
    charisma: {
        type: Number,
        required: true,
        min: 8,
        max: 22
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    }
});

const Product = mongoose.model('Product', characterSchema);

module.exports = Product;