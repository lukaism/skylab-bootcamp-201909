require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const modifyUser = require('.')
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

        expect(response).toBeUndefined()

        const user = await User.findById(id)

        expect(user.name).toBeDefined()
        expect(user.name).toBeOfType ('string')
        expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).toEqual(newname)
        
        expect(user.surname).toBeDefined()
        expect(user.surname).toBeOfType ('string')
        expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).toEqual(newsurname)
        
        expect(user.genderId).toBeDefined()
        expect(user.genderId).toBeOfType ('string')
        expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).toEqual(newgenderId)

        expect(user.geometric).toBeDefined()
        expect(user.geometric).toBeOfType ('array')
        expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).toEqual(newgeometric)

        expect(user.description).toBeDefined()
        expect(user.description).toBeOfType ('string')
        expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).toEqual(newdescription)



        expect(user.lastAccess).toBeDefined()
        expect(user.lastAccess).toBeinstanceOf(Date)
    })

    it('should succeed on correct user and new user data, except for name', async () => {
        const newsurname = `newsurname-${random()}`
        const newgenderId = `newgenderId-${random()}`
        const newgeometric = [{interest:`newinterest-${random()}`,value:random()},{interest:`newinterest-${random()}`,value:random()}]
        const newdescription = `newdescription-${random()}`

        const response = await modifyUser(id, undefined, newsurname, newgenderId, newgeometric, newdescription)

        expect(response).toBeUndefined

        const user = await User.findById(id)

        

        expect(user.name).toBeDefined()
        expect(user.name).toBeOfType ('string')
        expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).toEqual(name)
        
        expect(user.surname).toBeDefined()
        expect(user.surname).toBeOfType ('string')
        expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).toEqual(newsurname)
        
        expect(user.genderId).toBeDefined()
        expect(user.genderId).toBeOfType ('string')
        // expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).toEqual(newgenderId)

        expect(user.geometric).toBeDefined()
        expect(user.geometric).toBeOfType ('array')
        // expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).toEqual(newgeometric)

        expect(user.description).toBeDefined()
        expect(user.description).toBeOfType ('string')
        // expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).toEqual(newdescription)


        expect(user.lastAccess).toBeDefined()
        expect(user.lastAccess).toBeInstanceOf(Date)
    })

    it('should succeed on correct user and new user data, except for surname', async () => {
        const newname = `newname-${random()}`
        const newgenderId = `newgenderId-${random()}`
        const newgeometric = [{interest:`newinterest-${random()}`,value:random()},{interest:`newinterest-${random()}`,value:random()}]
        const newdescription = `newdescription-${random()}`

        const response = await modifyUser(id, newname,undefined, newgenderId, newgeometric, newdescription)

        expect(response).toBeUndefined

        const user = await User.findById(id)

       

        expect(user.name).toBeDefined()
        expect(user.name).toBeOfType ('string')
        // expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).toEqual(newname)
        
        expect(user.surname).toBeDefined()
        expect(user.surname).toBeOfType ('string')
        // expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).toEqual(surname)
        
        expect(user.genderId).toBeDefined()
        expect(user.genderId).toBeOfType ('string')
        // expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).toEqual(newgenderId)

        expect(user.geometric).toBeDefined()
        expect(user.geometric).toBeOfType ('array')
        // expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).toEqual(newgeometric)

        expect(user.description).toBeDefined()
        expect(user.description).toBeOfType ('string')
        // expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).toEqual(newdescription)


        expect(user.lastAccess).toBeDefined()
        expect(user.lastAccess).toBeInstanceOf(Date)
    })

    it('should succeed on correct user and new user data, except for genderId', async () => {
        const newname = `newname-${random()}`
        const newsurname = `newsurname-${random()}`
        const newgeometric = [{interest:`newinterest-${random()}`,value:random()},{interest:`newinterest-${random()}`,value:random()}]
        const newdescription = `newdescription-${random()}`

        const response = await modifyUser(id, newname, newsurname,undefined,  newgeometric, newdescription)

        expect(response).toBeUndefined

        const user = await User.findById(id)

        

        expect(user.name).toBeDefined()
        expect(user.name).toBeOfType ('string')
        // expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).toEqual(newname)
        
        expect(user.surname).toBeDefined()
        expect(user.surname).toBeOfType ('string')
        // expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).toEqual(newsurname)
        
        expect(user.genderId).toBeDefined()
        expect(user.genderId).toBeOfType ('string')
        // expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).toEqual(genderId)

        expect(user.geometric).toBeDefined()
        expect(user.geometric).toBeOfType ('array')
        // expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).toEqual(newgeometric)

        expect(user.description).toBeDefined()
        expect(user.description).toBeOfType ('string')
        // expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).toEqual(newdescription)


        expect(user.lastAccess).toBeDefined()
        expect(user.lastAccess).toBeInstanceOf(Date)
    })

    it('should succeed on correct user and new user data, except for geometric', async () => {
        const newname = `newname-${random()}`
        const newsurname = `newsurname-${random()}`
        const newgenderId = `newgenderId-${random()}`
        const newdescription = `newdescription-${random()}`

        const response = await modifyUser(id, newname, newsurname, newgenderId, undefined, newdescription)

        expect(response).toBeUndefined

        const user = await User.findById(id)

        

        expect(user.name).toBeDefined()
        expect(user.name).toBeOfType ('string')
        // expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).toEqual(newname)
        
        expect(user.surname).toBeDefined()
        expect(user.surname).toBeOfType ('string')
        // expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).toEqual(newsurname)
        
        expect(user.genderId).toBeDefined()
        expect(user.genderId).toBeOfType ('string')
        // expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).toEqual(newgenderId)

        expect(user.geometric).toBeDefined()
        expect(user.geometric).toBeOfType ('array')
        // expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).toEqual(geometric)

        expect(user.description).toBeDefined()
        expect(user.description).toBeOfType ('string')
        // expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).toEqual(newdescription)


        expect(user.lastAccess).toBeDefined()
        expect(user.lastAccess).toBeInstanceOf(Date)
    })

    it('should succeed on correct user and new user data, except for description', async () => {
        const newname = `newname-${random()}`
        const newsurname = `newsurname-${random()}`
        const newgenderId = `newgenderId-${random()}`
        const newgeometric = [{interest:`newinterest-${random()}`,value:random()},{interest:`newinterest-${random()}`,value:random()}]

        const response = await modifyUser(id, newname, newsurname, newgenderId, newgeometric, undefined)

        expect(response).toBeUndefined

        const user = await User.findById(id)

        

        expect(user.name).toBeDefined()
        expect(user.name).toBeOfType ('string')
        // expect(user.name).to.have.length.greaterThan(0)
        expect(user.name).toEqual(newname)
        
        expect(user.surname).toBeDefined()
        expect(user.surname).toBeOfType ('string')
        // expect(user.surname).to.have.length.greaterThan(0)
        expect(user.surname).toEqual(newsurname)
        
        expect(user.genderId).toBeDefined()
        expect(user.genderId).toBeOfType ('string')
        // expect(user.genderId).to.have.length.greaterThan(0)
        expect(user.genderId).toEqual(newgenderId)

        expect(user.geometric).toBeDefined()
        expect(user.geometric).toBeOfType ('array')
        // expect(user.geometric).to.have.length.greaterThan(0)
        expect(user.geometric).toEqual(newgeometric)

        expect(user.description).toBeDefined()
        expect(user.description).toBeOfType ('string')
        // expect(user.description).to.have.length.greaterThan(0)
        expect(user.description).toEqual(description)


        expect(user.lastAccess).toBeDefined()
        expect(user.lastAccess).toBeInstanceOf(Date)
    })


    // it('should fail on wrong user id', async () => {
    //      id = '012345678901234567890123'

    //     try {
    //         user = await aprovecandidate(id,id1)

    //         throw Error('should not reach this point')
    //     } catch (error) {
    //         expect(error).toBeDefined()
    //         expect(error).toBeInstanceOf(NotFoundError)
    //         expect(error.message).toEqual(`user with id ${id1} not found`)
    //     }
    // })

    // TODO other cases

    after(() => User.deleteMany().then(database.disconnect))
})
