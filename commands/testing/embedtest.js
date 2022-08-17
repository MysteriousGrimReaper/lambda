const Discord = require('discord.js');

module.exports = {
	name: 'embedtest',
	description: 'test!',
	execute(message, args) {
		const exampleEmbed = new Discord.MessageEmbed().setTitle('Some title');

if (message.author.bot) {
	exampleEmbed.setColor('#7289da');
}

message.channel.send(exampleEmbed);
	},
};