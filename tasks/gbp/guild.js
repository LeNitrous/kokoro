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
            var key = args.shift();
            var value = args.join(' ');
            if (!guildConf[id].hasOwnProperty(key)) return msg.channel.send("That setting is not an option.");
            if (value === undefined) {
                guildConf[id][key] = Kokoro.defaultSettings.guild[key];
                msg.channel.send(`Setting \`${key}\` has been reset.`);
            }
            else {
                guildConf[id][key] = value;
                msg.channel.send(`Set \`${key}\` setting to **${value}**.`);
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