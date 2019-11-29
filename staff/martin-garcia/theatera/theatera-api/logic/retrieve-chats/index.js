const { ObjectId, models: { Chat, User, Message } } = require('theatera-data')
const { validate, errors: { ContentError, NotFoundError } } = require('theatera-util')


module.exports = function(userId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)


    return (async() => {

        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const chats = await Chat.find({ "users": { $in: [userId] } })


        if (!chats) throw new NotFoundError(`chat with id ${chatId} not found`)

        debugger

        return chats


    })()
}