const { validate, errors: { NotFoundError, ContentError } } = require('affinity-util')
const { ObjectId, models: { User } } = require('affinity-data')

module.exports = function (id1,id2) {
    validate.string(id1)
    validate.string.notVoid('id1', id1)
    if (!ObjectId.isValid(id1)) throw new ContentError(`${id1} is not a valid id`)
    validate.string(id2)
    validate.string.notVoid('id2', id2)
    if (!ObjectId.isValid(id2)) throw new ContentError(`${id2} is not a valid id`)

    return (async () => {
        const user = await User.findById(id1)
        const rejectedcandidate = await User.findById(id2)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        if (!rejectedcandidate) throw new NotFoundError(`user with id ${id} not found`)

        user.rejected.push(id2)
        user.lastAccess = new Date
        

        await user.save()
        return user
    })()
}
