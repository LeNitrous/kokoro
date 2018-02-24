const BandoriApi = require("./node-dori");
const Discord = require("discord.js");

const Bandori = new BandoriApi({
    region: "jp"
});

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
    const embed = new Discord.RichEmbed()
        .setAuthor(card.toString(), card.getIcon(),
            `https://bandori.party/cards/${card.locale.id}`)
        .setThumbnail(card.locale.image.normal_icon)
        .setColor(card.getColor())
        .addField("Skill Type", skill_type, true)
        .addField("Max Power", card.parameterMax.total + (card.parameterStoryBonus[0] +
            card.parameterStoryBonus[1]) * 3 +card.parameterTrainBonus * 3, true)
        .addField(skill_title, skill_info);
    if (cardArray.length > 0) {
        var relatedCards = [];
        cardArray.forEach(item => {
            relatedCards.push(`#${item.id.toString().padStart(3, "0")} > ` + item.toString());
        });
        relatedCards.length = 5;
        embed.addField('Related Cards', `\`\`\`md\n${relatedCards.join('\n')}\`\`\``);
    }
    return { embed };
}

function embedCardArt(cardArray, state) {
    var card = (cardArray.length > 1) ? cardArray.shift() : cardArray;
    const embed = new Discord.RichEmbed()
        .setAuthor(card.toString(), card.getIcon())
        .setImage(card.image[state])
        .setColor(card.getColor());
    if (cardArray.length > 0) {
        var relatedCards = [];
        cardArray.forEach(item => {
            relatedCards.push(`#${item.id.toString().padStart(3, "0")} > ` + item.toString());
        });
        relatedCards.length = 5;
        embed.addField('Related Cards', `\`\`\`md\n${relatedCards.join('\n')}\`\`\``);
    }
    return { embed };
}

function embedEvent(event, eventLocale, cardArray, musicArray) {
    var cardList = [];
    var musicList = [];
    var memberList = [];
    event.locale = eventLocale;
    var event_title = (event.locale) ? capitalize(event.locale.name) : event.name;
    cardArray
        .forEach(item => {
            cardList.push(`#${item.id.toString().padStart(3, "0")} > ` + item.toString());
        });
    event.characters
        .forEach(item => {
            memberList.push(emojis[item]);
        });
    const embed = new Discord.RichEmbed()
        .setAuthor(event_title, event.getIcon(),
            `https://bandori.party/events/${event.id}`)
        .addField("Event Members", memberList.join(" "), true)
        .addField("Event Type", eventTypes[event.type], true)
        .addField("Reward Cards", `\`\`\`md\n${cardList.join('\n')}\`\`\``)
        .setColor(event.getColor())
        .setImage(event.image);
    if (musicArray.length > 0) {
        musicArray.forEach(item => {
            stringMusic.push(`#${item.id.toString().padStart(3, "0")} > ` + item.toString());
        });
        embed.addField('Event Music', `\`\`\`md\n${musicList.join('\n')}\`\`\``);
    }
    if (event.getState() == 0)
        embed.addField("Ends In", timeLeft(event.end))
    return { embed };
}

function embedMusic(musicArray) {
    var music = (musicArray.length > 0) ? musicArray.shift() : musicArray;
    var color = (bands.hasOwnProperty(music.band)) ? bands[music.band] : [233, 30, 99];
    var difficultyArray = [];
    difficultyArray.push(`★${music.difficulty.easy.level.toString().padStart(2, "0")} EASY`);
    difficultyArray.push(`★${music.difficulty.normal.level.toString().padStart(2, "0")} NORMAL`);
    difficultyArray.push(`★${music.difficulty.hard.level.toString().padStart(2, "0")} HARD`);
    difficultyArray.push(`★${music.difficulty.expert.level.toString().padStart(2, "0")} EXPERT`);
    const embed = new Discord.RichEmbed()
        .setAuthor(music.toString())
        .setThumbnail(music.jacket)
        .setColor(color)
        .setDescription(
        `\n• **Arranger:** ${music.arranger}` +
        `\n• **Composer:** ${music.composer}` +
        `\n• **Lyricist:** ${music.lyricist}`)
        .addField("Difficulties",`\`\`\`md\n${difficultyArray.join('\n')}\`\`\`` +
        `\n[Listen](${music.bgm}) (${capitalize(music.type)})`);
    if (musicArray.length > 0) {
        var musicList = [];
        musicArray.forEach(item => {
            musicList.push(`#${item.id.toString().padStart(3, "0")} > ` + item.toString());
        });
        musicList.length = 5;
        embed.addField('Similar Music', `\`\`\`md\n${musicList.join('\n')}\`\`\``);
    }
    return { embed };
}

function embedKoma(koma) {
    const embed = new Discord.RichEmbed()
        .setAuthor(`#${koma.id} ${koma.title}`)
        .setColor([233, 30, 99])
        .setImage(koma.image);
    return { embed };
}

function sendSearch(msg, array) {
    var list = [];
        array.forEach(item => {
            list.push(`#${item.id.toString().padStart(3, "0")} > ` + item.toString());
        });
        found = list.length;
        list = list.join('\n');
        msg.send(`Found **${found}** occurences`);
        if (list.length > 1950) {
            var result = Discord.Util.splitMessage(list);
            result.forEach(block => {
                msg.send(block, {code: 'md'});
            });
        }
        else
            msg.send(list, {code: 'md'});
}

module.exports.Api = Bandori;
module.exports.embedCard = embedCard;
module.exports.embedCardArt = embedCardArt;
module.exports.embedEvent = embedEvent;
module.exports.embedMusic = embedMusic;
module.exports.embedKoma = embedKoma;
module.exports.sendSearch = sendSearch;

function capitalize(str) {
    return str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function timeLeft(date) {
    let time;

    if (new Date() < date)
        time = new Date(date - new Date()).getTime();
    else if (new Date() > date)
        time = new Date(new Date() - date).getTime();

    let d = Math.floor(time / (1000 * 60 * 60 * 24));
    let h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((time % (1000 * 60)) / 1000);

    let str = '';

    let d_tag = (d == 1) ? 'day' : 'days';
    let h_tag = (h == 1) ? 'hour' : 'hours';
    let m_tag = (m == 1) ? 'minute' : 'minutes';
    let s_tag = (s == 1) ? 'second' : 'seconds';

    if (d != 0)
        str = str + `${d} ${d_tag} `;
    if (h != 0)
        str = str + `${h} ${h_tag} `;
    if (m != 0)
        str = str + `${m} ${m_tag} `;
    if (s != 0)
        str = str + `${s} ${s_tag}`;

    return str;
}

var emojis = { 
    "Toyama Kasumi": '<:kasumi:411101168635346945>',
    "Hanazono Tae": '<:tae:411101169478270978>',
    "Ushigome Rimi": '<:rimi:411101168987668501>',
    "Yamabuki Saaya": '<:saaya:411101169755226112>',
    "Ichigaya Arisa": '<:arisa:411101141229633536>',
    "Mitake Ran": '<:ran:411101168958439425>',
    "Aoba Moca": '<:moca:411101168291414019>',
    "Uehara Himari": '<:himari:411101167557410816>',
    "Udagawa Tomoe": '<:tomoe:411101169600167937>',
    "Hazawa Tsugumi": '<:tsugumi:411101169650368512>',
    "Tsurumaki Kokoro": '<:kokoro:406381351718354964>',
    "Seta Kaoru": '<:kaoru:411101168756981770>',
    "Kitazawa Hagumi": '<:hagumi:411101164004704268>',
    "Matsubara Kanon": '<:kanon:411101167624519680>',
    "Michelle": '<:misaki:411101168341745665>',
    "Maruyama Aya": '<:aya:411101160766832651>',
    "Hikawa Hina": '<:hina:411101167184248843>',
    "Shirasagi Chisato": '<:chisato:411101165191954432>',
    "Yamato Maya": '<:maya:411101168874422272>',
    "Wakamiya Eve": '<:eve:411101167058288640>',
    "Minato Yukina": '<:yukina:411101168903651328>',
    "Hikawa Sayo": '<:sayo:411101169331732480>',
    "Imai Lisa": '<:lisa:411101169134469120>',
    "Udagawa Ako": '<:ako:411101139983925248>',
    "Shirokane Rinko": '<:rinko:411101169260298250>'
}

var bands = {
    "Poppin'Party": [255, 59, 114],
    "Afterglow": [229, 51, 67],
    "ハロー、ハッピーワールド！": [255, 192, 42],
    "Pastel＊Palettes": [42, 246, 177],
    "Roselia": [59, 73, 255],
}

var eventTypes = {
    "live_try": "Live Try",
    "challenge": "Live Challenge",
    "versus": "Versus Live",
    "story": "Normal"
}