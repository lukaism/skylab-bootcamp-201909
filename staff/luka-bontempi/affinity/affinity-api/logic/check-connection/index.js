const { validate, errors: { NotFoundError, ContentError } } = require('affinity-util')
const { ObjectId, models: { User, Chat } } = require('affinity-data')
const createChat = require('../create-chat')

module.exports = function (id1,id2) {
    validate.string(id1)
    validate.string.notVoid('id1', id1)
    if (!ObjectId.isValid(id1)) throw new ContentError(`${id1} is not a valid id`)
    validate.string(id2)
    validate.string.notVoid('id2', id2)
    if (!ObjectId.isValid(id2)) throw new ContentError(`${id2} is not a valid id`)

    return (async () => {
        const user = await User.findById(id1)
        const possibleconnection = await User.findById(id2)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)
        if (!possibleconnection) throw new NotFoundError(`user with id ${id} not found`)
        if (possibleconnection.aproved.includes(id1)){
            user.connections.push(id2)
            user.lastAccess = new Date
            possibleconnection.connections.push(id1)
            possibleconnection.lastAccess = new Date
            await createChat(id1, id2)
    
            await user.save()
            await possibleconnection.save()
        }
        

    })()
}
