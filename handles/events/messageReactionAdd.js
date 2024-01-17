module.exports = {
    name: 'messageReactionAdd',
    async execute(reaction, user) {

        if (user.partial) {
            try {
                await user.fetch();
            }
            catch (error) {
                console.error('Erreur en récupérant le user : ', error);
                return;
            }
            console.log(user.roles);
        }
    },
};
