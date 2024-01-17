const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, WebhookClient, Events, AuditLogEvent, Guild, InteractionType, ActivityType, Options } = require(`discord.js`);
require('dotenv').config();
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions] });
const config = require('./config.json');
client.prefix = config.prefix;
client.limits = {}
if (process.env.test) {
    client.test = true
}
client.guilds.fetch('1093888852546043914') // Fetch the guild by ID
  .then(guild => {
    guild.channels.fetch('channel_id') // Replace 'channel_id' with your channel ID
      .then(channel => {
        channel.messages.fetch('1197237806486011926') // Fetch the message by ID
          .then(message => {
            client.ticketcache = message;
          })
          .catch(console.error); // Log any errors while fetching the message
      })
      .catch(console.error); // Log any errors while fetching the channel
  })
  .catch(console.error); // Log any errors while fetching the guildclient.commands = new Collection()
const events = fs.readdirSync('./handles/events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

(async () => {
    require('./handles/handleEvents.js')(client);
    require('./handles/handleCommands.js')(client);
    client.handleCommands(commandFiles);
    client.events(events);
    client.login(process.env.token);
})();
