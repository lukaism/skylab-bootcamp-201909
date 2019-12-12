import React, { useState, useEffect } from 'react'
import './index.sass'
import { retrieveCandidate } from '../../logic'
import { withRouter } from 'react-router-dom'
import Geometric from '../Geometric'
import Feedback from '../Feedback'
import Description from '../Description'
import Footer from '../Footer'
// import Description from '../Description'
import Detail from '../Detail'
const { blocks } = require('affinity-util/block')
const { arrayShuffle } = require('affinity-util/polyfills')






function AccountDetail({ history, userId }) {

    let error
    let today = new Date

    const { token } = sessionStorage
    const [acount, setAcount] = useState()
    let [view, setView] = useState('myprofile')
    const [instructions, SetInstructions] = useState([])


    useEffect(() => {

        (async () => {
            if (token) {
                try {
                    setAcount(await retrieveCandidate(token, userId))
                    makeInstructions(acount)

                } catch ({ error }) {
                    console.log(error)

                }
            }
        })()
    }, [setAcount])
    async function makeInstructions(acount) {

        try {
            let instructions = blocks(acount.geometric)
            instructions = arrayShuffle(instructions)
            console.log(instructions)
            SetInstructions(instructions)

        } catch ({ error }) {
            console.log(error)

        }

    }

    function handleGoToDetail(event) {
        event.preventDefault()
        view = 'detail'
        setView(view)
    }

    function handleGoToDescription(event) {
        event.preventDefault()
        view = 'description'
        setView(view)
    }

    function handleGoToProfile(event) {
        event.preventDefault()
        view = 'myprofile'
        setView(view)
    }

    return <section className="view my-profile">

        {acount && view == 'myprofile' && <>
            <article className="my-profile__info" onClick={handleGoToDetail}>
                <Geometric instructions={instructions} />
            </article>
            <h2 className="my-profile__name">{acount.name} <span className="my-profile__age">({Math.floor((today - (new Date(acount.birthdate))) / (60 * 60 * 24 * 365 * 1000))})</span></h2>
        </>}

        {acount && view == 'detail' && <>
            <article className="my-profile__detail" onClick={handleGoToDescription}>
                <Detail user={acount} />
            </article>
        </>}
        {acount && view == 'description' && <> <article className="my-profile__description" onClick={handleGoToProfile}>
            <Description user={acount} />
        </article>
        </>}

        <Footer />

        {error && <Feedback message={error} />}
    </section>

}

{/* <button className="buton__directions"><a className="login__toRegister" href="" onClick={event => {
    event.preventDefault()

    onBack()
}}>Filter preferences</a></button>


    <a className="login__toRegister" href="" onClick={event => {
        event.preventDefault()

        onBack()
    }}>Go back</a> */}
export default withRouter(AccountDetail)