module.exports = {
    name: "messageUpdate",
    event: "messageUpdate",
    task: (oldMessage, newMessage) => {
        if (oldMessage.guild.id == "261878898290196491") {
            // Guild Logs
            if (!oldMessage.author.bot && oldMessage.content != newMessage.content) {
                oldMessage.guild.channels.get("430280449668153365")
                .send(`\`[${new Date().toLocaleTimeString()}]\` **[MESSAGE UPDATED]** ${oldMessage.channel.toString()} 🔁 __${oldMessage.member.user.tag}__ edited a message.\n▪ **__Before:__**\n${oldMessage.content}\n▪ **__After:__**\n${newMessage.content}`);
            }
        }
    }
}