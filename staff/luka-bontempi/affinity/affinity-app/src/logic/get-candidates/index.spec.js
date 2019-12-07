const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const getCandidates = require('.')
const { random } = Math
const { errors: { NotFoundError } } = require('tasks-util')
const { database, models: { User } } = require('tasks-data')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - get candidates', () => {
    before(() => database.connect(TEST_DB_URL))


    let name, surname, email, username, genderId, description, geometric, password, birthdate, location, coordinates, radius, insertions

    beforeEach(async () => {
        name = `namehongda-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
        genderId = `genderId-${random()}`
        geometric = [{ interest: `interest-${random()}`, value: random() }, { interest: `interest-${random()}`, value: random() }]
        description = `description-${random()}`
        birthdate = new Date
        radius = 140


        coordinates = [41 + random(), 2 + random()]

        await User.deleteMany()

        const user = await User.create({ name, surname, email, username, genderId, description, geometric, password, birthdate, location: { type: "Point", coordinates: coordinates }, radius })


        id = user.id
        userIds = []
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
        radiuses = []

        insertions = []

        for (let i = 0; i < 20; i++) {

            coordinates = [41 + random(), 2 + random()]
            // if (i > 9) {
            //     coordinates[0] += (i*4 + 1) / 10
            //     coordinates[1] += (i*4 + 1) / 10

            // }
            const user = {
                name: `name-${random()}`,
                surname: `surname-${random()}`,
                email: `email-${random()}@mail.com`,
                username: `username-${random()}`,
                password: `password-${random()}`,
                genderId: `genderId-${random()}`,
                geometric: [{ interest: `interest-${random()}`, value: random() }, { interest: `interest-${random()}`, value: random() }],
                description: `description-${random()}`,
                birthdate: new Date,
                location: { type: "Point", coordinates: coordinates },
                radius: 4
            }

            insertions.push(user)

            names.push(user.name)
            surnames.push(user.surname)
            emails.push(user.email)
            usernames.push(user.username)
            passwords.push(user.password)
            genderIds.push(user.genderId)
            geometrics.push(user.geometric)
            descriptions.push(user.description)
            birthdates.push(user.birthdate)
            locations.push(user.location)
            radiuses.push(user.radius)
        }

        await User.insertMany(insertions)
        // insertions.forEach(candidate => {
        //     candidate.id = candidate._id.toString()
        //     delete candidate._id
        // })

    })

    it('should succeed on correct user id', async () => {
        const candidates = await getCandidates(token)

        expect(candidates).toBeDefined()
        expect(candidates).toBeOfType('array')
        // expect(candidates).to.include.deep.members(insertions)
        candidates.forEach(candidate => {
            expect(candidate.name).toBeDefined()
            expect(candidate).toBeDefined()
            // expect(candidate.id).to.be.oneOf(id)
            expect(candidate.id).toBeOfType('string')
            expect(candidate._id).toBeUndefined
            // expect(candidate.name).to.be.oneOf(names)
            expect(candidate.name).toBeOfType('string')
            // expect(candidate.surname).to.be.oneOf(surnames)
            expect(candidate.surname).toBeOfType('string')
            // expect(candidate.email).to.be.oneOf(emails)
            expect(candidate.email).toBeOfType('string')
            // expect(candidate.username).to.be.oneOf(usernames)
            expect(candidate.username).toBeOfType('string')
            // expect(candidate.genderId).to.be.oneOf(genderIds)
            expect(candidate.genderId).toBeOfType('string')
            // expect(candidate.description).to.be.oneOf(descriptions)
            expect(candidate.description).toBeOfType('string')
            expect(candidate.geometric).toBeInstanceOf('array')
            // expect(candidate.birthdate).to.be.oneOf(birthdates)
            // expect(user.birthdate).toBeInstanceOf.dateString()
            expect(user.lastAccess).toBeDefined()
            expect(user.lastAccess).toBeInstanceOf(Date)
        })
    })

    it('should fail on wrong user id', async () => {
        const id = '012345678901234567890123'

        const token = jwt.sign({ sub: id }, TEST_SECRET)

        try {
            await retrieveUser(token)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(NotFoundError)
            expect(error.message).toBe(`user with id ${id} not found`)
        }
    })

    // TODO other cases

    afterAll(() => User.deleteMany().then(database.disconnect))
})


