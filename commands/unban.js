const { PermissionsBitField, SlashCommandBuilder } = require(`discord.js`);
const { updatejson, checkjson, checkrole } = require('../jsonupdate.js'); //adjust path correctly


const time = 1 * 1000 * 60

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("UnBan a member")
        .addStringOption(option => option.setName('userid').setDescription('Id of the user you want to unban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for time unbanning someone.').setRequired(false))
        .setDMPermission(false)
    ,
    async execute(interaction, client) {
        await interaction.deferReply();
        const user = await interaction.options.getString('userid');
        const member = await interaction.guild.members.fetch(interaction.user.id)
        const reason = `${interaction.options.getString('reason') || 'No reason given'} | Unbanned by ${interaction.user.username}`
        let checkresult = await checkrole(interaction.member.roles.highest.id)
        if (checkresult == true) {// check for staff YAY
            if (client.limits[`${interaction.user.id}`] < Date.now()) delete client.limits[`${interaction.user.id}`];
            if (Object.keys(client.limits).includes(interaction.user.id)) return interaction.editReply(`You have already kicked/banned/timeouted someone recently. You can use this again in <t:${Math.round(client.limits[`${interaction.user.id}`] / 1000)}:R>`);
            let result = await checkjson(interaction.user.id, 'unban', interaction.member.roles.highest.id);
            if (result == true) { return interaction.editReply('You used your "Highest Staff Role" limit for unban usage'); }
            const user_fetched = await client.user.fetch()
            try {
                //await updatejson(interaction.user.id, 'unban', interaction.member.roles.highest.id, client, member, reason)
                //await interaction.guild.members.unban(user)//,{ reason })
                //interaction.editReply(`Removed ban for <@${user.id}>\nReason: ${reason}`);
                //client.limits[`${interaction.user.id}`] = Date.now() + time;
                await interaction.guild.members.unban(user)
                await updatejson(interaction.user.id, 'unban', interaction.member.roles.highest.id, client, member, reason)
                client.limits[`${interaction.user.id}`] = Date.now() + time;
                interaction.editReply(`Removed ban for <@${user}>\nReason: ${reason}`);
            } catch (err) {
                interaction.editReply(`There was an error:n ${err}`);
            }
        } else {
            interaction.editReply('You do not have permission to run this command');
        }
    },
};

