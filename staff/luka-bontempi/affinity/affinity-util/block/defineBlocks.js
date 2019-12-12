/**
 * Itearates an array of Objects with a "proportion" property and returns an array of Objects each object with a distribution property added, which corresponds to the specification of the blocks to build.
 * 
 * @param {geometric} array The array to iterate.
 * @param {instructions} array an Object array with a proportion propertie, with building instructions in every Object.
 * 
 * @throws {TypeError} If array is not an array, or expression is not a function. TODO
 */ 
const getRandomInt = require('./getRandomInt')
module.exports = function(geometric) {
    for (let i = 0; i < geometric.length; i++) {
        if (i === 0) {
            let distribution = [16]
            let blocks = geometric[i].proportion - 16
            while (blocks !== 0) {
                if (blocks === 4) {
                    distribution.push(4)
                    blocks -= 4
                }
                else if (blocks === 3) {
                    distribution.push(3)
                    blocks -= 3
                }
                else if (blocks === 2) {
                    distribution.push(2)
                    blocks -= 2
                }
                else if (blocks === 1) {
                    distribution.push(1)
                    blocks -= 1
                }
                else if (blocks > 4) {
                    a = getRandomInt(2, 5)
                    distribution.push(a)
                    blocks -= a
                }
            }
            geometric[i].distribution = distribution
        }
        else {
            let distribution = []
            let blocks = geometric[i].proportion
            while (blocks !== 0) {
                if (blocks === 4) {
                    distribution.push(4)
                    blocks -= 4
                }
                else if (blocks === 3) {
                    distribution.push(3)
                    blocks -= 3
                }
                else if (blocks === 2) {
                    distribution.push(2)
                    blocks -= 2
                }
                else if (blocks === 1) {
                    distribution.push(1)
                    blocks -= 1
                }
                else if (blocks > 4) {
                    a = getRandomInt(2, 5)
                    distribution.push(a)
                    blocks -= a
                }
            }
            geometric[i].distribution = distribution
        }
    }
}