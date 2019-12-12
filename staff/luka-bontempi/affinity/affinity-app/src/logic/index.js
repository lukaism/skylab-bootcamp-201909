module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    retrieveCandidate: require('./retrieve-candidate'),
    modifyUser: require('./modify-user'),
    updateLocation: require('./update-location'),
    rejectCandidate: require('./reject-candidate'),
    aproveCandidate: require('./aprove-candidate'),
    checkConnection: require('./check-connection'),
    getCandidates: require('./get-candidates'),
    createChat: require('./create-chat'),
    retrieveChat: require('./retrieve-chat'),
    retrieveChats: require('./retrieve-chats'),
    sendMessage: require('./send-message'),
    retrieveSummaryUser: require('./retrieve-sumary-user')
}
