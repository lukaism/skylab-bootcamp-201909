import React, { useState, useEffect } from 'react'
import './index.sass'
import { getCandidates, aproveCandidate, rejectCandidate, checkConnection, retrieveUser } from '../../logic'
import { withRouter } from 'react-router-dom'
import Geometric from '../Geometric'
import Feedback from '../Feedback'
import Footer from '../Footer'
import DetailCandidate from '../DetailCandidate'
import DescriptionCandidate from '../DescriptionCandidate'
import updateLocation from '../../logic/update-location';
const { blocks } = require('affinity-util/block')
const { filterCandidates } = require('affinity-util/filtercandidates')
const { arrayShuffle } = require('affinity-util/polyfills')


function Scroller({ history }) {

    let error
    let today = new Date


    const { token } = sessionStorage
    const [user, setUser] = useState()
    const [control, setControl] = useState()
    let [candidates, setCandidates] = useState([])
    const [currentCandidate, setCurrentCandidate] = useState({})
    const [instructions, SetInstructions] = useState([])
    const [position, setPosition] = useState([0, 0])
    const [haveUsersLocation, setHaveUsersLocation] = useState(false)
    let [view, setView] = useState('candidateprofile')
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    useEffect(() => {

        if (!haveUsersLocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setPosition([position.coords.latitude, position.coords.longitude])
                handleUpdateLocation([position.coords.latitude, position.coords.longitude])
                setHaveUsersLocation(true)
            }, error => console.log(error.message), options)
        }

        (async () => {

            if (token) {

                const user = await retrieveUser(token)
                setUser(user)
                let candidates = await getCandidates(token)
                candidates = filterCandidates(user, candidates)
                setCandidates(candidates)
                let currentCandidate = candidates[0]
                setCurrentCandidate(currentCandidate)
                makeInstructions(currentCandidate)
            }
        })()
    }, [control])
    async function makeInstructions(currentCandidate) {
        if (currentCandidate) {
            let instructions = await blocks(currentCandidate.geometric)
            instructions = await arrayShuffle(instructions)
            SetInstructions(instructions)
        }

    }
    async function handleUpdateLocation(location) {
        try {
            await updateLocation(token, location)


        } catch (error) {
            console.error(error)
        }


    }
    async function handleRejectCandidate() {
        try {
            await rejectCandidate(token, currentCandidate.id)


            // setCandidates(candidates)
            setControl(!control)
        } catch (error) {
            console.error(error)
        }


    }
    async function handleAproveCandidate() {
        try {

            await aproveCandidate(token, currentCandidate.id)
            handleCheckConnection()

            // setCandidates(candidates)
            setControl(!control)
        } catch (error) {
            console.error(error)
        }
    }
    async function handleCheckConnection() {
        try {
            await checkConnection(token, currentCandidate.id)

        } catch (error) {
            console.error(error)
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
        view = 'candidateprofile'
        setView(view)
    }


    return <>
        <section className="view profile">
            {candidates != [] && currentCandidate && view == 'candidateprofile' && <>
                <article className="profile__info" onClick={handleGoToDetail}>
                    <Geometric instructions={instructions} />
                </article>

                <h2 className="profile__name">{currentCandidate.name}</h2>
                <h2 className="profile__age">{Math.floor((today - (new Date(currentCandidate.birthdate))) / (60 * 60 * 24 * 365 * 1000))}</h2>
                <section className="profile__butons">
                    <button className="profile__reject" onClick={handleRejectCandidate}><i className="fas fa-arrow-left"></i></button>
                    <button className="profile__aprove" onClick={handleAproveCandidate}><i className="far fa-smile"></i></button>
                </section>
            </>}

            {candidates != [] && currentCandidate && view == 'detail' && <>
                <article className="profile__detail" onClick={handleGoToDescription}>
                    <DetailCandidate currentCandidate={currentCandidate} />
                </article>
            </>}
            {candidates != [] && currentCandidate && view == 'description' && <> <article className="profile__description" onClick={handleGoToProfile}>
                <DescriptionCandidate currentCandidate={currentCandidate} />
            </article>
            </>}
            {/* {candidates == []  && <> <article className="my-profile__detail" >
            <p>No Candidates available</p>
        </article>
        </>} */}


            {error && <Feedback message={error} />}
        </section>
        <Footer />
    </>
}

export default withRouter(Scroller)





