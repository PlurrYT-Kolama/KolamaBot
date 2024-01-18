const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, WebhookClient, Events, AuditLogEvent, Guild, InteractionType, ActivityType, Options } = require(`discord.js`);
require('dotenv').config();
const fs = require('fs');
//const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions] });
const client = new Client({
    intents: Object.keys(GatewayIntentBits).map((a)=>{
        return GatewayIntentBits[a]
    }),
});
const config = require('./config.json');
client.prefix = config.prefix;
client.limits = {}
if (process.env.test) {
    client.test = true
}
client.commands = new Collection()

const events = fs.readdirSync('./handles/events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

(async () => {
    require('./handles/handleEvents.js')(client);
    require('./handles/handleCommands.js')(client);
    client.handleCommands(commandFiles);
    client.events(events);
    client.login(process.env.token);
})();
