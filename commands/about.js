const Discord       = require('discord.js'),
	  stripIndent	= require('common-tags').stripIndent,
	  config  		= require('../config.json');

function format(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
};

module.exports = {
	help: 'View the bot\'s information.',
	run: (client, msg, args) => {
		if (args[0] == '--credits') {
			const embed = new Discord.RichEmbed()
				.setAuthor('Credits')
				.setDescription('Thanks to them, this was possible!')
				.setColor([255, 221, 8])
				.addField('Sources', stripIndent`
				\u2022 [Discord.js](discord.js.org)
				\u2022 [osu!](osu.ppy.sh)
				\u2022 [School Idol Tomodachi](schoolido.lu)
				\u2022 [Bandori.party](bandori.party)
				`, true)
				.addField('\u200b', stripIndent`
				\u2022 [Starlight.kirara.ca](https://starlight.kirara.ca/)
				\u2022 [Usamin.info](usamin.info)
				\u2022 [Cinderella.pro](cinderella.pro)
				\u2022 [MyAnimeList](myanimelist.net)
				`, true)
				.addField('Links', stripIndent`
				\u2022 [me!](https://osu.ppy.sh/u/7293512) on osu!
				\u2022 [bot!](https://github.com/LeNitrous/kokoro) on GitHub
				`)
				.setFooter(`Created by ${client.users.find('id', config.ownerID).tag}`, client.users.find('id', config.ownerID).avatarURL);
				return msg.author.send({embed});
		};
		var uptime = process.uptime();
		if (args[0] == '--stats') {
			const embed = new Discord.RichEmbed()
				.setAuthor(`${client.user.username} ver. ${config.bot_version}`, client.user.displayAvatarURL)
				.setColor([255, 221, 8])
				.addField(`Statistics`, stripIndent`
				\u2022 Servers: ${client.guilds.size}	
				\u2022 Guilds: ${client.guilds.size}
				\u2022 Text Channels: ${client.channels.filter(t => t.type == "text").size} 
				`, true)
				.addField('\u200b', stripIndent`
				\u2022 Node Uptime: ${format(uptime)}
				\u2022 Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
				\u2022 Voice Channels: ${client.channels.filter(t => t.type == "voice").size}
				`, true)
				.setFooter(`Created by ${client.users.find('id', config.ownerID).tag}`, client.users.find('id', config.ownerID).avatarURL);
				return msg.author.send({embed});
		};
		const embed = new Discord.RichEmbed()
			.setAuthor(`About ${client.user.username}`)
			.setColor([255, 221, 8])
			.setThumbnail(client.user.avatarURL)
			.setDescription(stripIndent`
			Hi there, I'm **${client.user.username}**! I'm a bot that lets you have fun, helps you with utility and moderation and provide information on your favorite anime, manga and rhythm games!

			If you need any help, don't hesitate by calling me using \`${config.prefix}help\`!
			Invite me to your server using this [link](https://discordapp.com/oauth2/authorize?client_id=${config.client_id}&scope=bot)!
			`)
			.addField('Notice!', stripIndent`
			I'm still under heavy development! New features are underway and there might also be updates at any time. There might also be things that are still broken or missing. Please be patient everything will be added and fixed.
			`)
			.addField(`${client.user.username} ver. ${config.bot_version}`, stripIndent`
			\u2022 Servers: ${client.guilds.size}
			\u2022 Uptime: ${format(uptime)}
			`, true)
			.addField(`\u200b`, stripIndent`
			\u2022 Guilds: ${client.guilds.size}
			\u2022 Channels: ${client.channels.filter(t => t.type == "text").size} text | ${client.channels.filter(t => t.type == "voice").size} voice
			`, true)
			.setFooter(`Created by ${client.users.find('id', config.ownerID).tag}`, client.users.find('id', config.ownerID).avatarURL);
		msg.author.send({embed});
	}
};