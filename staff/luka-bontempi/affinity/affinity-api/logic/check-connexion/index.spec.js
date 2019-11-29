require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('.')
const { errors: { NotFoundError } } = require('affinity-util')
const { database, models: { User } } = require('affinity-data')

describe('logic - retrieve user', () => {
    before(() => database.connect(TEST_DB_URL))


    let name, surname, email, username, genderId, description, geometric, password, birthdate

    beforeEach( async() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
        genderId = `genderId-${random()}`
        geometric = [{interest:`interest-${random()}`,value:random()},{interest:`interest-${random()}`,value:random()}]
        description = `description-${random()}`
        birthdate = new Date

        await User.deleteMany()

        const user = await User.create({ name, surname, email, username, genderId, description, geometric, password, birthdate })

        id = user.id
    })

    it('should succeed on correct user id', async () => {
        const user = await retrieveUser(id)

        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user.id).to.be.a('string')
        expect(user._id).to.not.exist
        expect(user.name).to.equal(name)
        expect(user.name).to.be.a('string')
        expect(user.surname).to.equal(surname)
        expect(user.surname).to.be.a('string')
        expect(user.email).to.equal(email)
        expect(user.email).to.be.a('string')
        expect(user.username).to.equal(username)
        expect(user.username).to.be.a('string')
        expect(user.genderId).to.equal(genderId)
        expect(user.genderId).to.be.a('string')
        expect(user.description).to.equal(description)
        expect(user.description).to.be.a('string')
        expect(user.geometric).to.deep.equal(geometric)
        expect(user.geometric).to.be.a('array')
        expect(user.birthdate).to.deep.equal(birthdate)
        // expect(user.birthdate).to.be.a.dateString()
        expect(user.password).to.be.undefined
        expect(user.lastAccess).to.exist
        expect(user.lastAccess).to.be.an.instanceOf(Date)
    })

    it('should fail on wrong user id', async () => {
        const id = '012345678901234567890123'

        try {
            await retrieveUser(id)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${id} not found`)
        }
    })

    // TODO other cases

    after(() => User.deleteMany().then(database.disconnect))
})
