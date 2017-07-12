const fs 	= require('fs'),
      path  = require('path'),
      config = require('../config.json');

// https://stackoverflow.com/questions/6394951/read-nth-line-of-file-in-nodejs
function get_line(filename, line_no) {
    var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split("\n");

    if(+line_no > lines.length){
      return undefined;
    }

    return lines[+line_no];
}

module.exports = {
    sendcmdhelp: (msg, cmd, prefix, help, usage, user) => {
        usage = usage || '';
        user.send(`\`\`\`md\n# ${cmd}\n\t> ${help}\n\t> ${prefix}${cmd} ${usage}\`\`\``);
    },

    listcmd: (page, path, user) => {
        var commands = [];
        var list     = [];
        var files    = fs.readdirSync(path).filter(obj => {
            return fs.lstatSync(`${path}/${obj}`).isFile();
        });
        files = files.filter(obj => {
            return obj.endsWith('.js');
        });
        var folders  = fs.readdirSync(path).filter(obj => {
            return fs.lstatSync(`${path}/${obj}`).isDirectory();
        });
        files.forEach(file => {
            var cmd = file.split('.')[0];
            if (!require(`${path}/${cmd}.js`).ownerOnly && user.id != config.ownerID || user.id == config.ownerID)
                commands[cmd] = require(`${path}/${cmd}.js`).help != undefined ? require(`${path}/${cmd}.js`).help: '';
        });
        folders.forEach(folder => {
            if (get_line(`${path}/${folder}/${folder}.txt`, 1) != 'true' && user.id != config.ownerID || user.id == config.ownerID)
                commands[folder] = get_line(`${path}/${folder}/${folder}.txt`, 0) + ' commands group.';
        });
        for(var prop in commands) {
            list.push(`* ${prop}\n\t> ${commands[prop]}`);
        };
        page = page - 1;
        var out = list.sort().splice(page * 5, 5).join('\n');
        var endText = out.length > 0 ? out : "* You have reached the end of the list.\n";
        return endText;
    },

    SaveFile: (file, append) => {
        fs.writeFile(file, JSON.stringify(append), (err) => {
            if (err) { log.error(err.stack) }
        })
    },

    sendcmdlist: (msg, page, path, prefix, h = '', sub = '', user) => {
        //msg.channel.send(`${h}Help List: Page ${page}\n===============================================================================\n${module.exports.listcmd(page, path)}\n"${prefix}help ${sub} <Command|Page>" to show how to use the command or scroll to next page.`, {code: 'md'});
        user.send(`${h}Help List: Page ${page}\n===============================================================================\n${module.exports.listcmd(page, path, user)}\n"${prefix}help ${sub} <Command>" to show how to use the command.\n"${prefix}help ${sub} <Number> to go to a page."`, {code: 'md'});
    }
};