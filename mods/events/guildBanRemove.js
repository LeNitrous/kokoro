module.exports = {
    name: "guildBanAdd",
    event: "guildBanAdd",
    task: (guild, user) => {
        if (guild.id == "261878898290196491") {
            // Guild Logs
            guild.channels.get("430280449668153365")
                .send(`\`[${new Date().toLocaleTimeString()}]\` **[MEMBER UNBANNED]** ⚠ __${user.discriminator}__ has been unbanned.`);
        }
    }
}