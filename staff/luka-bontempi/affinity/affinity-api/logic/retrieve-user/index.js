const { validate, errors: { NotFoundError, ContentError } } = require('affinity-util')
const { ObjectId, models: { User } } = require('affinity-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        user.lastAccess = new Date

        await user.save()


        const { name, surname, email, username, lastAccess, genderId, description, geometric, birthdate, rejected, aproved, connections } = user.toObject()
        return { id, name, surname, email, username, genderId, description, lastAccess, geometric, birthdate, rejected, aproved, connections }

    })()
}
