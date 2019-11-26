const { Schema } = require('mongoose')

module.exports = new Schema({
    participants: {
        type: Array,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    } ,
    lastAccess: {
        type: Date
    }
});