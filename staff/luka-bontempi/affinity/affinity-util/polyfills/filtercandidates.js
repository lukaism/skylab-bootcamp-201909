module.exports = function (user, candidates) {
    let candodotes = []
    candidates.forEach(candidate => {
        if (!(user.rejected.includes(candidate.id) && user.aproved.includes(candidate.id) && user.connections.includes(candidate.id))) {
            const { name, surname, email, username, genderId, description, geometric, password, birthdate, location: { coordinates }, radius } = candidate
            candidate = { name, surname, email, username, genderId, description, geometric, password, birthdate, location: { type: "Point", coordinates: coordinates }, radius }
            candodotes.push(candidate)
        }
    })
    return candodotes

}