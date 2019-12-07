import React, { useState, useEffect } from 'react'
import './index.sass'
import { retrieveUser } from '../../logic'
import { withRouter } from 'react-router-dom'
import Geometric from '../Geometric'
import Feedback from '../Feedback'
const { buildInstructions, blockCounter, blocks, checkpercentage, defineBlocks, getRandomInt, setproportion } = require('affinity-util/block')
// const { polyfills: { blocks } } = require('affinity-util')




function MyProfile({ history }) {
    let error
    let today = new Date
    debugger
    const { token } = sessionStorage
    const [user, setUser] = useState()
    const [instructions, SetInstructions] = useState()


    useEffect(() => {
        debugger
        (async () => {
            if (token) {
                const user = await retrieveUser(token)

                const instructions = blocks(user.geometric)
                setUser(user)
            }
        })()
    })


    function handleGoToMyProfile(event) {
        event.preventDefault()
        history.push('/myprofile')
    }
    function handleGoToChats(event) {
        event.preventDefault()
        history.push('/chats')
    }
    function handleGoToCandidates(event) {
        event.preventDefault()
        history.push('/candidates')
    }
    function handleLogout() {

        sessionStorage.clear()

        handleGoBack()
    }
    function handleGoBack() {

        history.push('/')
    }







    return <section classNameName="view my-profile">

        {user && <> <button className="logout "><i className="fas fa-sign-out-alt"></i></button>
            <article className="my-profile__info">
                <Geometric instructions={instructions} />
            </article>
            <div className="my-profile__geometric shape"></div>

            <h2 className="my-profile__name">{user.name}</h2>
            <h2 className="my-profile__age">{Math.floor(user.birthdate - today)}</h2>


            <section className="buton">
                <button className="buton__directions" onClick={handleGoToMyProfile} type="button" >My profile</button>
                <button className="buton__directions" onClick={handleGoToMyProfile} type="button">Filter preferences</button>
                <button className="buton__directions" onClick={handleGoToChats} type="button">Chats</button>
            </section>
        </>}

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