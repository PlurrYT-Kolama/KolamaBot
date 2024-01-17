const { PermissionsBitField, SlashCommandBuilder } = require(`discord.js`);
const { updatejson, checkjson, checkrole } = require('../jsonupdate.js'); //adjust path correctly

const time = 1 * 1000 * 60

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bans a member using User ID")
        .addStringOption(option => option.setName('user').setDescription('The User ID to ban').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason for banning someone.').setRequired(false))
        .setDMPermission(false)
    ,
    async execute(interaction, client) {
        await interaction.deferReply();
        const user = await interaction.options.getString('user');
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (interaction.guild.members.cache.some(x => x.id == user)) {
          if (!user.bannable) return interaction.editReply({ content: `I cannot ban this user`, ephemeral: true });
        };
        const reason = `${interaction.options.getString('reason') || 'No reason given'} | Banned by ${interaction.user.username}`
        let checkresult = await checkrole(interaction.member.roles.highest.id)
        if (checkresult == true) {// check for staff YAY
            if (client.limits[`${interaction.user.id}`] < Date.now()) delete client.limits[`${interaction.user.id}`];
            if (Object.keys(client.limits).includes(interaction.user.id)) return interaction.editReply(`You have already kicked/banned/timeouted someone recently. You can use this again in <t:${Math.round(client.limits[`${interaction.user.id}`] / 1000)}:R>`);
            if (interaction.guild.members.cache.some(x => x.id == user)) {
                if (interaction.member.roles.highest.position <= user.roles.highest.position) return interaction.editReply('You do not have permission to ban this person');
            };
            let result = await checkjson(interaction.user.id, 'ban', interaction.member.roles.highest.id);
            if (result == true) { return interaction.editReply('You used your "Highest Staff Role" limit for ban usage'); }
            try {
                const user_fetched = await client.user.fetch()
                await updatejson(interaction.user.id, 'ban', interaction.member.roles.highest.id, client, user, reason)
                await user.ban({ reason });
                interaction.editReply(`Banned <@${user}>\nReason: ${reason}`);
                client.limits[`${interaction.user.id}`] = Date.now() + time;
            } catch (err) {
                interaction.editReply(`There was an error:n ${err}`);
            }
        } else {
            interaction.editReply('You do not have permission to run this command');
        }
    },
    /* async msgexecute(message, client) {
        const user = message.mentions.users.first()
        if (!user) return message.reply('You need to mention a user to ban.');
        const member = await message.guild.members.fetch(user.id);
        if (!member.bannable) return message.reply(`I cannot ban this user`);
        let a = message.content.replace(`${client.prefix}ban ${message.content.split(' ')[1]}`, '')
        if (a != '') {
            a = a.split(' ');
            a.shift();
            a = a.join(' ')
        } else { a = 'No reason given' }
        const reason = `${a} | Banned by ${message.author.username}`
        //if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers) || message.author.id != '640579687822917649') {
        //    await member.ban({ reason });
         //   message.reply(`Banned <@${user.id}>`);
        //} else 
        if (message.member.roles.cache.some(role => role.id === '1096386858281349121')) {
            if (client.limits[`${message.author.id}`] < Date.now()) delete client.limits[`${message.user.id}`];
            if (Object.keys(client.limits).includes(message.user.id)) return message.reply(`You have already kicked/banned someone recently. You can use this again in <t:${Math.round(client.limits[`${message.author.id}`] / 1000)}:R>`);
            if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply('You do not have permission to ban this person');
            if (checkjson(message.author.id, 'ban', message.member.roles.highest.id) == 0) return message.reply('You used your "Highest Staff Role" limit for ban usage');
            try {
                await updatejson(message.author.id, 'ban', message.member.roles.highest.id)
                await member.ban({ reason });
                message.reply(`Banned <@${user.id}>`);
                client.limits[`${message.user.id}`] = Date.now() + time;
            } catch (err) {
                message.reply(`There was an error:n ${err}`);
            }

        } else {
            message.reply('You do not have permission to run this command');
        }
    }*/
};

