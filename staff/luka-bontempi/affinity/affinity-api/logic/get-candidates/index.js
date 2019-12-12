const { validate, errors: { NotFoundError, ContentError } } = require('affinity-util')
const { ObjectId, models: { User } } = require('affinity-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)
        debugger

        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        const { location: { coordinates }, radius } = user
        const candidates = await User.find({ _id: { $nin: id }, location: { $nearSphere: { $geometry: { type: "Point", coordinates: coordinates }, $maxDistance: radius * 1000 } } })

        let candodotes = []
        candidates.forEach(candidate => {
            candidate.id = candidate._id.toString()
            delete candidate._id
            const { id, name, surname, email, username, genderId, description, geometric, password, birthdate, location: { coordinates }, radius } = candidate
            candidate = { id, name, surname, email, username, genderId, description, geometric, password, birthdate, location: { type: "Point", coordinates: coordinates }, radius }
            candodotes.push(candidate)
        }
       )

    user.lastAccess = new Date

    await user.save()

    return candodotes
}) ()
}
