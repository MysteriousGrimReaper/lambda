/* eslint-disable semi */
/* eslint-disable indent */
const fs = require('fs');
module.exports = {

    name: 'respond',
    description: 'Responds to the prompt.',
    execute(message) {
        const args = message.content.slice(8).trim().split(/ +/);
        const response = args.join(' ');
        if (response.length > 500) {
            message.channel.send('whoa there buckaroo. i think thats a little too overboard wouldnt you agree')
        } else {
            message.channel.send('Your response was recorded as: ' + response);
            fs.writeFile('./responses/' + String(message.author.id) + '.tsv', String(message.author.username) + '   ' + response, err => {
                if (err) {
                    console.error(err)
                    return
                }
                // file written successfully
            })
        }
    },
};