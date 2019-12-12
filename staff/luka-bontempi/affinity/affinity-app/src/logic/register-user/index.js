const call = require('../../utils/call')
const { validate, errors: { ConflictError } } = require('affinity-util')
// const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL
// const bcrypt = require('bcryptjs')

/**
 * Aproves a candidate, by updating said candidate's userId to the users information
 * 
 * @param {*name}  user's name
 * @param {*surname}  user's surname
 * @param {*email}  user's email
 * @param {*username}  user's username
 * @param {*genderId}  id1 candidate's Id
 * @param {*password}  id1 candidate's Id
 * @param {*day}  id1 candidate's Id
 * @param {*month}  id1 candidate's Id
 * @param {*year}  id1 candidate's Id
 * 
 */




module.exports = function (name, surname, email, username, genderId, password, day, month, year) { 
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(genderId)
    validate.string.notVoid('genderId', genderId)
    validate.string(password)
    validate.string.notVoid('password', password)
    validate.string(day)
    validate.string.notVoid('day', day)
    validate.string(month)
    validate.string.notVoid('month', month)
    validate.string(year)
    validate.string.notVoid('year', year)

    return (async () => {
        const res = await call(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, username, genderId, password, day, month, year})
        })

        if (res.status === 201) return
        
        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}