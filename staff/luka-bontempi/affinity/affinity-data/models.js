const { model } = require('mongoose')
const { user, chat, message } = require('./schemas')


module.exports = {
    User: model('User', user),
    Chat: model('Chat', chat),
    Message: model('Message', message),

}
