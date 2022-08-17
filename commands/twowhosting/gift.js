module.exports = {
	name: 'gift',
	description: 'Gift another player an item of yours.',
	execute(message) {
    const n_args = message.content.split(',')
    if (message.content.includes("@everyone") || message.content.includes("@here")) {

            message.channel.send(`The sun is a deadly lazer. *One of ${message.author}'s items have been burned.*`)
          }
    else if (n_args[1] && message.mentions.members.size) {
      if (message.mentions.members.first().id == 801656846926348329) {
        message.channel.send(`Aww, thank you for sending me a **${n_args[1].replace(/\s+/g, ' ').trim()}** ❤️`)
      }
        else if (message.author.id == message.mentions.members.first().id) {
          message.channel.send(`Hey, you can't just send yourself a ${n_args[1].replace(/\s+/g, ' ').trim()}! That's against the rules.`)
        }
          
      else {
		message.channel.send(`${n_args[0].split(' ')[1].replace(/\s+/g, ' ').trim()}, ${message.author} just sent you a **${n_args[1].replace(/\s+/g, ' ').trim()}**!`);
      }
    }
    else {
      message.channel.send(`oopsie! looks like *someone* forgot to specify either a (valid) user or an item to send! (make sure that you split the recipient and the item by a comma!)`)
    }
	},
};