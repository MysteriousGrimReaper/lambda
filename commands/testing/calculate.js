module.exports = {
	name: 'calculate',
	description: 'calculate!',
	execute(message, args) {
	const mode = "m";
  switch(args[1]) {
    case '+': mode = "a"
    break;
    case '-': mode = "s"
    break;
    case '*': mode = "m"
    break;
    case '/': mode = "d"
    break;
    case '^': mode = "e"
    break;
  }
  message.channel.send("this command doesn't work yet lol");
	},
};