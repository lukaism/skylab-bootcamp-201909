module.exports = function (geometric) {
    let percentage = 0
    geometric.forEach(element => { percentage += element.proportion })
    if (percentage === 0) {
        return geometric
    }
    else {
        let corrector = percentage - 100
        geometric[0].proportion = geometric[0].proportion - corrector
        return geometric
    }
}