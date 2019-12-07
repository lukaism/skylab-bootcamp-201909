require('dotenv').config()
const { env: { TEST_DB_URL } } = process
const { expect } = require('chai')
const registerUser = require('.')
const { random } = Math
const { errors: { ContentError } } = require('affinity-util')
const { database, models: { User } } = require('affinity-data')
const bcrypt = require('bcryptjs')


describe('logic - register user', () => {
    before(() => database.connect(TEST_DB_URL))

    let name, surname, email, username, genderId, password, day, month, year, birthdate, hash

    beforeEach( async() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        genderId = `genderId-${random()}`
        password = `password-${random()}`
        hash = await bcrypt.hash(password, 10)
        day = (Math.floor(Math.random() * (9 - 1))).toString()
        month = (Math.floor(Math.random() * (9 - 1))).toString()
        year = (Math.floor(Math.random() * (99 - 1)) +1900).toString()


        birthdate = new Date(year, month-1, day)

        return User.deleteMany()
    })

    it('should succeed on correct credentials', async () => {
        const response = await registerUser(name, surname, email, username, genderId, password, day, month, year )

        expect(response).to.be.undefined

        const user = await User.findOne({ username })

        expect(user).to.exist

        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.username).to.equal(username)
        expect(user.genderId).to.equal(genderId)
        expect(user.birthdate).to.deep.equal(birthdate)
        const match = await bcrypt.compare(password, user.password)
        expect(match).to.be.true
        
    })

    describe('when user already exists', () => {
        beforeEach(() => User.create({ name, surname, email, username, genderId, password, birthdate }))

        it('should fail on already existing user', async () => {
            try {
                await registerUser(name, surname, email, username, genderId, password, day, month, year )

                throw Error('should not reach this point')
            } catch (error) {
                expect(error).to.exist

                expect(error.message).to.exist
                expect(typeof error.message).to.equal('string')
                expect(error.message.length).to.be.greaterThan(0)
                expect(error.message).to.equal(`user with username ${username} already exists`)
            }
        })
    })

    it('should fail on incorrect name, surname, email, password, or expression type and content', () => {
        expect(() => registerUser(1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser([])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser({})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser('')).to.throw(ContentError, 'name is empty or blank')
        expect(() => registerUser(' \t\r')).to.throw(ContentError, 'name is empty or blank')

        expect(() => registerUser(name, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(name, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(name, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(name, '')).to.throw(ContentError, 'surname is empty or blank')
        expect(() => registerUser(name, ' \t\r')).to.throw(ContentError, 'surname is empty or blank')

        expect(() => registerUser(name, surname, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, surname, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, surname, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(name, surname, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(name, surname, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, surname, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(name, surname, '')).to.throw(ContentError, 'e-mail is empty or blank')
        expect(() => registerUser(name, surname, ' \t\r')).to.throw(ContentError, 'e-mail is empty or blank')

        expect(() => registerUser(name, surname, email, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, surname, email, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, surname, email, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(name, surname, email, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(name, surname, email, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, surname, email, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(name, surname, email, '')).to.throw(ContentError, 'username is empty or blank')
        expect(() => registerUser(name, surname, email, ' \t\r')).to.throw(ContentError, 'username is empty or blank')


        expect(() => registerUser(name, surname, email, username, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, surname, email, username, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, surname, email, username, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(name, surname, email, username, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(name, surname, email, username, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, surname, email, username, null)).to.throw(TypeError, 'null is not a string')

       expect(() => registerUser(name, surname, email, username, '')).to.throw(ContentError, 'genderId is empty or blank')
        expect(() => registerUser(name, surname, email, username, ' \t\r')).to.throw(ContentError, 'genderId is empty or blank')

        

        expect(() => registerUser(name, surname, email, username, genderId, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, [])).to.throw(TypeError, ' is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, null)).to.throw(TypeError, 'null is not a string')


        expect(() => registerUser(name, surname, email, username, genderId,'')).to.throw(ContentError, 'password is empty or blank')
        expect(() => registerUser(name, surname, email, username, genderId, ' \t\r')).to.throw(ContentError, 'password is empty or blank')
        
        expect(() => registerUser(name, surname, email, username, genderId, password, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(name, surname, email, username, genderId, password, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(name, surname, email, username, genderId, password, day, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, day, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, day, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, day, null)).to.throw(TypeError, 'null is not a string')

        expect(() => registerUser(name, surname, email, username, genderId, password, day, month, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, day, month, true)).to.throw(TypeError, 'true is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, day, month, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => registerUser(name, surname, email, username, genderId, password, day, month, null)).to.throw(TypeError, 'null is not a string')


        // expect(() => registerUser(name, surname, email, username, genderId, password, '')).to.throw(ContentError, 'birthdate is empty or blank')
        // expect(() => registerUser(name, surname, email, username, genderId, password, ' \t\r')).to.throw(ContentError, 'birthdate is empty or blank')
    })

    // TODO other cases

    after(() => User.deleteMany().then(database.disconnect))
})
