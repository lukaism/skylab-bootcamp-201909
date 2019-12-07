const { validate, errors: { ConflictError, NotFoundError } } = require('affinity-util')
const { ObjectId, models: { User } } = require('affinity-data')

module.exports = function (id, name, surname, genderId, geometric, description, day, month, year, radius) {
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
    if (day) {
        validate.string(day)
        validate.string.notVoid('day', day)
    }
    if (month) {
        validate.string(day)
        validate.string.notVoid('month', month)
    }
    if (year) {
        validate.string(year)
        validate.string.notVoid('year', year)
    }
    if (radius) {
        validate.number(radius)

    }

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw  NotFoundError(`user with id ${id} not found`)
        debugger
        const update = {}
        

        
        
        
        name && (update.name = name)
        surname && (update.surname = surname)
        genderId && (update.genderId = genderId)
        geometric && (update.geometric = geometric)
        description && (update.description = description)
        // birthdate && (update.birthdate = birthdate)
        day && month && year &&  (update.birthdate = new Date(year, month-1, day))
        radius && (update.radius = radius)
        update.lastAccess =  new Date

        await User.updateOne({ _id: ObjectId(id) }, { $set: update })
        
        // const { name, surname, email, username, lastAccess, genderId, description, geometric, birthdate } = user.toObject()

        // return { id, name, surname, email, username, genderId, description, lastAccess, geometric, birthdate }

    })()
}
