require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const modifyUser = require('.')
const { random } = Math
const { errors: { NotFoundError, ConflictError, ContentError }, polyfills: { arrayRandom } } = require('affinity-util')
const { database, ObjectId, models: { User } } = require('affinity-data')

arrayRandom()

describe('logic - modify user', () => {
    before(() => database.connect(TEST_DB_URL))


    let name, surname, email, username, genderId, description, geometric, password, day, month, year
    

    beforeEach( async() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`
        genderId = `genderId-${random()}`
        geometric = [{interest:`interest-${random()}`,value:random()},{interest:`interest-${random()}`,value:random()}]
        description = `description-${random()}`
        day = (Math.floor(Math.random() * (9 - 1))).toString()
        month = (Math.floor(Math.random() * (9 - 1))).toString()
        year = (Math.floor(Math.random() * (99 - 1)) +1900).toString()

        await User.deleteMany()

        const user = await User.create({ name, surname, email, username, genderId, description, geometric, password, birthdate})

        id = user.id
    })

    it('should succeed on correct user and new user data', async () => {
        const newname = `newname-${random()}`
        const newsurname = `newsurname-${random()}`
        const newgenderId = `newgenderId-${random()}`
        const newgeometric = [{interest:`newinterest-${random()}`,value:random()},{interest:`newinterest-${random()}`,value:random()}]
        const newdescription = `newdescription-${random()}`
        const newday = (Math.floor(Math.random() * (9 - 1))).toString()
        const newmonth = (Math.floor(Math.random() * (9 - 1))).toString()
        const  newyear = (Math.floor(Math.random() * (99 - 1)) +1900).toString()


        const response = await modifyUser(id, newname, newsurname, newgenderId, newgeometric, newdescription, newday, newmonth, newyear)

        expect(response).to.not.exist

        const user = await User.findById(id)

        

        expect(user.name).to.exist
        expect(user.name).to.be.a('string')
        expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).to.equal(newname)
        
        expect(user.surname).to.exist
        expect(user.surname).to.be.a('string')
        expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).to.equal(newsurname)
        
        expect(user.genderId).to.exist
        expect(user.genderId).to.be.a('string')
        expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).to.equal(newgenderId)

        expect(user.geometric).to.exist
        expect(user.geometric).to.be.a('array')
        expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).to.deep.equal(newgeometric)

        expect(user.description).to.exist
        expect(user.description).to.be.a('string')
        expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).to.equal(newdescription)



        expect(user.lastAccess).to.exist
        expect(user.lastAccess).to.be.an.instanceOf(Date)
    })

    it('should succeed on correct user and new user data, except for name', async () => {
        const newsurname = `newsurname-${random()}`
        const newgenderId = `newgenderId-${random()}`
        const newgeometric = [{interest:`newinterest-${random()}`,value:random()},{interest:`newinterest-${random()}`,value:random()}]
        const newdescription = `newdescription-${random()}`

        const response = await modifyUser(id, undefined, newsurname, newgenderId, newgeometric, newdescription)

        expect(response).to.not.exist

        const user = await User.findById(id)

        

        expect(user.name).to.exist
        expect(user.name).to.be.a('string')
        expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).to.equal(name)
        
        expect(user.surname).to.exist
        expect(user.surname).to.be.a('string')
        expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).to.equal(newsurname)
        
        expect(user.genderId).to.exist
        expect(user.genderId).to.be.a('string')
        expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).to.equal(newgenderId)

        expect(user.geometric).to.exist
        expect(user.geometric).to.be.a('array')
        expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).to.deep.equal(newgeometric)

        expect(user.description).to.exist
        expect(user.description).to.be.a('string')
        expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).to.equal(newdescription)


        expect(user.lastAccess).to.exist
        expect(user.lastAccess).to.be.an.instanceOf(Date)
    })

    it('should succeed on correct user and new user data, except for surname', async () => {
        const newname = `newname-${random()}`
        const newgenderId = `newgenderId-${random()}`
        const newgeometric = [{interest:`newinterest-${random()}`,value:random()},{interest:`newinterest-${random()}`,value:random()}]
        const newdescription = `newdescription-${random()}`

        const response = await modifyUser(id, newname,undefined, newgenderId, newgeometric, newdescription)

        expect(response).to.not.exist

        const user = await User.findById(id)

       

        expect(user.name).to.exist
        expect(user.name).to.be.a('string')
        expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).to.equal(newname)
        
        expect(user.surname).to.exist
        expect(user.surname).to.be.a('string')
        expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).to.equal(surname)
        
        expect(user.genderId).to.exist
        expect(user.genderId).to.be.a('string')
        expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).to.equal(newgenderId)

        expect(user.geometric).to.exist
        expect(user.geometric).to.be.a('array')
        expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).to.deep.equal(newgeometric)

        expect(user.description).to.exist
        expect(user.description).to.be.a('string')
        expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).to.equal(newdescription)


        expect(user.lastAccess).to.exist
        expect(user.lastAccess).to.be.an.instanceOf(Date)
    })

    it('should succeed on correct user and new user data, except for genderId', async () => {
        const newname = `newname-${random()}`
        const newsurname = `newsurname-${random()}`
        const newgeometric = [{interest:`newinterest-${random()}`,value:random()},{interest:`newinterest-${random()}`,value:random()}]
        const newdescription = `newdescription-${random()}`

        const response = await modifyUser(id, newname, newsurname,undefined,  newgeometric, newdescription)

        expect(response).to.not.exist

        const user = await User.findById(id)

        

        expect(user.name).to.exist
        expect(user.name).to.be.a('string')
        expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).to.equal(newname)
        
        expect(user.surname).to.exist
        expect(user.surname).to.be.a('string')
        expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).to.equal(newsurname)
        
        expect(user.genderId).to.exist
        expect(user.genderId).to.be.a('string')
        expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).to.equal(genderId)

        expect(user.geometric).to.exist
        expect(user.geometric).to.be.a('array')
        expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).to.deep.equal(newgeometric)

        expect(user.description).to.exist
        expect(user.description).to.be.a('string')
        expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).to.equal(newdescription)


        expect(user.lastAccess).to.exist
        expect(user.lastAccess).to.be.an.instanceOf(Date)
    })

    it('should succeed on correct user and new user data, except for geometric', async () => {
        const newname = `newname-${random()}`
        const newsurname = `newsurname-${random()}`
        const newgenderId = `newgenderId-${random()}`
        const newdescription = `newdescription-${random()}`

        const response = await modifyUser(id, newname, newsurname, newgenderId, undefined, newdescription)

        expect(response).to.not.exist

        const user = await User.findById(id)

        

        expect(user.name).to.exist
        expect(user.name).to.be.a('string')
        expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).to.equal(newname)
        
        expect(user.surname).to.exist
        expect(user.surname).to.be.a('string')
        expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).to.equal(newsurname)
        
        expect(user.genderId).to.exist
        expect(user.genderId).to.be.a('string')
        expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).to.equal(newgenderId)

        expect(user.geometric).to.exist
        expect(user.geometric).to.be.a('array')
        expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).to.deep.equal(geometric)

        expect(user.description).to.exist
        expect(user.description).to.be.a('string')
        expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).to.equal(newdescription)


        expect(user.lastAccess).to.exist
        expect(user.lastAccess).to.be.an.instanceOf(Date)
    })

    it('should succeed on correct user and new user data, except for description', async () => {
        const newname = `newname-${random()}`
        const newsurname = `newsurname-${random()}`
        const newgenderId = `newgenderId-${random()}`
        const newgeometric = [{interest:`newinterest-${random()}`,value:random()},{interest:`newinterest-${random()}`,value:random()}]

        const response = await modifyUser(id, newname, newsurname, newgenderId, newgeometric, undefined)

        expect(response).to.not.exist

        const user = await User.findById(id)

        

        expect(user.name).to.exist
        expect(user.name).to.be.a('string')
        expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).to.equal(newname)
        
        expect(user.surname).to.exist
        expect(user.surname).to.be.a('string')
        expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).to.equal(newsurname)
        
        expect(user.genderId).to.exist
        expect(user.genderId).to.be.a('string')
        expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).to.equal(newgenderId)

        expect(user.geometric).to.exist
        expect(user.geometric).to.be.a('array')
        expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).to.deep.equal(newgeometric)

        expect(user.description).to.exist
        expect(user.description).to.be.a('string')
        expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).to.equal(description)


        expect(user.lastAccess).to.exist
        expect(user.lastAccess).to.be.an.instanceOf(Date)
    })



    // it('should fail on unexisting user and correct User data', async () => {
    //     const id = '01234567890123456789123'
    //     const newname = `newname-${random()}`
    //     const newsurname = `newsurname-${random()}`
    //     const newgenderId = `newgenderId-${random()}`
    //     const newgeometric = [{interest:`newinterest-${random()}`,value:random()},{interest:`newinterest-${random()}`,value:random()}]
    //     const newdescription = `newdescription-${random()}`

       

    //     try {
    //         await modifyUser(id, newname, newsurname, newgenderId, newgeometric, newdescription)

    //         throw new Error('should not reach this point')
    //     } catch (error) {
    //         expect(error).to.exist
    //         expect(error).to.be.an.instanceOf(NotFoundError)
    //         expect(error.message).to.equal(`user with id ${id} not found`)
    //     }
    // })

        
    // TODO other test cases

    after(() => Promise.all([User.deleteMany(), User.deleteMany()]).then(database.disconnect))
})
