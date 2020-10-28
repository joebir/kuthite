const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const fs = require("fs");
require("dotenv").config();

const Character = require("./models/characters.js");

const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;
const {
    window
} = new JSDOM();
const {
    document
} = (new JSDOM("")).window;
global.document = document;
const $ = jQuery = require("jquery")(window);

const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));

const mongoConnectionString = process.env.MONGODBURI
mongoose.connect(mongoConnectionString, {
    useNewUrlParser: true
});
mongoose.connection.once("open", () => {
    console.log("connected to mongo");
});

const rawClasses = fs.readFileSync("./data/classes.json");
const allClasses = JSON.parse(rawClasses);

const rawAncestries = fs.readFileSync("./data/ancestries.json");
const allAncestries = JSON.parse(rawAncestries);

const rawBackgrounds = fs.readFileSync("./data/backgrounds.json");
const allBackgrounds = JSON.parse(rawBackgrounds);

const port = process.env.PORT;
app.listen(port, () => console.log(`listening on ${port}`));

app.get("/kuthite", (req, res) => {
    Character.find({}, (error, allCharacters) => {
        res.render("index.ejs", {
            characters: allCharacters
        });
    });
});

app.get("/kuthite/create", (req, res) => {
    res.render("new.ejs", {
        classes: allClasses,
        ancestries: allAncestries,
        backgrounds: allBackgrounds
    });
})

app.post("/kuthite/", (req, res) => {
    processReqBodyChecks(req.body);
    Character.create(req.body, (error, createdCharacter) => {
        res.redirect("/kuthite");
    });
});

app.get("/kuthite/:id", (req, res) => {
    Character.findById(req.params.id, (err, foundCharacter) => {
        res.render("show.ejs", {
            character: foundCharacter,
            cls: allClasses.find(cls => cls.name == foundCharacter.class)
        });
    });
});

app.delete("/kuthite/:id", (req, res) => {
    Character.findByIdAndDelete(req.params.id, () => {
        res.redirect("/kuthite");
    });
});

app.get("/kuthite/:id/edit", (req, res) => {
    Character.findById(req.params.id, (err, foundCharacter) => {
        res.render("edit.ejs", {
            character: foundCharacter,
            classes: allClasses,
            ancestries: allAncestries,
            backgrounds: allBackgrounds
        });
    });
});

app.put("/kuthite/:id", (req, res) => {
    processReqBodyChecks(req.body);
    Character.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        ancestry: req.body.ancestry,
        heritage: req.body.heritage,
        background: req.body.background,
        class: req.body.class,
        subclass1: req.body.subclass1,
        subclass2: req.body.subclass2,
        strength: req.body.strength,
        dexterity: req.body.dexterity,
        constitution: req.body.constitution,
        intelligence: req.body.intelligence,
        wisdom: req.body.wisdom,
        charisma: req.body.charisma,
        ancestryBoosts: req.body.ancestryBoosts,
        backgroundBoosts: req.body.backgroundBoosts,
        classBoost: req.body.classBoost,
        freeBoosts: req.body.freeBoosts
    }, () => res.redirect("/kuthite"));
});

const processReqBodyChecks = (reqBody) => {
    reqBody.ancestryBoosts = [];
    reqBody.backgroundBoosts = [];
    reqBody.freeBoosts = [];
    clsBoost = [];
    const checkProps = Object.getOwnPropertyNames(reqBody).filter(name => name.includes("Check"));
    const ancestryProps = checkProps.filter(name => name.charAt(0) == "a");
    const backgroundProps = checkProps.filter(name => name.charAt(0) == "b");
    const clsProp = checkProps.filter(name => name.charAt(0) == "c");
    const freeProps = checkProps.filter(name => name.charAt(0) == "f");
    updateReqBodyBoostProperties(ancestryProps, reqBody.ancestryBoosts);
    updateReqBodyBoostProperties(backgroundProps, reqBody.backgroundBoosts);
    clsProp[0] ? updateReqBodyBoostProperties(clsProp, clsBoost) : reqBody.classBoost = allClasses.find(cls => cls.name == reqBody.class).keyAbilities[0];
    updateReqBodyBoostProperties(freeProps, reqBody.freeBoosts);
    return reqBody;
}

const updateReqBodyBoostProperties = (checkPropArray, boostPropArray) => {
    checkPropArray.forEach(prop => {
        if (prop.includes("Str"))
            boostPropArray.push("Strength");
        else if (prop.includes("Dex"))
            boostPropArray.push("Dexterity");
        else if (prop.includes("Con"))
            boostPropArray.push("Constitution");
        else if (prop.includes("Int"))
            boostPropArray.push("Intelligence");
        else if (prop.includes("Wis"))
            boostPropArray.push("Wisdom");
        else if (prop.includes("Cha"))
            boostPropArray.push("Charisma");
    });
}