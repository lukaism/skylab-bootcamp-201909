const call = require('../../utils/call')
const { validate, errors: { ConflictError } } = require('affinity-util')
const API_URL = process.env.REACT_APP_API_URL
/**
 * update static location.
 * 
 * @param {string} this.__token__
 * @param {number} longitude 
 * @param {number} latitude
 * 
 */

module.exports = function (token, location) {

    validate.string(token)
    validate.string.notVoid('token', token)

    validate.array(location)

    return (async () => {
        const res = await call(`${API_URL}/users/uplocation`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ location })
        })
        
        if (res.error) {
            const { error } = res
            throw Error(error)
        }
    })()
}