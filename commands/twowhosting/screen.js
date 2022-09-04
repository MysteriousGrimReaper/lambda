/* eslint-disable no-inline-comments */
/* eslint-disable no-empty */
/* eslint-disable semi */
/* eslint-disable indent */
const fs = require('fs');
const { round } = require('C:/Users/A/Documents/GitHub/lambda/config.json');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
module.exports = {

    name: 'screen',
    description: 'Generates a voting screen.',
    execute(message, args) {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvw'

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


                // voting part
                async function vote_generate() {
                    const dataArray = data.split('\n')[1].split('\t').slice(2);
                    shuffleArray(dataArray)
                    console.log(dataArray);
                    message.channel.send('yay! the responses file exists - generating screen... (does not actually generate screen rn. :troll:)')
                    const num_factors = [] // number of factors
                    for (let i = 1; i <= dataArray.length; i++) {
                        if (dataArray.length % i == 0) {
                            num_factors.push(i)
                        }
                    }
                    const rows = num_factors[Math.floor(num_factors.length / 2)]
                    const columns = num_factors[Math.ceil((num_factors.length / 2) - 1)]
                    let vote_matrix = new Array(rows).fill(0).map(() => new Array(columns).fill(0));
                    for (let i = 0; i < rows; i++) {
                        for (let j = 0; j < columns; j++) {
                            vote_matrix[i][j] = dataArray[(3 * i) + j]
                        }
                    }
                    if (!(await db.has(String(message.author.id) + '.screens'))) {
                        await db.set(String(message.author.id), { screens: vote_matrix })
                        let message_to_send = 'Your voting screens: \n```'
                        for (let i = 0; i < rows; i++) {
                            for (let j = 0; j < columns; j++) {
                                message_to_send += '\n'
                                message_to_send += String.fromCharCode(65 + j)
                                message_to_send += vote_matrix[i][j]
                            }
                            message_to_send += '``` ```'
                        }
                        message_to_send += '```'

                        message.author.send(message_to_send)
                    } else {
                        vote_matrix = await db.get(String(message.author.id) + '.screens')
                        console.log(vote_matrix)
                        let message_to_send = 'Your voting screens: \n```'
                        for (let i = 0; i < rows; i++) {
                            for (let j = 0; j < columns; j++) {
                                message_to_send += '\n'
                                message_to_send += String.fromCharCode(65 + j) + ': '
                                message_to_send += vote_matrix[i][j]
                            }
                            if (i == rows - 1) {
                                continue
                            }
                            message_to_send += '``` ```'
                        }
                        message_to_send += '```'

                        message.author.send(message_to_send)
                    }
                }
                vote_generate()


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