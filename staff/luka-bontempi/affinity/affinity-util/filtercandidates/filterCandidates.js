const { validate, errors: { NotFoundError, ContentError } } = require('affinity-util')


module.exports = function (user, candidates) {
    let candodotes = []
    candidates.forEach(candidate => {
        if (!(user.rejected.includes(candidate.id) || user.aproved.includes(candidate.id) || user.connections.includes(candidate.id))) {

            candodotes.push(candidate)
        }
    })
    return candodotes

}