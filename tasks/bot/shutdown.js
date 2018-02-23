module.exports = {
    name: 'Shutdown',
    desc: 'Shutdown the bot gracefully',
    preq: ['BotOwnerOnly'],
    task: (Kokoro, msg, args) => {
        Kokoro.shutdown();
    }
};