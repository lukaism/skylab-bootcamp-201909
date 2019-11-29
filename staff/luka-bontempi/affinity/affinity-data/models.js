const { model } = require('mongoose')
const { user } = require('./schemas')

module.exports = {
    User: model('User', user),
    // Conversation: model('Conversation', conversation),
    // Message: model('Message', message),

}
