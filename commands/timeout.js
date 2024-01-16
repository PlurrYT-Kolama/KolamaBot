const { PermissionsBitField, SlashCommandBuilder } = require(`discord.js`);
const { updatejson, checkjson, checkrole } = require('../jsonupdate.js'); //adjust path correctly


const time = 1 * 1000 * 60

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Timeouts a member")
        .addUserOption(option => option.setName('user').setDescription('The user to timeout').setRequired(true))
        .addIntegerOption(option => option.setName('time').setDescription('Time in minutes.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for time outing someone.').setRequired(false))
        .setDMPermission(false)
    ,
    async execute(interaction, client) {
        await interaction.deferReply();
        const user = interaction.options.getUser('user')
        const member = await interaction.guild.members.fetch(user.id);
        if (!member.manageable) return interaction.editReply({ content: `I cannot timeout this user`, ephemeral: true });
        const reason = `${interaction.options.getString('reason') || 'No reason given'} | Timeouted by ${interaction.user.username}`
        const timeouttime = interaction.options.getInteger('time')
        let checkresult = await checkrole(interaction.member.roles.highest.id)
        if (checkresult == true) {// check for staff YAY
            if (client.limits[`${interaction.user.id}`] < Date.now()) delete client.limits[`${interaction.user.id}`];
            if (Object.keys(client.limits).includes(interaction.user.id)) return interaction.editReply(`You have already kicked/banned/timeouted someone recently. You can use this again in <t:${Math.round(client.limits[`${interaction.user.id}`] / 1000)}:R>`);
            if (interaction.member.roles.highest.position <= member.roles.highest.position) return interaction.editReply('You do not have permission to timeout this person');
            let result = await checkjson(interaction.user.id, 'timeout', interaction.member.roles.highest.id);
            if (result == true) { return interaction.editReply('You used your "Highest Staff Role" limit for timeout usage'); }
            try {
                await member.timeout(timeouttime * 60000, { reason })
                await updatejson(interaction.user.id, 'timeout', interaction.member.roles.highest.id, client, member, reason, timeouttime*60000)
                interaction.editReply(`Timeouted <@${user.id}> for ${timeouttime} minutes!\nReason: ${reason}`);
                client.limits[`${interaction.user.id}`] = Date.now() + time;
            } catch (err) {
                interaction.editReply(`There was an error:n ${err}`);
            }
        } else {
            interaction.editReply('You do not have permission to run this command');
        }
    },

};

