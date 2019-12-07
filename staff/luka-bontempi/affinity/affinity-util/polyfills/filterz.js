module.exports = function (geometric) {
    if (!(geometric instanceof Array)) throw new TypeError(array + ' is not an array')

   let result = []
    geometric.forEach(interest => {
        if (interest.interestId !== "z"){
            result.push(interest)
        }
    })

    return result
}