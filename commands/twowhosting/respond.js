module.exports = {
	name: 'respond',
	description: 'Responds to the prompt.',
	execute(message, args) {
		message.channel.send('Boop.');
	},
};