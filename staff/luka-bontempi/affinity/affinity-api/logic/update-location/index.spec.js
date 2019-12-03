require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const updateLocation = require('.')
const { random } = Math
const { errors: { NotFoundError, ConflictError, ContentError }, polyfills: { arrayRandom } } = require('affinity-util')
const { database, ObjectId, models: { User } } = require('affinity-data')

arrayRandom()

describe('logic - update location', () => {
    before(() => database.connect(TEST_DB_URL))


    let name, surname, email, username, genderId, description, geometric, password
    

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

    it('should succeed on correct user and new user data', async () => {
        debugger
       
        const newLocation = [41,2]

        const response = await updateLocation(id, newLocation)

        expect(response).to.not.exist

        const user = await User.findById(id)

        

        expect(user.location).to.exist
        expect(user.location).to.be.an('object')
        expect(user.location.coordinates).to.deep.equal(newLocation)
        
        

        expect(user.lastAccess).to.exist
        expect(user.lastAccess).to.be.an.instanceOf(Date)
    })


    after(() => Promise.all([User.deleteMany(), User.deleteMany()]).then(database.disconnect))
})
