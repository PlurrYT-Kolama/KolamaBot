const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const upd = require('../config.json').updatecommands;
require('dotenv').config()

const clientId = '1098341584191365220';

if (client.test) {
    clientId = '1196909255723327599';
}

module.exports = (client) => {
    client.handleCommands = async (commandFiles) => {
        client.commandArray = [];
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            client.commands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
        }
        if (upd === '1' || upd === '2') {
            if (upd === '1') {
                console.log('Auto update commands is enabled');
            } else if (upd === '2') {
                console.log('Single time update commands is enabled');
                const te = fs.readFileSync('./config.json');
                const js = JSON.parse(te);
                js.updatecommands = '0';
                const stuf = JSON.stringify(js, null, 2);
                fs.writeFileSync('./config.json', stuf);
            }
            const rest = new REST({ version: '9' }).setToken(process.env.token);
            (async () => {
                try {
                    await rest.put(
                        Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    },
                    );
                    console.log('Successfully pushed slash commands.')
                } catch (err) {
                    console.error(err);
                }
            })();
        }
        else { console.log('Auto update commands is disabled') }
    };
};
