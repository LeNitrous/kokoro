module.exports = {
    name: "New Member",
    event: "guildMemberAdd",
    task: (member) => {
        if (member.guild.id == "261878898290196491") {
            member
                .send(`Welcome ${member.toString()} to **Live Mapping Project**!` +
                      `\n` +
                      `\nYou are currently in probation to look over the server rules.` +
                      `\nYou can read them at <#421546926803124224>. Please wait patiently as it will expire in 10 minutes.` +
                      `\nWith that said, thank you for joining our community. This has been Kokoro, Happy! Lucky! Smile! Hooray!`);
            member.addRole(member.guild.roles.find("name", "Limited"), "A new member joined.");
            setTimeout(() => {
                if (member) {
                    member.send("You can now talk. Have fun!!!");
                    member.removeRole(member.guild.roles.find("name", "Limited"), "Probation expired.")
                }
            }, 300000);
        }
    }
}