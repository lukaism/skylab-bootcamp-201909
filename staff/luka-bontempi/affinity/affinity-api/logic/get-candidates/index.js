const { validate, errors: { NotFoundError, ContentError } } = require('affinity-util')
const { ObjectId, models: { User } } = require('affinity-data')

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        const { location } = user.toObject() 
        const { radius } = user.toObject()
        const candidates = await User.find({location: {$nearSphere: { $geometry: { type: "point", coordinates: location},$maxDistance: radius}}} ).lean()

        candidates.forEach(candidate => {
            task.id = candidate._id.toString()
            delete candidate._id

            candidate.user = id
        })
        user.candidates = candidates
        user.lastAccess = new Date

        await user.save()
    })()
}
