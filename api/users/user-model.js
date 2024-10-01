const db = require('../data/dbConfig')




async function findByEmail(email) {
    const account = await db('User')
        .returning(['email', 'password'])
        .where('email', email)

    return account
}





module.exports = {
    findByEmail
}