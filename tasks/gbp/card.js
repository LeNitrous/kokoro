const Embed = require("discord.js").RichEmbed;
const Api = require("../../mods/node-dori");

var Bandori = new Api({ region: "jp" });

module.exports = {
    name: "BanG Dream! Cards",
    desc: "View BanG Dream! cards",
    help: "View BanG Dream! cards using keywords or by ID.",
    args: [
        {name: "id", desc: "A numeric ID for direct search", optional: true},
        {name: "name", desc: "Character's first name"},
        {name: "rarity", desc: "Card rarity"},
        {name: "attribute", desc: "Card attribute"},
        {name: "--normal", desc: "Card art flag. Show normal state", optional: true},
        {name: "--trained", desc: "Card art flag. Show trained state", optional: true}
    ],
    task: (Kokoro, msg, args) => {
        var flagValue;
        var flags = ["normal", "trained"];
        var gotFlag = args.filter(elem => elem.match(/--\w+/g)).shift();
        if (gotFlag !== undefined) {
            args.splice(args.indexOf(gotFlag), 1);
            flagValue = gotFlag.substring(2, gotFlag.length);
            if (!flags.includes(flagValue))
                return msg.channel.send("Invalid art state. See help for details.");
        }

        if (args.length <= 0) 
            return msg.channel.send("Search query can't be empty!");
        else if (args.length <= 1 && !isNaN(args[0])) {
            Bandori.getCardByID(args[0])
                .then(card =>
                    card.getLocale()
                        .then(locale => {
                            if (!flagValue)
                                msg.channel.send(embedCard(card, locale));
                            else
                                msg.channel.send(embedCardArt(card, flagValue));
                        })
                )
        }
        else {
            Bandori.getCardByQuery(args)
                .then(card => 
                    card[0].getLocale()
                        .then(locale => {
                            if (!flagValue)
                                msg.channel.send(embedCard(card, locale));
                            else
                                msg.channel.send(embedCardArt(card, flagValue));
                        })
                )
        };
    }
};

function embedCard(cardArray, cardLocale, cardSkill) {
    var card = (cardArray.length >= 1) ? cardArray.shift() : cardArray;
    var skill_type, skill_title, skill_detail;
    var maxLevel = (card.rarity < 3) ? card.maxLevel : card.maxLevelTrained;
    card.locale = cardLocale;
    card.skill = cardSkill;
    if (cardLocale) {   
        skill_type = (card.locale.skill.side_type) ? capitalize(card.locale.skill.main_type) + " + " +
            capitalize(card.locale.skill.side_type) : capitalize(card.locale.skill.main_type);
        skill_info = card.locale.skill.description;
        skill_title = card.locale.skill.name;
    }
    else {
        skill_type = "Unknown";
        skill_info = card.skill.details[0];
        skill_title = card.skill.name;
    }
    const embed = new Embed()
        .setAuthor(card.toString(), card.getIcon(),
            `https://bandori.party/cards/${card.locale.id}`)
        .setThumbnail(card.locale.image.normal_icon)
        .setColor(card.getColor())
        .addField("Skill Type", skill_type, true)
        .addField("Max Power", card.parameterMax.total + (card.parameterStoryBonus[0] +
            card.parameterStoryBonus[1]) * 3 +card.parameterTrainBonus * 3, true)
        .addField(skill_title, skill_info);
    return { embed };
}

function embedCardArt(cardArray, state) {
    var card = (cardArray.length > 1) ? cardArray.shift() : cardArray;
    const embed = new Embed()
        .setAuthor(card.toString(), card.getIcon())
        .setImage(card.image[state])
        .setColor(card.getColor());
    return { embed };
}

function capitalize(str) {
    return str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}