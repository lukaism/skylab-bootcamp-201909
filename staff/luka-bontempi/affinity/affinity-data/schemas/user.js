const { Schema } = require('mongoose')
const { validators: { isEmail } } = require('../../affinity-util')

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
    birthdate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        
    },
    genderId: {
        type: String,
        required: true
    },
    geometric: {
        type: Array,
        
    },
    candidates: {
        type: Array,
        default: []
        
    },
    rejected: {
        type: Array,
        default: []
    },
    aproved: {
        type: Array,
        default: []
    },
    connections: {
        type: Array,
        default: []
    },
    loc: {
        type: { type: String },
        coordinates: [Number],
    },
    radius: {
        type: Number,
    },
    lastAccess: {
        type: Date
    }
})