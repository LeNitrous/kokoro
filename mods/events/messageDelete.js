module.exports = {
    name: "messageDelete",
    event: "messageDelete",
    task: (message) => {
        if (message.guild.id == "261878898290196491") {
            // Guild Logs
            message.guild.channels.get("430280449668153365")
                .send(`\`[${new Date().toLocaleTimeString()}]\` **[MESSAGE REMOVED]** ${message.channel.toString()} ⏹ __${message.member.user.tag}__ deleted a message.\n▪ **Message:** ${message.content}`);
        }
    }
}