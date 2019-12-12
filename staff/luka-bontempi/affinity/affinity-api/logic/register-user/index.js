const { validate, errors: { ConflictError } } = require('affinity-util')
const { models: { User } } = require('affinity-data')
const bcrypt = require('bcryptjs')

module.exports = function (name, surname, email, username, genderId, password, day, month, year) { debugger
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
    validate.string(day)
    validate.string.notVoid('day', day)
    validate.string(month)
    validate.string.notVoid('month', month)
    validate.string(year)
    validate.string.notVoid('year', year)
    
    return (async () => {
        const user = await User.findOne({ username })

        if (user) throw new ConflictError(`user with username ${username} already exists`)
        
        const birthdate = new Date(year, month-1, day)

        const hash = await bcrypt.hash(password, 10)

        await User.create({ name, surname, email, username, genderId, password: hash, birthdate })
        debugger
    })()
}
