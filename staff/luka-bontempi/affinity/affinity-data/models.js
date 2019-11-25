const { model } = require('mongoose')
const { user, task } = require('./schemas')

module.exports = {
    User: model('User', user),
    Interest: model('Interest', interest),
    Interest: model('Interest', interest),
    Conversation: model('Conversation', conversation),
    Message: model('Message', message),

}
