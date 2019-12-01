require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const getCandidates = require('.')
const { errors: { NotFoundError } } = require('affinity-util')
const { database, models: { User } } = require('affinity-data')


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

    })

    it('should succeed on correct user id', async () => {
        const candidates = await getCandidates(id)

        expect(candidates).to.exist
        expect(candidates).to.be.an('array')
        expect(candidates).to.have.deep.members(insertions)
        candidates.forEach(elem => expect(elem).to.be.an('object'))
        // candidates.forEach(elem => expect(insertions).to.contain(elem))

    })



    it('should fail on wrong user id', async () => {
        const id = '012345678901234567890123'

        try {
            await getCandidates(id)

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
