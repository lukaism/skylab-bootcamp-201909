const call = require('../../utils/call')
const { validate, errors: { CredencialsError, NotFoundError } } = require('affinity-util')
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL
/**
 * Rejects a candidate, by updating said candidate's userId to the users information
 * 
 * @param {*token}  token with user's id.
 * @param {*id1}  id1 candidate's Id
 * 
 */

module.exports = function (token, id1) {
    validate.string(token)
    validate.string.notVoid('token', token)
    validate.string(id1)
    validate.string.notVoid('id1', id1)

    return (async () => {
        const res = await call(`${API_URL}/users/reject`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id1 })
            })
        if (res.status === 200) {
            return
        }

        if (res.status === 401) throw new CredencialsError(JSON.parse(res.body).message)

        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)

    })()
}
