const Discord	= require('discord.js'),
      config   	= require('./config.json');

const Manager = new Discord.ShardingManager('./bot.js',
    {
        totalShards: 'auto',
        respawn: true,
        token: config.token
    }
);

Manager.spawn();

process.on('SIGINT', () => {
    Manager.broadcastEval(`
        Bot.destroy();
    `)
    setTimeout(() => {
        console.log('Shutting down...')
        process.exit(0);
    }, 1000);
})