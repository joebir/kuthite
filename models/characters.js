const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ancestry: {
        type: String,
        required: true
    },
    heritage: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    class: {
        type: String,
            required: true
    },
    subclass1: {
        type: String
    },
    subclass2: {
        type: String
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
    ancestryBoosts: {
        type: [String],
        required: true
    },
    backgroundBoosts: {
        type: [String],
        required: true
    },
    classBoost: {
        type: String,
        required: true
    },
    freeBoosts: {
        type: [String],
        required: true
    }
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;