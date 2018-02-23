module.exports = {
    name: "BanG Dream! Announcer",
    desc: "Announcer Settings",
    help: "Settings for various announcements.",
    args: [
        {name: "option", desc: 'Valid options are: "birthdayChannel", "eventChannel", "eventMessage"'},
        {name: "value", desc: "Dependent on option selected. Leave empty to delete option."}

    ],
    task: (Kokoro, msg, args) => {
        var validOptions = ["birthdaychannel", "eventchannel", "eventmessage"];
        var option = args.shift().toLowerCase();
        var value = args.shift();
        var guildId = msg.guild.id;
        var chanId, channel;
        switch(option) {
            case "birthdaychannel": {
                if (!value) {
                    Kokoro.setGuildOption(guildId, "bandori_birthdayChannel");
                    Kokoro.send(msg.channel, "✅", "Disabled birthday announcer.");
                }
                else {
                    chanId = value.substring(2, value.length - 1);
                    if (!chanId)
                        return Kokoro.send(msg.channel, "❎", "Invalid channel.");
                    channel = msg.guild.channels.find('id', chanId);
                    console.log(option, value, chanId, guildId, channel.type);
                    if (channel.type == 'voice')
                        return Kokoro.send(msg.channel, "❎", "Cannot use a voice channel.");
                    Kokoro.setGuildOption(guildId, "bandori_birthdayChannel", chanId);
                    Kokoro.send(msg.channel, "✅", `Birthday announce channel is set to ${value}.`);
                }
                break;
            }
            case "eventchannel": {
                if (!value) {
                    Kokoro.setGuildOption(guildId, "bandori_eventChannel");
                    Kokoro.send(msg.channel, "✅", "Disabled event announcer.");
                }
                else {
                    chanId = value.substring(2, value.length - 1);
                    if (!chanId)
                        return Kokoro.send(msg.channel, "❎", "Invalid channel.");
                    channel = msg.guild.channels.find('id', chanId);
                    if (channel.type == 'voice')
                        return Kokoro.send(msg.channel, "❎", "Cannot use a voice channel.");
                    Kokoro.setGuildOption(guildId, "bandori_eventChannel", chanId);
                    Kokoro.send(msg.channel, "✅", `Event announce channel is set to ${value}.`);
                }
                break;
            }
            case "eventmessage": {
                if (!value) {
                    Kokoro.setGuildOption(guildId, "bandori_eventMessage");
                    Kokoro.send(msg.channel, "✅", "Removed event message.");
                }
                else {
                    value = value.split("_").join(" ");
                    Kokoro.setGuildOption(guildId, "bandori_eventMessage", value);
                    Kokoro.send(msg.channel, "✅", `Event appended message is set to "${value}".`);
                }
                break;
            }
            default: {
                Kokoro.send(msg.channel, "❎", "Invalid Option. See help for details.");
            }
        }
    }
};