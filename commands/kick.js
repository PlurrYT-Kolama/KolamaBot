const { PermissionsBitField, SlashCommandBuilder } = require(`discord.js`);
const { updatejson, checkjson, checkrole } = require('../jsonupdate.js'); //adjust path correctly


const time = 1 * 1000 * 60

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kicks a member")
        .addUserOption(option => option.setName('user').setDescription('The user to kick').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for kicking someone.').setRequired(false))
        .setDMPermission(false)
    ,
    async execute(interaction, client) {
        await interaction.deferReply();
        const user = interaction.options.getUser('user')
        const member = await interaction.guild.members.fetch(user.id);
        if (!member.kickable) return interaction.editReply({ content: `I cannot kick this user`, ephemeral: true });
        const reason = `${interaction.options.getString('reason') || 'No reason given'} | Kicked by ${interaction.user.username}`
        let checkresult = await checkrole(interaction.member.roles.highest.id)
        if (checkresult == true) {// check for staff YAY
            if (client.limits[`${interaction.user.id}`] < Date.now()) delete client.limits[`${interaction.user.id}`];
            if (Object.keys(client.limits).includes(interaction.user.id)) return interaction.editReply(`You have already kicked/banned/timeouted someone recently. You can use this again in <t:${Math.round(client.limits[`${interaction.user.id}`] / 1000)}:R>`);
            if (interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.editReply('You do not have permission to ban this person');
            let result = await checkjson(interaction.user.id, 'kick', interaction.member.roles.highest.id);
            if (result == true) {return interaction.editReply('You used your "Highest Staff Role" limit for kick usage');}
            try {
                await updatejson(interaction.user.id, 'kick', interaction.member.roles.highest.id, client, member, reason)
                await member.kick({ reason });
                interaction.editReply(`Kicked <@${user.id}>\nReason: ${reason}`);
                client.limits[`${interaction.user.id}`] = Date.now() + time;
            } catch (err) {
                interaction.editReply(`There was an error:n ${err}`);
            }
        } else {
            interaction.editReply('You do not have permission to run this command');
        }
    },

};

