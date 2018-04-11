const Embed = require("discord.js").RichEmbed;
const Api = require("../../mods/node-dori");

module.exports = {
    name: "BanG Dream! Event",
    desc: "Get current Girls Band Party event",
    help: 'Get current Girls Band Party event.',
    task: (Kokoro, msg, args) => {
        if (!args[0]) args[0] = "jp";
        var region = args[0].toLowerCase();
        var allowedRegions = ["en", "tw", "kr", "jp"];
        if (!allowedRegions.includes(region)) {
            return msg.channel.send("Invalid region. Please use `en`, `jp`, `kr`, `tw`.");
        }
        var Bandori = new Api({ region: region });

        var cache = Kokoro.settings.get("cache");
        if (cache.events[region] === null) {
            cache.events[region] = { event: { end: 0 } };
        }
        if (cache.events[region].event.end <= new Date().getTime() || args[1] == "--force") {
            console.log("Found new event data. Now Loading...");
            msg.channel.startTyping();
            Bandori.getCurrentEvent()
                .then(event => 
                    Promise.all([
                        event.getCards(),
                        event.getMusic()
                    ])
                    .then(response => {
                        var data = {
                            event: event,
                            cards: response[0],
                            music: response[1]
                        };
                        cache.events[region] = data;
                        Kokoro.settings.set("cache", cache);
                        var embed = embedEvent(data.event, data.cards, data.music);
                        msg.channel.send(embed);
                        msg.channel.stopTyping();
                    })
                )
        }
        else {
            var embed = embedEvent(cache.events[region].event, 
                cache.events[region].cards, cache.events[region].music);
            msg.channel.send(embed);
        }
    }
};

function embedEvent(event, cards, music) {
    var cardArray = [];
    var charArray = [];
    var musicArray = [];
    cards.forEach(item => {
        cardArray.push(`#${item.id.toString().padStart(3, "0")}> ` + item.toString());
    });
    event.characters.forEach(item => {
        charArray.push(emojis[item]);
    });
    const embed = new Embed()
        .setAuthor(event.name, event.getIcon(), `https://bandori.party/events/${event.id}`)
        .addField("Event Members", charArray.join(" "), true)
        .addField("Event Type", types[event.type], true)
        .addField("Reward Cards", `\`\`\`md\n${cardArray.join('\n')}\`\`\``)
        .setColor(event.getColor())
        .setImage(event.image);
    if (music.length > 0) {
        music.forEach(item => {
            musicArray.push(`#${item.id.toString().padStart(3, "0")} > ` + item.toString());
        });
        embed.addField('Event Music', `\`\`\`md\n${musicArray.join('\n')}\`\`\``);
    }
    if (event.getState() == 0) {
        embed.addField("Ends In", timeLeft(event.end));
    }
    else if (event.getState() == -1) {
        embed.addField("Starts In", timeLeft(event.start));
    }
    return { embed };
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

const emojis = { 
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

const types = {
    "live_try": "Live Try",
    "challenge": "Live Challenge",
    "versus": "Versus Live",
    "story": "Normal"
}