const { Router } = require('express')
const { registerUser, authenticateUser, retrieveUser, modifyUser, updateLocation, rejectCandidate, aproveCandidate, checkConnection, getCandidates } = require('../../logic')
const jwt = require('jsonwebtoken')
const { env: { SECRET } } = process
const tokenVerifier = require('../../helpers/token-verifier')(SECRET)
const bodyParser = require('body-parser')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('affinity-util')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('/', jsonBodyParser, (req, res) => {
    const { body: { name, surname, email, username, genderId, password, day, month, year } } = req

    try {
        registerUser(name, surname, email, username, genderId, password, day, month, year)
            .then(() => res.status(201).end())
            .catch(error => {
                const { message } = error

                if (error instanceof ConflictError)
                    return res.status(409).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    try {
        authenticateUser(username, password)
            .then(id => {
                const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })

                res.json({ token })
            })
            .catch(error => {
                const { message } = error

                if (error instanceof CredentialsError)
                    return res.status(401).json({ message })

                res.status(500).json({ message })
            })
    } catch ({ message }) {
        res.status(400).json({ message })
    }
})

router.get('/', tokenVerifier, (req, res) => {
    try {
        const { id } = req

        retrieveUser(id)
            .then(user => res.json(user))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})
router.get('/cand/:id', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { params: { id } } = req
        debugger
        retrieveUser(id)
            .then(user => res.json(user))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.patch('/edit', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: { name, surname, genderId, geometric, description, day, month, year, radius } } = req
        debugger

        modifyUser(id, name, surname, genderId, geometric, description, day, month, year, radius)
            .then(() => res.status(200).json({ message: 'Todo bien' }))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.patch('/uplocation', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        debugger
        const { id, body: { location } } = req


        updateLocation(id, location)
            .then(() => res.status(200).json({ message: 'Todo bien' }))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.patch('/reject', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: { id1} } = req

        rejectCandidate(id, id1)
            .then(() => res.status(200).json({ message: 'Todo bien' }))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.patch('/aprove', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: { id1} } = req
        aproveCandidate(id, id1)
            
            .then(() => res.status(200).json({ message: 'Todo bien' }))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.patch('/check', tokenVerifier, jsonBodyParser, (req, res) => {
    try {
        const { id, body: { id1} } = req
        console.log(id)
        console.log(id1)

        checkConnection(id, id1)
            .then(() => res.status(200).json({ message: 'Todo bien' }))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.get('/candidates/:id', tokenVerifier, (req, res) => {
    try {debugger
        const { id } = req

        getCandidates(id)
            .then(candidates => res.json(candidates))
            .catch(error => {
                const { message } = error

                if (error instanceof NotFoundError)
                    return res.status(404).json({ message })

                res.status(500).json({ message })
            })
    } catch (error) {
        const { message } = error

        res.status(400).json({ message })
    }
})

router.post('/upload/:id', tokenVerifier, (req, res) => {

    const { params: { id } } = req
    const busboy = new Busboy({ headers: req.headers })

    busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
        filename = 'profile'
        await saveProfileImage(id, file, filename)
    })

    busboy.on('finish', () => {
        res.end("That's all folks!")
    })

    return req.pipe(busboy)
})

router.get('/profileimage/:id', tokenVerifier, async (req, res) => {

    const { params: { id } } = req
    const stream = await loadProfileImage(id)
    res.setHeader('Content-Type', 'image/jpeg')
    return stream.pipe(res)
})

router.get('/profileimageUrl/:id', tokenVerifier, async (req, res) => {

    const { params: { id } } = req
    const imageUrl = await loadProfileImageUrl(id)
    res.json({ imageUrl })
})






module.exports = router