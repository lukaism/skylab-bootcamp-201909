const { Schema, ObjectId } = require('mongoose')

module.exports =  new Schema({
    color: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    }
})