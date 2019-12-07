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
        type: Object,
        required: true
    },
    description: {
        type: String,
        default: ''
        
    },
    genderId: {
        type: String,
        required: true
    },
    geometric: {
        type: Array,
        
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
    location: {
        type: {
            type: String, 
            enum: ['Point'],
        },
        coordinates:{
            type: [Number],
            index:"2dsphere",
            default: undefined
        }
    },
    radius: {
        type: Number,
        default: 4
    },
    profilePicture: {
        type: String
    },
    lastAccess: {
        type: Date
    }
})

// user.index({location: '2dsphere'})
