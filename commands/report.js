const Discord   = require('discord.js'),
      config    = require('../config.json'),
      util      = require('../utils/utils.js'),
      blacklist = require('../data/blacklist.json');

module.exports = {
    help: 'Send a report to the bot owner',
    usage: "<message>",
    run: (client, msg, args) => {
        var text = args.join(" ");
        if(blacklist[msg.author.id]) { return msg.author.send('\u1F6AB \u276f  You are not allowed to send reports.') };
        const embed = new Discord.RichEmbed()
            .setAuthor(msg.author.tag)
            .setColor([247, 49, 49])
            .addField("ID", msg.author.id, true)
            .addField("Server", msg.guild.name, true)
            .addField("Message", text)
            .setTimestamp(new Date())
            .setFooter(`Report #${config.reportCount}`);
        client.users.find('id', config.ownerID).send({embed});
        msg.author.send(`\u1F4A1 \u276f  Your report has been submitted. **ID: #${config.reportCount}**`);
        config.reportCount++;
        util.SaveFile('./config.json', config);
    }
}