module.exports = {
    name: "guildMemberRemove",
    event: "guildMemberRemove",
    task: (member) => {
        if (member.guild.id == "261878898290196491") {
            // Guild Logs
            member.guild.channels.get("430280449668153365")
                .send(`\`[${new Date().toLocaleTimeString()}]\` **[MEMBER LEFT]** ❎ __${member.user.tag}__ left the server.`);
        }
    }
}