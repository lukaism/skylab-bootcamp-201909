/**
 * Itearates an array of Objects and returns the total number of blocks present in all Objects.
 * 
 * @param {geometric} array The array to iterate.
 * @param {countedBlocks} int total number of blocks present in all Objects.
 * 
 * @throws {TypeError} If array is not an array, or expression is not a function. TODO
 */ 

function blockCounter(geometric) {
    let countedBlocks = 0
    geometric.forEach(element => { countedBlocks += element.distribution.length })
    return countedBlocks
}