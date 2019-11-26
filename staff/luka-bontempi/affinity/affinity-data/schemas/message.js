const { Schema } = require('mongoose')

module.exports = new Schema({
    conversationId: {
        type: ObjectId,
        required: true
    },
    user: {
        type: int,
        required: true
    } ,
    message_body: {
        type: String,
        required: true
    } ,
    message_status: {
        type: Boolean,
        default: false
    } ,
    created_at: {
        type: Date,
        default: Date.now
    } ,
});
