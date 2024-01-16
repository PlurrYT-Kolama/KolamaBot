const { PermissionsBitField, SlashCommandBuilder } = require(`discord.js`);
const { updatejson, checkjson, checkrole } = require('../jsonupdate.js'); //adjust path correctly


const time = 1 * 1000 * 60

module.exports = {
    data: new SlashCommandBuilder()
        .setName("untimeout")
        .setDescription("UnTimeouts a member")
        .addUserOption(option => option.setName('user').setDescription('The user to timeout').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for time outing someone.').setRequired(false))
        .setDMPermission(false)
    ,
    async execute(interaction, client) {
        await interaction.deferReply();
        const user = interaction.options.getUser('user')
        const member = await interaction.guild.members.fetch(user.id);
        if (!member.manageable) return interaction.editReply({ content: `I cannot untimeout this user`, ephemeral: true });
        const reason = `${interaction.options.getString('reason') || 'No reason given'} | UnTimedout by ${interaction.user.username}`
        let checkresult = await checkrole(interaction.member.roles.highest.id)
        if (checkresult == true) {// check for staff YAY
            if (client.limits[`${interaction.user.id}`] < Date.now()) delete client.limits[`${interaction.user.id}`];
            if (Object.keys(client.limits).includes(interaction.user.id)) return interaction.editReply(`You have already kicked/banned/timeouted someone recently. You can use this again in <t:${Math.round(client.limits[`${interaction.user.id}`] / 1000)}:R>`);
            if (interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.editReply('You do not have permission to untimeout this person');
            try {
                await member.timeout(10, { reason })
                interaction.editReply(`Removed timeout for <@${user.id}>\nReason: ${reason}`);
                client.limits[`${interaction.user.id}`] = Date.now() + time;
            } catch (err) {
                interaction.editReply(`There was an error:n ${err}`);
            }
        } else {
            interaction.editReply('You do not have permission to run this command');
        }
    },

};

