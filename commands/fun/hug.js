module.exports = {
	name: 'hug',
	description: 'Give a hug!',
	execute(message, args) {
    if (!args.length) {
		message.channel.send({
  files: ['https://media.discordapp.net/attachments/797233762176860171/837169632644562964/image0.gif']
});
    }
    else {
      message.channel.send(`*hugs ${args[0]}*`)
      message.channel.send({
  files: ['https://media.discordapp.net/attachments/797233762176860171/837169632644562964/image0.gif']
});
    }
	},
};