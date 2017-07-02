module.exports = {
    help: 'Gracefully shuts down the bot',
    ownerOnly: true,
    run: (client, msg, args) => {
        msg.channel.send(`\uD83D\uDCAD Shutting down...`)
        setTimeout(() => {
            client.destroy();
            process.exit(0);
        }, 500)
    }
}