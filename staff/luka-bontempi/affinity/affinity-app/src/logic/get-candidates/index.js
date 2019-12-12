const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('affinity-util')
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL
/**
 * returns candidates based on user's current location
 * 
 * @param {*token}  token with user's id.
 * 
 */
module.exports = function (token) {
    validate.string(token)
    validate.string.notVoid('token', token)

    return (async () => {
        const res = await call(`${API_URL}/users/candidates/:id`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        })

        if (res.status === 200) {
            const candidates = JSON.parse(res.body)



            return candidates
        }
        
        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}