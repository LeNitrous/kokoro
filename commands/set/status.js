module.exports = {
    help: 'Sets the bot\'s status. Can be "dnd/idle/online/invisible"',
    usage: '<State>',
    ownerOnly: true,
    run: (client, msg, args) => {
        var text = args[0];
        if (text != "dnd" || text != "idle" || text != "online" || text != "invisible" ) {msg.channel.send('Please provide a valid status.\nIt can be: "dnd" "online" "idle" "invisible".'); return;};
        msg.client.user.setStatus(text);
        msg.channel.send('Status successfully changed!');
    }
}