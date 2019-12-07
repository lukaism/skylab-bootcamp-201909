const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL } } = process
const registerUser = require('.')
const { random } = Math
const { errors: { ContentError } } = require('tasks-util')
const { database, models: { User } } = require('tasks-data')

describe('logic - register user', () => {
    before(() => database.connect(TEST_DB_URL))

    let name, surname, email, username, genderId, password, day, month, year, birthdate

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        genderId = `genderId-${random()}`
        password = `password-${random()}`
        day = (Math.floor(Math.random() * (9 - 1))).toString()
        month = (Math.floor(Math.random() * (9 - 1))).toString()
        year = (Math.floor(Math.random() * (99 - 1)) +1900).toString()


        birthdate = new Date(year, month-1, day)

        return User.deleteMany()
    })

    it('should succeed on correct credentials', async () => {
        const response = await registerUser(name, surname, email, username, genderId, password, day, month, year )

        expect(response).toBeUndefined()

        const user = await User.findOne({ username })

        expect(user).toBeDefined()

        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.username).toBe(username)
        expect(user.password).toBe(password)
        expect(user.genderId).toBe(genderId)
        expect(user.birthdate).toBe(birthdate)
    })

    describe('when user already exists', () => {
        beforeEach(() => User.create({ name, surname, email, username, genderId, password, birthdate }))

        it('should fail on already existing user', async () => {
            try {
                await registerUser(name, surname, email, username, genderId, password, day, month, year)

                throw Error('should not reach this point')
            } catch (error) {
                expect(error).toBeDefined()

                expect(error.message).toBeDefined()
                expect(typeof error.message).toBe('string')
                expect(error.message.length).toBeGreaterThan(0)
                expect(error.message).toBe(`user with username ${username} already exists`)
            }
        })
    })

    it('should fail on incorrect name, surname, email, password, or expression type and content', () => {expect(() => registerUser(1)).toThow(TypeError, '1 is not a string')
    expect(() => registerUser(true)).toThow(TypeError, 'true is not a string')
    expect(() => registerUser([])).toThow(TypeError, ' is not a string')
    expect(() => registerUser({})).toThow(TypeError, '[object Object] is not a string')
    expect(() => registerUser(undefined)).toThow(TypeError, 'undefined is not a string')
    expect(() => registerUser(null)).toThow(TypeError, 'null is not a string')

    expect(() => registerUser('')).toThow(ContentError, 'name is empty or blank')
    expect(() => registerUser(' \t\r')).toThow(ContentError, 'name is empty or blank')

    expect(() => registerUser(name, 1)).toThow(TypeError, '1 is not a string')
    expect(() => registerUser(name, true)).toThow(TypeError, 'true is not a string')
    expect(() => registerUser(name, [])).toThow(TypeError, ' is not a string')
    expect(() => registerUser(name, {})).toThow(TypeError, '[object Object] is not a string')
    expect(() => registerUser(name, undefined)).toThow(TypeError, 'undefined is not a string')
    expect(() => registerUser(name, null)).toThow(TypeError, 'null is not a string')

    expect(() => registerUser(name, '')).toThow(ContentError, 'surname is empty or blank')
    expect(() => registerUser(name, ' \t\r')).toThow(ContentError, 'surname is empty or blank')

    expect(() => registerUser(name, surname, 1)).toThow(TypeError, '1 is not a string')
    expect(() => registerUser(name, surname, true)).toThow(TypeError, 'true is not a string')
    expect(() => registerUser(name, surname, [])).toThow(TypeError, ' is not a string')
    expect(() => registerUser(name, surname, {})).toThow(TypeError, '[object Object] is not a string')
    expect(() => registerUser(name, surname, undefined)).toThow(TypeError, 'undefined is not a string')
    expect(() => registerUser(name, surname, null)).toThow(TypeError, 'null is not a string')

    expect(() => registerUser(name, surname, '')).toThow(ContentError, 'e-mail is empty or blank')
    expect(() => registerUser(name, surname, ' \t\r')).toThow(ContentError, 'e-mail is empty or blank')

    expect(() => registerUser(name, surname, email, 1)).toThow(TypeError, '1 is not a string')
    expect(() => registerUser(name, surname, email, true)).toThow(TypeError, 'true is not a string')
    expect(() => registerUser(name, surname, email, [])).toThow(TypeError, ' is not a string')
    expect(() => registerUser(name, surname, email, {})).toThow(TypeError, '[object Object] is not a string')
    expect(() => registerUser(name, surname, email, undefined)).toThow(TypeError, 'undefined is not a string')
    expect(() => registerUser(name, surname, email, null)).toThow(TypeError, 'null is not a string')

    expect(() => registerUser(name, surname, email, '')).toThow(ContentError, 'username is empty or blank')
    expect(() => registerUser(name, surname, email, ' \t\r')).toThow(ContentError, 'username is empty or blank')


    expect(() => registerUser(name, surname, email, username, 1)).toThow(TypeError, '1 is not a string')
    expect(() => registerUser(name, surname, email, username, true)).toThow(TypeError, 'true is not a string')
    expect(() => registerUser(name, surname, email, username, [])).toThow(TypeError, ' is not a string')
    expect(() => registerUser(name, surname, email, username, {})).toThow(TypeError, '[object Object] is not a string')
    expect(() => registerUser(name, surname, email, username, undefined)).toThow(TypeError, 'undefined is not a string')
    expect(() => registerUser(name, surname, email, username, null)).toThow(TypeError, 'null is not a string')

   expect(() => registerUser(name, surname, email, username, '')).toThow(ContentError, 'genderId is empty or blank')
    expect(() => registerUser(name, surname, email, username, ' \t\r')).toThow(ContentError, 'genderId is empty or blank')

    

    expect(() => registerUser(name, surname, email, username, genderId, 1)).toThow(TypeError, '1 is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, true)).toThow(TypeError, 'true is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, [])).toThow(TypeError, ' is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, {})).toThow(TypeError, '[object Object] is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, undefined)).toThow(TypeError, 'undefined is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, null)).toThow(TypeError, 'null is not a string')


    expect(() => registerUser(name, surname, email, username, genderId,'')).toThow(ContentError, 'password is empty or blank')
    expect(() => registerUser(name, surname, email, username, genderId, ' \t\r')).toThow(ContentError, 'password is empty or blank')
    
    expect(() => registerUser(name, surname, email, username, genderId, password, 1)).toThow(TypeError, '1 is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, true)).toThow(TypeError, 'true is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, undefined)).toThow(TypeError, 'undefined is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, null)).toThow(TypeError, 'null is not a string')

    expect(() => registerUser(name, surname, email, username, genderId, password, 1)).toThow(TypeError, '1 is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, true)).toThow(TypeError, 'true is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, undefined)).toThow(TypeError, 'undefined is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, null)).toThow(TypeError, 'null is not a string')

    expect(() => registerUser(name, surname, email, username, genderId, password, day, 1)).toThow(TypeError, '1 is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, day, true)).toThow(TypeError, 'true is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, day, undefined)).toThow(TypeError, 'undefined is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, day, null)).toThow(TypeError, 'null is not a string')

    expect(() => registerUser(name, surname, email, username, genderId, password, day, month, 1)).toThow(TypeError, '1 is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, day, month, true)).toThow(TypeError, 'true is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, day, month, undefined)).toThow(TypeError, 'undefined is not a string')
    expect(() => registerUser(name, surname, email, username, genderId, password, day, month, null)).toThow(TypeError, 'null is not a string')
    // TODO other cases
})

    afterAll(() => User.deleteMany().then(database.disconnect))
})
