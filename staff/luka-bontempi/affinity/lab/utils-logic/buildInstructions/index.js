/**
 * Itearates an array of Objects and returns an array of Objects, said Objects contain information about how to build said block.
 * 
 * @param {geometric} array The array to iterate.
 * @param {instructions} array an Object array, with building instructions in every Object.
 * 
 * @throws {TypeError} If array is not an array, or expression is not a function. TODO
 */ 

function buildInstructions(geometric) {
    let instructions = []
    geometric.forEach(element => {
        element.distribution.forEach(element2 => {
            let direction = getRandomInt(1,3)
            if (direction === 1){
                direction = 'row'
            }
            if (direction === 2){
                direction = 'column'
            }
            let block = {
                size: element2,
                //    color: element.interestId
                color: 'pink',
                direction: direction
            }
            instructions.push(block)
        })
    })
    return instructions
}