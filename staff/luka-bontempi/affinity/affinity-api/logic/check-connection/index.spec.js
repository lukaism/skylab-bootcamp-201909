require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const checkconnection = require('.')
const { errors: { NotFoundError } } = require('affinity-util')
const { database, models: { User } } = require('affinity-data')

describe('logic - check-connection', () => {
    before(() => database.connect(TEST_DB_URL))


    let name, surname, email, username, genderId, description, geometric, password, birthdate, rejected, aproved, connections, name1, surname1, email1, username1, genderId1, description1, geometric1, password1, birthdate1, rejected1, aproved1, connections1

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
        genderId = `genderId-${random()}`
        geometric = [{ interest: `interest-${random()}`, value: random() }, { interest: `interest-${random()}`, value: random() }]
        description = `description-${random()}`
        birthdate = new Date
        rejected = []
        aproved = []
        connections = []

        name1 = `name-${random()}`
        surname1 = `surname-${random()}`
        email1 = `email-${random()}@mail.com`
        username1 = `username-${random()}`
        password1 = `password-${random()}`
        genderId1 = `genderId-${random()}`
        geometric1 = [{ interest: `interest-${random()}`, value: random() }, { interest: `interest-${random()}`, value: random() }]
        description1 = `description-${random()}`
        birthdate1 = new Date
        rejected1 = []
        aproved1 = []
        connections1 = []

        name2 = `name-${random()}`
        surname2 = `surname-${random()}`
        email2 = `email-${random()}@mail.com`
        username2 = `username-${random()}`
        password2 = `password-${random()}`
        genderId2 = `genderId-${random()}`
        geometric2 = [{ interest: `interest-${random()}`, value: random() }, { interest: `interest-${random()}`, value: random() }]
        description2 = `description-${random()}`
        birthdate2 = new Date
        rejected2 = []
        aproved2 = []
        connections2 = []

        await User.deleteMany()

        const user = await User.create({ name, surname, email, username, genderId, description, geometric, password, birthdate, rejected, aproved, connections })

        const user1 = await User.create({ name: name1, surname: surname1, email: email1, username: username1, genderId: genderId1, description: description1, geometric: geometric1, password: password1, birthdate: birthdate1, rejected: rejected1, aproved: aproved1, connections: connections1 })

        const user2 = await User.create({ name: name2, surname: surname2, email: email2, username: username2, genderId: genderId2, description: description2, geometric: geometric2, password: password2, birthdate: birthdate2, rejected: rejected2, aproved: aproved2, connections: connections2 })

        id = user.id
        id1 = user1.id
        id2 = user2.id
        user1.aproved.push(id)
        await user1.save()
    })

    it('should succeed on correct user id', async () => {
        debugger

        let response = await checkconnection(id, id1)
        let usera = await User.findById(id)
        let userb = await User.findById(id1)
     
        expect(response).to.be.undefined
        expect(usera.connections).to.be.an('array')
        expect(userb.connections).to.be.an('array')
        expect(usera.connections).to.deep.equal([id1])
        expect(userb.connections).to.deep.equal([id])
        expect(usera.lastAccess).to.exist
        expect(usera.lastAccess).to.be.an.instanceOf(Date)
        expect(userb.lastAccess).to.exist
        expect(userb.lastAccess).to.be.an.instanceOf(Date)
    })

    it('should not update connections when user not in user1s aproved list', async () => {
        let response = await checkconnection(id, id2)
        let usera = await User.findById(id)
        let userb = await User.findById(id2)
     
        expect(response).to.be.undefined
        expect(usera.connections).to.be.an('array')
        expect(userb.connections).to.be.an('array')
        expect(usera.connections).to.deep.equal([])
        expect(userb.connections).to.deep.equal([])
    
    })

    // TODO other cases

    after(() => User.deleteMany().then(database.disconnect))
})
