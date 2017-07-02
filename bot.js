const Discord	= require('discord.js'),
	  fs 		= require('fs'),
	  path		= require('path'),
	  util		= require('./utils/utils.js'),
	  log		= require('./utils/Logger.js'),
	  config   	= require('./config.json'),
	  stripIndent	= require('common-tags').stripIndent; 

const Bot = new Discord.Client();

Bot	
	.on('warn', (e) => log.warn(e))
	.on('error', (e) => log.warn(e))
	.on('disconnect', () => log.error(`#${Bot.shard.id} DISCONNECTED FROM DISCORD`, 'WARN'))
	.on('ready', () => {
		log.info(`#${Bot.shard.id} CONNECTED TO DISCORD`);
	})
	.login(config.token);

Bot.on('message', (message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(config.prefix)) return;

	var obj = message.content.split(' ');
	var cmd = obj.shift().slice(config.prefix.length);
	var sub;

	var fp = './commands/' + cmd;

	let file;
	let args;

	try {

	// IF COMMAND
	fs.access(fp + ".js", fs.constants.F_OK, (err) => {
		if (Boolean(err)) return;
		file = require(fp);
		args = obj;
		if (file.serverOnly && message.channel.guild === undefined) { message.channel.send(config.replySet.serverOnly); return; };
		if (file.ownerOnly && message.author.id != config.ownerID) { message.channel.send(config.replySet.noPermsUser); return; };
		if (file.serverOwnerOnly && message.author.id != message.guild.ownerID) { message.channel.send(config.replySet.noPermsUser); return; };
		log.logCommand(message.channel.guild === undefined ? null: message.channel.guild.name, message.author.username, message.content.slice(config.prefix.length));
		file.run(Bot, message, args);
	});

	// IF SUBCOMMAND 
	fs.access(fp, fs.constants.F_OK, (err) => {
		if (Boolean(err)) return;
		sub = obj.shift();
		fs.access(fp + "/" + sub +  ".js", fs.constants.F_OK, (err) => {
			if (Boolean(err)) return;
			file = require(fp + '/' + sub + '.js');
			args = obj;
			if (file.serverOnly && message.channel.guild === undefined) { message.channel.send(config.replySet.serverOnly); return; };
			if (file.ownerOnly && message.author.id != config.ownerID) { message.channel.send(config.replySet.noPermsUser); return; };
			if (file.serverOwnerOnly && message.author.id != message.guild.ownerID) { message.channel.send(config.replySet.noPermsUser); return; };
			log.logCommand(message.channel.guild === undefined ? null: message.channel.guild.name, message.author.username, message.content.slice(config.prefix.length));
			file.run(Bot, message, args);
		});
	});

	}
	catch (err) {
		log.error(`Shard #${Bot.shard.id}\n${err.stack}`);
		message.channel.send(config.replySet.error);
	}
});