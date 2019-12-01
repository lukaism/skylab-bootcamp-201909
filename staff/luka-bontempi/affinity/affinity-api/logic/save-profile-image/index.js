require('dotenv').config()
const { validate } = require('affinity-util')
const { ObjectId, models: { User } } = require('affinity-data')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)

/**
 * Saves user profile image.
 * 
 * @param {ObjectId} id
 * @param {Stream} file
 * @param {Sting} filename 
 *
 * @returns {Promise} - user.  
 */


module.exports = function(id, file, filename) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)


    /* fs.readFile(__dirname) */

    return (async() => {

        imgPath = path.join(__dirname, `../../data/users/${id}/` + filename + '.png')
        route = path.join(__dirname, `../../data/users/${id}/`)

        try {
            if (await fs.existsSync(route)) {
                return file.pipe(fs.createWriteStream(imgPath))
                debugger
            } else {
                fs.mkdirSync(route)
                return file.pipe(fs.createWriteStream(imgPath))
                debugger
            }
        } catch (error) {
            debugger
        }

    })()
}