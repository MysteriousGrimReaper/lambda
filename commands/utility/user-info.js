module.exports = {
	name: 'user-info',
	description: 'See your user information!',
	execute(message, args) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};