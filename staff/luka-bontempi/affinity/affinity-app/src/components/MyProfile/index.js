import React, { useState, useEffect } from 'react'
import './index.sass'
import { retrieveUser } from '../../logic'
import { withRouter } from 'react-router-dom'
import Geometric from '../Geometric'
import Feedback from '../Feedback'
import Description from '../Description'
import Footer from '../Footer'
// import Description from '../Description'
import Detail from '../Detail'
const { blocks } = require('affinity-util/block')
const { arrayShuffle } = require('affinity-util/polyfills')

// const { polyfills: { blocks } } = require('affinity-util')





function MyProfile({ history }) {
    debugger
    let error
    let today = new Date

    const { token } = sessionStorage
    const [user, setUser] = useState()
    let [view, setView] = useState('myprofile')
    const [instructions, SetInstructions] = useState([])


    useEffect(() => {
        debugger
        (async () => {
            if (token) {
                const user = await retrieveUser(token)
                setUser(user)
                hongda(user)
            }
        })()
    }, [setUser])
    async function hongda(user) {
        debugger
        let instructions = await blocks(user.geometric)
        instructions = await arrayShuffle(instructions)
        console.log(instructions)
        SetInstructions(instructions)

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

        {user && view == 'myprofile' && <>
            <article className="my-profile__info" onClick={handleGoToDetail}>
                <Geometric instructions={instructions} />
            </article>
            <h2 className="my-profile__name">{user.name} <span className="my-profile__age">({Math.floor((today - (new Date(user.birthdate))) / (60 * 60 * 24 * 365 * 1000))})</span></h2>
        </>}

        {user && view == 'detail' && <> 
            <article className="my-profile__detail" onClick={handleGoToDescription}>
                <Detail user={user} />
            </article>
        </>}
        {user && view == 'description' && <> <article className="my-profile__detail" onClick={handleGoToProfile}>
            <Description user={user} />
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
export default withRouter(MyProfile)