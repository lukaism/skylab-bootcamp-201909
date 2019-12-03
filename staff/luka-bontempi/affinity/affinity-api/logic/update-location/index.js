const { validate, errors: { ConflictError, NotFoundError } } = require('affinity-util')
const { ObjectId, models: { User } } = require('affinity-data')

module.exports = function (id, coordinates) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw  ContentError(`${id} is not a valid id`)

    if (coordinates) {
        validate.array(coordinates)
    }
   

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw  NotFoundError(`user with id ${id} not found`)

        const update = {
            location: {
                type: "Point",
                coordinates: []
            }
        }
        
        

        coordinates && (update.location.coordinates = coordinates)
      
        update.lastAccess =  new Date

        await User.updateOne({ _id: ObjectId(id) }, { $set: update })
    })()
}
