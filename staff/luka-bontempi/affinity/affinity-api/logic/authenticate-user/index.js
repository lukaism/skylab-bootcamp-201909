const { validate, errors: { CredentialsError } } = require('affinity-util')
const { models: { User } } = require('affinity-data')
const bcrypt = require('bcryptjs')

module.exports = function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        debugger
        const user = await User.findOne({ username })

        if (!user || !(await bcrypt.compare(password, user.password))) throw new CredentialsError('wrong credentials')

        user.lastAccess = new Date

        await user.save()

        return user.id
    })()
}
