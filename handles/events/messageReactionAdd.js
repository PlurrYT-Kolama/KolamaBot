module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(reaction, user)  {
        try {
            const message = !reaction.message.partial ? reaction.message : await reaction.message.fetch();
            const memberId = await reaction.message.guild.members.fetch(user.id);
            const guildId = reaction.message.guild.id;
            if(reaction.message.id === '1197237806486011926'){
                console.log(reaction._emoji.name);
                if(reaction._emoji.name === ':support:'){
                    await client.ticketManager.createTicket(guildId, memberId);
                }
            }
        } catch (error) {
            console.error('Something went wrong when fetching the message: ', error);
        }
    }
};
