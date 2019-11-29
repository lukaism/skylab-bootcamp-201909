const { validate, errors: { ConflictError, NotFoundError } } = require('affinity-util')
const { ObjectId, models: { User } } = require('affinity-data')

module.exports = function (id, name, surname, genderId, geometric, description, birthdate) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw  ContentError(`${id} is not a valid id`)

    if (name) {
        validate.string(name)
        validate.string.notVoid('name', name)
    }
    if (surname) {
        validate.string(surname)
        validate.string.notVoid('surname', surname)
    }
    if (genderId) {
        validate.string(genderId)
        validate.string.notVoid('genderId', genderId)
    }
    if (geometric) {
        validate.array(geometric)
        
    }
    if (description) {
        validate.string(description)
        validate.string.notVoid('description', description)
    }
    if (birthdate) {
        validate.object(birthdate)
    }

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw  NotFoundError(`user with id ${id} not found`)

        const update = {}

        name && (update.name = name)
        surname && (update.surname = surname)
        genderId && (update.genderId = genderId)
        geometric && (update.geometric = geometric)
        description && (update.description = description)
        birthdate && (update.birthdate = birthdate)
        update.lastAccess =  new Date

        await User.updateOne({ _id: ObjectId(id) }, { $set: update })
    })()
}
