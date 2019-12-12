const call = require('../../utils/call')
const { validate, errors: { CredencialsError, NotFoundError } } = require('affinity-util')
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL

module.exports = function (token, name, surname, genderId, geometric, description, day, month, year, radius) {
    validate.string(token)
    validate.string.notVoid('token', token)


    return (async () => {
        const res = await call(`${API_URL}/users/edit`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, genderId, geometric, description, day, month, year, radius })
        })
        if (res.status === 200) {
            const user = JSON.parse(res.body)
            return


        }


        if (res.status === 401) throw new CredencialsError(JSON.parse(res.body).message)

        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)

    })()
}
