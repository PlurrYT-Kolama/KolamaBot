const { SlashCommandBuilder } = require(`discord.js`);
const { updatejson, checkjson, checkrole } = require('../jsonupdate.js'); //adjust path correctly
let object = require('../times.json')
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("limit")
        .setDescription("Check your commands limit")
        .setDMPermission(true)
    ,
    async execute(interaction, client) {
        if (client.ticketManager.tickets.get(interaction.channel.id))
            var checkresult = await checkrole(interaction.member.roles.highest.id);
            if (checkresult == true) {// check for staff YAY
                interaction.reply({content: `Closing ticket using staff access..`})
                const channel = interaction.channel; // or however you get your TextChannel
                const attachment = await discordTranscripts.createTranscript(channel);
                const channel2 = await client.channels.fetch('1104136422304272524');
                channel2.send({
                  files: [attachment],
                });
                const ticket = client.ticketManager.tickets.get(interaction.channel.id);
                await client.ticketManager.closeTicket(ticket);
            } else {
                interaction.reply({content: `Please ping any avaliable staff from Trust & Safety Departament To help you close ticket!`})
            }
        }
    },
};
