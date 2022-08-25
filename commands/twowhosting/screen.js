/* eslint-disable no-empty */
/* eslint-disable semi */
/* eslint-disable indent */
const fs = require('fs');
module.exports = {

    name: 'screen',
    description: 'Generates a voting screen.',
    execute(message, args) {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        if (fs.existsSync('responses.tsv')) {

            fs.readFile('responses.tsv', 'utf8', function(err, data) {
                const dataArray = data.split('\n')[1].split('\t').slice(2);
                shuffleArray(dataArray)
                console.log(dataArray);
                message.channel.send('yay! the responses file exists - generating screen... (does not actually generate screen rn. :troll:)')
                let num_factors = [] // number of factors
                for (let i = 1; i <= dataArray.length; i++) {
                    if (dataArray.length % i == 0) {
                        num_factors.push(i)
                    }
                }
                console.log(num_factors)
                    /* const screen_name = String(message.author.username) + getRandomInt(9999)
                    let vote_screen = screen_name
                    dataArray.forEach((item, index) => vote_screen += '\n' + String.fromCharCode(65 + index) + '\t' + item)
                    let vote_screen_message = '```\n' + vote_screen
                    vote_screen_message += '```'
                    fs.writeFile('./votescreens/' + String(message.author.id) + screen_name + '.tsv', vote_screen, err => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        // file written successfully
                    })
                    message.channel.send(vote_screen_message)*/
            });
        } else {
            message.channel.send('does not exist :pensive:')
        }
    },
};