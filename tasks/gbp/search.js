const Embed = require("discord.js").RichEmbed;
const Api = require("../../mods/node-dori");

var Bandori = new Api({ region: "jp" });

module.exports = {
    name: "BanG Dream! Search",
    desc: "Search the BanG Dream! Database",
    help: "Search the BanG Dream! Database.",
    args: [
        {name: "category", desc: "Search category. Music and Cards"},
        {name: "query", desc: "Search query. See other commands for query"}
    ],
    task: (Kokoro, msg, args) => {
        var categories = ["card", "music"];
        var selected = args.shift();
        if (categories.indexOf(selected) == -1)
            return msg.channel.send("Invalid category. See help for details.");
        else if (selected == "card") {
            Bandori.getCardByQuery(args)
                .then(card => 
                    search(msg.author, card)
                )
        }
        else if (selected == "music") {
            Bandori.getMusicByQuery(args)
                .then(music => 
                    search(msg.author, music)
                )
        }
    }
};

function search(msg, array) {
    var list = [];
        array.forEach(item => {
            list.push(`#${item.id.toString().padStart(3, "0")} > ` + item.toString());
        });
        found = list.length;
        list = list.join('\n');
        msg.send(`Found **${found}** occurences.`);
        if (list.length > 1950) {
            var result = Discord.Util.splitMessage(list);
            result.forEach(block => {
                msg.send(block, {code: 'md'});
            });
        }
        else if (list.length > 0)
            msg.send(list, {code: 'md'});
}