const fs 	  = require('fs'),
      path  = require('path'),
      util  = require('../utils/utils.js'),
      stripIndent   = require('common-tags').stripIndent,
      config  = require('../config.json');

var filepath = __dirname + '/';

module.exports = {
  help: 'Show list of commands or help for a specific command.',
  usage: '<Command>|[Number]',
  run: (client, msg, args) => {
    let cmd = args[0];
    let sub = args[1];

    // IF NONE
    if (!fs.existsSync(filepath + cmd) && !Boolean(cmd) || !isNaN(parseInt(cmd))) {
      if (!Boolean(cmd)) {cmd = 1};
      util.sendcmdlist(msg, cmd, filepath, config.prefix);
      return;
    };

    // IF COMMAND HELP
    if (fs.existsSync(filepath + cmd + ".js")) {
      let f = require(`./${cmd}.js`)
      var u = Boolean(f.usage) ? f.usage : '';
      var h = Boolean(f.help) ? f.help : '';
      util.sendcmdhelp(msg, cmd, config.prefix, h, u);
      return;
    };

    // IF SUBCOMMAND HELP
    if (fs.existsSync(filepath + cmd) && !Boolean(sub) || !isNaN(parseInt(sub)) ) {
      if (!Boolean(sub)) {sub = 1};
      var f = fs.readFileSync(filepath + `${cmd}/${cmd}.txt`, 'utf8')
      util.sendcmdlist(msg, sub, filepath + cmd, config.prefix, `${f} Command `, cmd);
      return;
    };

    // IF SUBCOMMAND COMMAND HELP
    if (fs.existsSync(filepath + cmd + "/" + sub + ".js")) {
      let f = require(`./${cmd}/${sub}.js`)
      var u = Boolean(f.usage) ? f.usage : '';
      var h = Boolean(f.help) ? f.help : '';
      util.sendcmdhelp(msg, `${cmd} ${sub}`, config.prefix, h, u);
      return;
    };
  }
}