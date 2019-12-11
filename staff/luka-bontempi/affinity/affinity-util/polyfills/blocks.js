/**
 * Itearates an array of Objects and returns an array of Objects, said Objects contain information about how to build said block.
 * 
 * @param {geometric} array The array to iterate.
 * @param {instructions} array an Object array, with building instructions in every Object.
 * 
 * @throws {TypeError} If array is not an array, or expression is not a function. TODO
 */ 
function blocks(geometric) {
    let total = 0
    geometric.forEach(element => { total += (+element.value) })
    geometric.forEach(element => { element.proportion = Math.ceil((+element.value) / total * 100) })
    checkpercentage(geometric)
    geometric.sort(sortproportion)
    defineBlocks(geometric)
    const instructions = buildInstructions(geometric)
    return instructions
}
function sortproportion(a, b) {
    return b.proportion - a.proportion;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Itearates an array of Objects with a "proportion" property and returns an array of Objects each object with a distribution property added, which corresponds to the specification of the blocks to build.
 * 
 * @param {geometric} array The array to iterate.
 * @param {instructions} array an Object array with a proportion propertie, with building instructions in every Object.
 * 
 * @throws {TypeError} If array is not an array, or expression is not a function. TODO
 */ 
function defineBlocks(geometric) {
    debugger
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

function checkpercentage(geometric) {
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

function blockCounter(geometric) {
    let countedBlocks = 0
    geometric.forEach(element => { countedBlocks += element.distribution.length })
    return countedBlocks
}

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


var Oscar = [{
    interestId: 1,
    value: 24,
    tags: []
}, {
    interestId: 3,
    value: 16,
    tags: []
}, {
    interestId: 5,
    value: 100,
    tags: []
}, {
    interestId: 7,
    value: 56,
    tags: []
}, {
    interestId: 9,
    value: 10,
    tags: []
}]

var elena = blocks(Oscar)

