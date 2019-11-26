const { Schema } = require('mongoose')
const { validators: { isEmail } } = require('tasks-util')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: isEmail
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    genderId: {
        type: String,
        required: true
    },
    geometric: {
        type: Array,
        required: true
    },
    lastAccess: {
        type: Date
    }
})