const { expect } = require('chai')
const blocks = require('.')

describe('logic - blocks', () => {
    let geometric, interestId, value, tag 

    beforeEach(done => {
        geometric = []
        a = Math.floor((Math.random() * 6) + 1)
        for (i=0;i<a;i++){
            let interest = {}
            interestId = Math.floor((Math.random() * 10000) + 1)
            value = Math.floor((Math.random() * 100) + 1)
            interest.interestId = interestId
            interest.value = value
            geometric.push(interest)
        }        
    })

    it('should succeed on correct data', done => {
        blocks(geometric)
            .then(response => {
                expect(response).to.be.undefined

                call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
                    if (result.error) return done(new Error(result.error))

                    const { data: { favs } } = result

                    expect(favs).to.exist
                    expect(favs.length).to.equal(1)
                    expect(favs[0]).to.equal(duckId)

                    done()
                })
            })
    })

    describe('when fav already exists', () => {
        beforeEach(done => {
            call('PUT', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, { favs: [duckId] }, result => {
                result.error ? done(new Error(result.error)) : done()
            })
        })

        it('should succeed on correct user and duck data', done => {
            toggleFavDuck(id, token, duckId)
                .then(response => {
                    expect(response).to.be.undefined

                    call('GET', token, `https://skylabcoders.herokuapp.com/api/user/${id}`, undefined, result => {
                        if (result.error) return done(new Error(result.error))

                        const { data: { favs } } = result

                        expect(favs).to.exist
                        expect(favs.length).to.equal(0)

                        done()
                    })
                })
        })
    })

    // TODO other cases
})