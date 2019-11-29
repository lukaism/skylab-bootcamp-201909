require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const rejectcandidate = require('.')
const { errors: { NotFoundError } } = require('affinity-util')
const { database, models: { User } } = require('affinity-data')

describe('logic - reject-candidate', () => {
    before(() => database.connect(TEST_DB_URL))


    let name, surname, email, username, genderId, description, geometric, password, birthdate, candidates, rejected, aproved, connections, name1, surname1, email1, username1, genderId1, description1, geometric1, password1, birthdate1, candidates1, rejected1, aproved1, connections1

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
        candidates = []
        rejected = []
        aproved = []
        connections = []

        name1 = `name-${random()}`
        surname1= `surname-${random()}`
        email1 = `email-${random()}@mail.com`
        username1 = `username-${random()}`
        password1 = `password-${random()}`
        genderId1 = `genderId-${random()}`
        geometric1 = [{interest:`interest-${random()}`,value:random()},{interest:`interest-${random()}`,value:random()}]
        description1 = `description-${random()}`
        birthdate1 = new Date
        candidates1 = []
        rejected1 = []
        aproved1 = []
        connections1 = []

        await User.deleteMany()

        const user = await User.create({ name, surname, email, username, genderId, description, geometric, password, birthdate, candidates, rejected, aproved, connections })

        const user1 = await User.create({ name1, surname1, email1, username1, genderId1, description1, geometric1, password1, birthdate1, candidates1, rejected1, aproved1, connections1 })

        id = user.id
        id1 = user1.id
    })

    it('should succeed on correct user id', async () => {
        const user = await rejectcandidate(id,id1)

        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user.id).to.be.a('string')
        expect(user._id).to.not.exist
        expect(user.aproved).to.deep.equal(rejected)
        expect(user.aproved).to.be.an('array')
        expect(user.lastAccess).to.exist
        expect(user.lastAccess).to.be.an.instanceOf(Date)
    })

    it('should fail on wrong user id', async () => {
        const id = '012345678901234567890123'
        const id1 = '012345678901234567890124'

        try {
            await rejectcandidate(id,id1)

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
