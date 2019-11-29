const { validate, errors: { ConflictError } } = require('affinity-util')
const { models: { User } } = require('affinity-data')

module.exports = function (name, surname, email, username, genderId, password, birthdate) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(genderId)
    validate.string.notVoid('genderId', genderId)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.object(birthdate)
    


    return (async () => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)

        await User.create({ name, surname, email, username, genderId, password, birthdate })
    })()
}
