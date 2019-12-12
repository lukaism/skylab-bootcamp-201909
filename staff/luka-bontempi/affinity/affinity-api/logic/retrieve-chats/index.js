const { ObjectId, models: { Chat, User, Message } } = require('affinity-data')
const { validate, errors: { ContentError, NotFoundError } } = require('affinity-util')


module.exports = function(userId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)

    return (async() => {
        debugger
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const chats = await Chat.find({ "users": { $in: [userId] }}).populate({path:'users',
         model: 'User'})

        chats.forEach(chat=>{
            const index = chat.users.map((user,index)=>{
                return user.id===userId && index
            })
            chat.users.splice(index,1)
        })

        if (!chats) throw new NotFoundError(`chat with id ${chatId} not found`)
        return chats
    })()

}