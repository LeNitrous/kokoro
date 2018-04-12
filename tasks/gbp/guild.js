module.exports = {
    name: "BanG Dream! Guild Settings",
    desc: "View guild settings",
    help: 'View guild settings.',
    args: [
        {name: "key", desc: "Setting to change. Leave blank to view current guild settings."},
        {name: "value", desc: "Value to set for that key setting. Allowed values may vary. Leave blank to reset."}
    ],
    preq: ["HasElevatedPerms"],
    perm: ["MANAGE_CHANNELS"],
    task: (Kokoro, msg, args) => {
        var guildConf = Kokoro.settings.get("guild");
        var id = msg.guild.id;
        if (args[0] === undefined) {
            var keys = "";
            Object.keys(guildConf[id]).forEach(key => {
                keys += `${padString(key, 15)} : ${guildConf[id][key]}\n`;
            });
            msg.channel.send(`Guild Settings for **${msg.guild.name}**\`\`\`${keys}\`\`\``);
        }
        else {
            if (!guildConf[id].hasOwnProperty(args[0])) return msg.channel.send("That setting is not an option.");
            if (args[1] === undefined) {
                guildConf[id][args[0]] = Kokoro.defaultSettings.guild[args[0]];
                msg.channel.send(`Setting \`${args[0]}\` has been reset.`);
            }
            else {
                guildConf[id][args[0]] = args[1];
                msg.channel.send(`Set \`${args[0]}\` setting to **${args[1]}**.`);
            }
            Kokoro.settings.set("guild", guildConf);
        }
    }
};

function padString(string, padLength) {
    if (string.length > padLength) throw new Error('Invalid size.');
    var num = padLength - string.length;
    for (var i = 0; i < num; i++) {
        string += ' ';
    };
    return string;
};