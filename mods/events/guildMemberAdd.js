module.exports = {
    name: "guildMemberAdd",
    event: "guildMemberAdd",
    task: (member) => {
        if (member.guild.id == "261878898290196491") {
            // Member Probation
            member
                .send(`Welcome ${member.toString()} to **Live Mapping Project**!` +
                      `\n` +
                      `\nYou are currently in probation to look over the server rules.` +
                      `\nYou can read them at <#421546926803124224>. Please wait patiently as it will expire in 5 minutes.` +
                      `\nPlease follow them as they will be your guide and lifeline to this server.` +
                      `\n` +
                      `\nThis has been Kokoro, Happy! Lucky! Smile! Hooray!`);
            member.addRole(member.guild.roles.get("421573966105149444"), "A new member joined.");
            setTimeout(() => {
                if (member) {
                    member.send("Your probation has ended and you can now talk. Don't forget to say hi to us!");
                    member.removeRole(member.guild.roles.get("421573966105149444"), "Probation expired.");
                    member.addRole(member.guild.roles.get("274898645869133825"), "Probation expired.");
                }
            }, 300000);
            // Guild Logs
            member.guild.channels.get("430280449668153365")
                .send(`\`[${new Date().toLocaleTimeString()}]\` **[MEMBER JOINED]** 🆕 __${member.user.tag}__ joined the server.`);
        }
    }
}