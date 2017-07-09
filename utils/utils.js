const fs 	= require('fs'),
      path  = require('path');

module.exports = {
    sendcmdhelp: (msg, cmd, prefix, help, usage, user) => {
        usage = usage || '';
        user.send(`\`\`\`md\n# ${cmd}\n\t> ${help}\n\t> ${prefix}${cmd} ${usage}\`\`\``);
    },

    listcmd: (page, path) => {
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
            commands[cmd] = require(`${path}/${cmd}.js`).help != undefined ? require(`${path}/${cmd}.js`).help: '';
        });
        folders.forEach(folder => {
            commands[folder] = fs.readFileSync(`${path}/${folder}/${folder}.txt`, 'utf8') + ' commands group.';
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
        user.send(`${h}Help List: Page ${page}\n===============================================================================\n${module.exports.listcmd(page, path)}\n"${prefix}help ${sub} <Command>" to show how to use the command.\n"${prefix}help ${sub} <Number> to go to a page."`, {code: 'md'});
    }
};