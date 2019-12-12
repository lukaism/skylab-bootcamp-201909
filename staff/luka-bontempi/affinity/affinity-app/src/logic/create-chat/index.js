const call = require('../../utils/call')
const { validate, errors: { CredentialsError, ConflictError } } = require('affinity-util')
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL

/**
 * creates a chat between the user and a candidate.
 * 
 * @param {*token}  token with user's id.
 * @param {*userId}  candidate's Id
 * 
 */

module.exports = function(token, userId ) {
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(userId)
    validate.string.notVoid('userId', userId)

    return (async() => {
        const res = await call(`${API_URL}/chat/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ userId })
        })


        if (res.status === 201) return JSON.parse(res.body)

        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)

    })()


}