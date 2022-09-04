const { QuickDB } = require('quick.db');
const db = new QuickDB();
module.exports = {
    name: 'getscreen',
    description: 'Generates a voting screen.',
    async execute(message) {
        if (await db.has(String(message.author.id) + '.screens')) {
            const vote_matrix = await db.get(String(message.author.id) + '.screens')
            let message_to_send = 'Your voting screens: \n```'
            for (let i = 0; i < vote_matrix.length; i++) {
                for (let j = 0; j < vote_matrix[0].length; j++) {
                    message_to_send += '\n'
                    message_to_send += vote_matrix[i][j]
                }
            }
            message_to_send += '```'
            message.author.send(message_to_send)
        }
    }
}