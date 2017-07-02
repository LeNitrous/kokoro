var chalk 	= require('chalk');
	
module.exports = {
	
	info(text, h = 'INFO') {
		return console.log(`${chalk.bgGreen.black(` ${h} `)} ${text}`);
	},

	info2(text, h = 'INFO') {
		return console.log(`${chalk.bgWhite.black(` ${h} `)} ${text}`);
	},
	
	debug(text, h = 'DEBUG') {
		return console.log(`${chalk.bgWhite.black(` ${h} `)} ${text}`);
	},
	
	warn(text, h = 'WARN') {
		return console.log(`${chalk.bgYellow.black(` ${h} `)} ${text}`);
	},
	
	error(text, h = 'ERROR') {
		return console.log(`${chalk.bgRed.black(` ${h} `)} ${text}`);
	},
	
	logCommand(guildName, userName, commandName) {
		if (guildName)
			return console.log(`${chalk.bold.green(userName)} @ ${chalk.bold.blue(guildName)} ${chalk.bold.yellow('\u00BB')} ${commandName}`);
		return console.log(`${chalk.bold.green(userName)} ${chalk.bold.yellow('\u00BB')} ${commandName}`);
	}
	
};