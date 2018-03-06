module.exports = {
    name: "Peek at Ping",
    event: "message",
    task: (msg) => {
        if (msg.guild.id != "261878898290196491")
            return;
        if (msg.isMemberMentioned(msg.client.user)) {
            msg.channel.send("<:kokoroPeek:417270439791034369>");
        }
    }
}