require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('.')
const { errors: { NotFoundError } } = require('affinity-util')
const { database, models: { User } } = require('affinity-data')
const  { randomCoordinates } = require('random-coordinates')

describe('logic - retrieve user', () => {
    before(() => database.connect(TEST_DB_URL))


    let name, surname, email, username, genderId, description, geometric, password, birthdate, location

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
        location = randomCoordinates()

        await User.deleteMany()

        const user = await User.create({ name, surname, email, username, genderId, description, geometric, password, birthdate, location })

        id = user.id

        names = []
        surnames = []
        emails = []
        usernames = []
        passwords = []
        genderIds = []
        geometrics = []
        descriptions = []
        birthdates = []
        locations = []

        const insertions = []

        for (let i = 0; i < 10; i++) {
            const user = {
                name : `name-${random()}`,
                surname : `surname-${random()}`,
                email : `email-${random()}@mail.com`,
                username : `username-${random()}`,
                password : `password-${random()}`,
                genderId : `genderId-${random()}`,
                geometric : [{interest:`interest-${random()}`,value:random()},{interest:`interest-${random()}`,value:random()}],
                description : `description-${random()}`,
                birthdate : new Date,
                location : randomCoordinates()
            }

            insertions.push(User.create(user).then(user => userIds.push(user.id)))

            names.push(user.name)
            surnames.push(user.surname)
            emails.push(user.email)
            usernames.push(user.username)
            passwords.push(user.password)
            genderIds.push(user.genderId)
            geometrics.push(user.geometric)
            descriptions.push(task.description)
            birthdates.push(task.birthdate)
            locations.push(task.location)
        }

        for (let i = 0; i < 10; i++)
            insertions.push(User.create({
                name : `name-${random()}`,
                surname : `surname-${random()}`,
                email : `email-${random()}@mail.com`,
                username : `username-${random()}`,
                password : `password-${random()}`,
                genderId : `genderId-${random()}`,
                geometric : [{interest:`interest-${random()}`,value:random()},{interest:`interest-${random()}`,value:random()}],
                description : `description-${random()}`,
                birthdate : new Date,
                location : randomCoordinates()
            }))

        await Promise.all(insertions)
    
    })

    it('should succeed on correct user id', async () => {
        const user = await getCandidates(id)

        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user.id).to.be.a('string')
        expect(user._id).to.not.exist
        expect(user.name).to.equal(name)
        expect(user.name).to.be.a('string')
        expect(user.candidates).to.be.an('array')
        expect(user.candidates).to.deep.equal([id2])
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
