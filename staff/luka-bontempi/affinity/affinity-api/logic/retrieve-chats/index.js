const { ObjectId, models: { Chat, User, Message } } = require('affinity-data')
const { validate, errors: { ContentError, NotFoundError } } = require('affinity-util')

/**
 * retrieves all chats a user is part of.
 * 
 * @param {*userId}  user's id.
 * 
 * @returns chats
 */


module.exports = function(userId) {
    validate.string(userId)
    validate.string.notVoid('userId', userId)
    if (!ObjectId.isValid(userId)) throw new ContentError(`${userId} is not a valid id`)
    return (async() => {
        const user = await User.findById(userId)
        if (!user) throw new NotFoundError(`user with id ${userId} not found`)
        debugger
        const chats = await Chat.find({ "users": { $in: [userId] }}).populate({path:'users',
         model: 'User'})
        const _chats = []
        chats.forEach((chat)=>{
            debugger
            chat.users.forEach((user,index)=>{
                if(user.id===userId){
                    chat.users.splice(index,1)
                }  
            })
            _chats.push(chat)
        })
        if (!chats) throw new NotFoundError(`chat with id ${chatId} not found`)
        return _chats
    })()
}