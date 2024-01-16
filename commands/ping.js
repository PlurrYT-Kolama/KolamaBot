const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping fr, what more do you want")
        .setDMPermission(true)
    ,
    async execute(interaction, client) {
        interaction.reply({content: `Bonjour\n${client.ws.ping}ms`})
    },
    async msgexecute(message, client) {
        message.reply(`Bonjour\n${client.ws.ping}ms`)
    }
};

