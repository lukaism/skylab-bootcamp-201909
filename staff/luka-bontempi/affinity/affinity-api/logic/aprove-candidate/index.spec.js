require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const aprovecandidate = require('.')
const { errors: { NotFoundError } } = require('affinity-util')
const { database, models: { User } } = require('affinity-data')

describe('logic - aprove-candidate', () => {
    before(() => database.connect(TEST_DB_URL))


    let name, surname, email, username, genderId, description, geometric, password, birthdate, rejected, aproved, connections, name1, surname1, email1, username1, genderId1, description1, geometric1, password1, birthdate1,  rejected1, aproved1, connections1

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
        rejected1 = []
        aproved1 = []
        connections1 = []

        await User.deleteMany()

        const user = await User.create({ name, surname, email, username, genderId, description, geometric, password, birthdate,  rejected, aproved, connections })

        const user1 = await User.create({ name: name1, surname: surname1, email: email1, username: username1, genderId: genderId1, description: description1, geometric: geometric1, password: password1, birthdate: birthdate1, rejected: rejected1, aproved: aproved1, connections: connections1 })

        id = user.id
        id1 = user1.id

    })

    it('should succeed on correct user id', async () => {
        debugger

        user = await aprovecandidate(id,id1)

        expect(user).to.exist
        expect(user.aproved).to.be.an('array')
        expect(user.aproved).to.deep.equal([id1])
        expect(user.lastAccess).to.exist
        expect(user.lastAccess).to.be.an.instanceOf(Date)
    })

    // it('should fail on wrong user id', async () => {
    //      id = '012345678901234567890123'

    //     try {
    //         user = await aprovecandidate(id,id1)

    //         throw Error('should not reach this point')
    //     } catch (error) {
    //         expect(error).to.exist
    //         expect(error).to.be.an.instanceOf(NotFoundError)
    //         expect(error.message).to.equal(`user with id ${id1} not found`)
    //     }
    // })

    // TODO other cases

    after(() => User.deleteMany().then(database.disconnect))
})
