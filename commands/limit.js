const { SlashCommandBuilder } = require(`discord.js`);
const { updatejson, checkjson, checkrole } = require('../jsonupdate.js'); //adjust path correctly
let object = require('../times.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("limit")
        .setDescription("Check your commands limit")
        .setDMPermission(true)
    ,
    async execute(interaction, client) {
        let checkresult = await checkrole(interaction.member.roles.highest.id)
        if (checkresult == true) {// check for staff YAY
            if (!object[interaction.user.id]) {
                const a = require('../config.json').rolecooldown[interaction.member.roles.highest.id];
                object[interaction.user.id] = {
                    "bansused": a.bansperday,
                    "kicksused": a.kicksperday,
                    "timeoutsused": a.timeoutsperday,
                    "unbansused": a.unbansperday
                }
            }
            interaction.reply({content: `
            Your limits:
            Ban: ${object[interaction.user.id].bansused} left
            Kick: ${object[interaction.user.id].kicksused} left
            Timeout: ${object[interaction.user.id].timeoutsused} left
            UnBan: ${object[interaction.user.id].unbansused} left
            UnTimeout: Non Limited (for everyone from staff)\nLimit's resetting each 24hours after bot startup
            `})
        } else {
            interaction.reply({content: `You dont have any staff role or permission role!`})
        }
    },
};

