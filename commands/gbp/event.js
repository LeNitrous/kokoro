const Bandori = require('../../utils/node-bandori'),
      Discord = require('discord.js');

module.exports = {
    help: 'Show the latest Bandori Event.',
    run: (client, msg, args) => {
        msg.channel.startTyping();
        Bandori.getCurrentEvent()
        .then(event => {
            const info = new Discord.RichEmbed()
            .setTitle(event.en_name)
            .setURL(event.website_url)
            .setDescription(event.jp_name)
            .addField('Start Date', event.jp_start, true)
            .addField('End Date', event.jp_end, true)
            .setImage(event.image)
            .setColor([228, 0, 70]);
            if (event.jp_timeleft) {
                info.addField(`Time Remaining`, event.jp_timeleft)
            };
            msg.channel.send({embed: info});
        });
        msg.channel.stopTyping();
    }
}