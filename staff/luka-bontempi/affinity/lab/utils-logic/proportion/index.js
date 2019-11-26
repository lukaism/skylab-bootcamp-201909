
// returns a sorted Object array, from highest to lowest proportion property value
function sortproportion(a, b) {
    return b.proportion - a.proportion;
}

// returns a random Int value, comprised between min and max values (min included, max excluded)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

