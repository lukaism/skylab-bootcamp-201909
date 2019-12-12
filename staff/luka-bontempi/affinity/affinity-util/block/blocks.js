/**
 * Itearates an array of Objects and returns an array of Objects, said Objects contain information about how to build said block.
 * 
 * @param {geometric} array The array to iterate.
 * @param {instructions} array an Object array, with building instructions in every Object.
 * 
 * @throws {TypeError} If array is not an array, or expression is not a function. TODO
 */
let buildInstructions = require('./buildInstructions')
let checkpercentage = require('./checkpercentage')
let defineBlocks = require('./defineBlocks')
let sortproportion = require('./sortproportion')

module.exports = function (geometric) {
    let total = 0
    geometric.forEach(element => { total += (+element.value) })
    geometric.forEach(element => { element.proportion = Math.ceil((+element.value) / total * 100) })
    geometric = checkpercentage(geometric)
    geometric.sort(sortproportion)
    defineBlocks(geometric)
    const instructions = buildInstructions(geometric)
    return instructions
}