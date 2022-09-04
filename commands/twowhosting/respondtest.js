/* eslint-disable semi */
/* eslint-disable indent */
const fs = require('fs');
module.exports = {

    name: 'respondtest',
    description: 'Responds to the prompt. as a test person',
    execute(message) {
        const args = message.content.slice(12).trim().split(/ +/);
        const response = args.join(' ');
        if (response.length > 500) {
            message.channel.send('whoa there buckaroo. i think thats a little too overboard wouldnt you agree')
        } else if (message.content.includes('@everyone') || message.content.includes('@here')) {
            message.channel.send('hey! i haven\'t gotten this command to work in dms yet where this won\'t affect anyone so just please don\'t do it for now')
            message.channel.send('i will still record your response though')
            fs.writeFile('./responses/' + 'test' + String(message.id) + '.tsv', "Username\t" + String(message.author.username) + String(message.id) + '\nResponse\t' + response + '\nID\t' + String(message.id), err => {
                if (err) {
                    console.error(err)
                    return
                }
                // file written successfully
            })
        } else {
            message.channel.send('Your response was recorded as: ' + response);
            fs.writeFile('./responses/' + 'test' + String(message.id) + '.tsv', "Username\t" + String(message.author.username) + String(message.id) + '\nResponse\t' + response + '\nID\t' + String(message.id), err => {
                if (err) {
                    console.error(err)
                    return
                }
                // file written successfully
            })
        }
    },
};