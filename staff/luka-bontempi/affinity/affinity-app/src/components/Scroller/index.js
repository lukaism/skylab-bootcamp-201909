import React from 'react'
import './index.sass'
import Geometric from '../Geometric';

export default function ({ user, onRejectCandidate, onAproveCandidate, candidate, instructions, Geometric, error, Feedback }) {
    let today = new Date
    return <section classNameName="view profile">
        <button className="logout "><i className="fas fa-sign-out-alt"></i></button>
        <div className="profile__info"></div>
        <Geometric instructions={instructions}/>
        <div className="profile__geometric shape"></div>
        <img className="profile__image" src="https://cdn.pixabay.com/photo/2017/03/25/18/06/color-2174065__340.png" alt="" />
        <h2 className="profile__name">{candidate.name}</h2>
        <h2 className="profile__age">{Math.floor(candidate.birthdate - today)}</h2>
        <button className="profile__aprove" onClick={event => {
            event.preventDefault()

            onAproveCandidate(user.id, candidate.id)
        }}><i className="far fa-smile"></i></button>
        <button className="profile__reject" onClick={event => {
            event.preventDefault()

            onRejectCandidate(user.id, candidate.id)
        }}><i className="fas fa-arrow-left"></i></button>



        <section className="buton">
            <button className="buton__directions">My profile</button>
            <button className="buton__directions">Filter preferences</button>
            <button className="buton__directions">Chats</button>
        </section>


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