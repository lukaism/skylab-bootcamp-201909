const { validate, errors: { NotFoundError, ContentError } } = require('theatera-util')
const { ObjectId, models: { User } } = require('theatera-data')

module.exports = function(userId, postId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    validate.string(postId)
    validate.string.notVoid('postId', postId)
    if (!ObjectId.isValid(postId)) throw new ContentError(`${postId} is not a valid id`)

    return (async() => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)
        const post = user.posts.find(ele => ele.id = postId)
        const { image, name } = user
        const { id, body, date, likes, comments, type } = post
        let introduction = user.introduction.slice(0, 20) + '...'
        const result = { user: { image, introduction, name }, post: { id, body, date, likes, comments, type } }
        return result

    })()
}