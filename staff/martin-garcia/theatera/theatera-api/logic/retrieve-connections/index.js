const { validate, errors: { NotFoundError } } = require('theatera-util')
const { ObjectId, models: { User } } = require('theatera-data')

module.exports = function(userId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    return (async() => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)


        const result = Promise.all(user.connections.map(async con => {
            const friendId = con._id.toString()
            const friend = await User.findById(friendId)
                /* let introduction = friend.introduction.slice(0, 20) + '...' */
            const { image, name, id } = friend
            return { id, name, image }
        }))

        return result
    })()

}