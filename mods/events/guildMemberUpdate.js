module.exports = {
    name: "guildMemberRemove",
    event: "guildMemberRemove",
    task: (oldMember, newMember) => {
        if (member.guild.id == "261878898290196491") {
            // Guild Logs
            if (oldMember.nickname !== newMember.nickname) {
                member.guild.channels.get("430280449668153365")
                    .send(`\`[${new Date().toLocaleTimeString()}]\` **[MEMBER UPDATE]** 🔁 __${oldMember.user.discriminator}__ updated their nickname.\n▪ \`${oldMember.nickname}\` => \`${newMember.nickname}\``);
            }
            else if (!oldMember.roles.equals(newMember.roles)) {
                var oldMemberRoles = Array.from(oldMember.roles.values());
                var newMemberRoles = Array.from(newMember.roles.values());
                var newRoles = oldMemberRoles.filter(n => {
                    return newMemberRoles.indexOf(n) !== -1;
                });
                member.guild.channels.get("430280449668153365")
                    .send(`\`[${new Date().toLocaleTimeString()}]\` **[MEMBER UPDATE]** 🔁 __${oldMember.user.discriminator}__ updated their roles.\n▪ ${newRoles.join(", ")}`);
            }
        }
    }
}