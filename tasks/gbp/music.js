const Embed = require("discord.js").RichEmbed;
const Api = require("../../mods/node-dori");

var Bandori = new Api({ region: "jp" });

module.exports = {
    name: "BanG Dream! Music",
    desc: "View BanG Dream! music",
    help: "View BanG Dream! cards using keywords or by ID.",
    args: [
        {name: "id", desc: "A numeric ID for direct search", optional: true},
        {name: "band", desc: "The band's nickname"},
        {name: "type", desc: 'Available Options: "cover" or "original"', optional: true},
    ],
    task: (Kokoro, msg, args) => {
        if (args.length <= 0) 
            return msg.channel.send("Search query can't be empty!");
        else if (args.length <= 1 && !isNaN(args[0])) {
            Bandori.getMusicByID(args[0])
                .then(music =>
                    msg.channel.send(embedMusic(music))
                )
        }
        else {
            console.log(args);
            Bandori.getMusicByQuery(args)
                .then(music => 
                    msg.channel.send(embedMusic(music))
                )
        };
    }
};

function embedMusic(musicArray) {
    var music = (musicArray.length > 0) ? musicArray.shift() : musicArray;
    var color = (bands.hasOwnProperty(music.band)) ? bands[music.band] : [233, 30, 99];
    var difficultyArray = [];
    difficultyArray.push(`★${music.difficulty.easy.level.toString().padStart(2, "0")} EASY`);
    difficultyArray.push(`★${music.difficulty.normal.level.toString().padStart(2, "0")} NORMAL`);
    difficultyArray.push(`★${music.difficulty.hard.level.toString().padStart(2, "0")} HARD`);
    difficultyArray.push(`★${music.difficulty.expert.level.toString().padStart(2, "0")} EXPERT`);
    const embed = new Embed()
        .setAuthor(music.toString())
        .setThumbnail(music.jacket)
        .setColor(color)
        .setDescription(
        `\n• **Arranger:** ${music.arranger}` +
        `\n• **Composer:** ${music.composer}` +
        `\n• **Lyricist:** ${music.lyricist}`)
        .addField("Difficulties",`\`\`\`md\n${difficultyArray.join('\n')}\`\`\`` +
        `\n[Listen](${music.bgm}) (${capitalize(music.type)})`);
    return { embed };
}

function capitalize(str) {
    return str.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var bands = {
    "Poppin'Party": [255, 59, 114],
    "Afterglow": [229, 51, 67],
    "ハロー、ハッピーワールド！": [255, 192, 42],
    "Pastel＊Palettes": [42, 246, 177],
    "Roselia": [59, 73, 255],
}