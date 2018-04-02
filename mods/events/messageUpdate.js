module.exports = {
    name: "messageUpdate",
    event: "messageUpdate",
    task: (oldMessage, newMessage) => {
        if (oldMessage.guild.id == "261878898290196491") {
            // Guild Logs
            oldMessage.guild.channels.get("430280449668153365")
                .send(`\`[${new Date().toLocaleTimeString()}]\` **[MESSAGE UPDATED]** ${oldMessage.channel.toString()} 🔁 __${oldMessage.member.user.tag}__ edited a message.\n▪ **Before:** ${oldMessage.content}\n▪ **Before:** ${newMessage.content}`);
        }
    }
}