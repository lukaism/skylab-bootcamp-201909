import React, { useState, useEffect } from 'react'
import './index.sass'
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"
import Feedback from '../Feedback'
import { modifyUser, updateLocation } from '../../logic'
import { withRouter } from 'react-router-dom'
const { polyfills: { filterz } } = require('affinity-util')

function Finish({ history }) {
    let error
    const { token } = sessionStorage

    const [rangeValue1, setRangeValue1] = useState(50)
    const [rangeValue2, setRangeValue2] = useState(0)
    const [rangeValue3, setRangeValue3] = useState(0)
    const [rangeValue4, setRangeValue4] = useState(0)
    const [rangeValue5, setRangeValue5] = useState(0)
    const [rangeValueR, setRangeValueR] = useState(1)
    const [position, setPosition] = useState([0, 0])
    const [haveUsersLocation, setHaveUsersLocation] = useState(false)
    let [view, setView] = useState('candidateprofile')
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }

    useEffect(() => {
        (async () => {
            if (!haveUsersLocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    setPosition([position.coords.latitude, position.coords.longitude])
                    handleUpdateLocation([position.coords.latitude, position.coords.longitude])
                    setHaveUsersLocation(true)
                }, error => console.log(error.message), options)
            }
        })()
    }, [])

    async function handleUpdateLocation(position) {
        try {
            await updateLocation(token, position)


        } catch (error) {
            console.error(error)
        }
    }

    async function handleComplete(event) {
        // event.preventDefault()
        try {
            console.log(event.target)

            let name, surname, genderId, day, month, year, radius

            const { description: { value: description }, interest1: {  value: interestId1 }, interest2: {  value: interestId2 }, interest3: {  value: interestId3 }, interest4: {  value: interestId4 }, interest5: {  value: interestId5 } } = event.target
            radius = rangeValueR
            

            let interestP1 = {}
            interestP1.interestId = interestId1
            interestP1.value = rangeValue1
            let interestP2 = {}
            interestP2.interestId = interestId2
            interestP2.value = rangeValue2
            let interestP3 = {}
            interestP3.interestId = interestId3
            interestP3.value = rangeValue3
            let interestP4 = {}
            interestP4.interestId = interestId4
            interestP4.value = rangeValue4
            let interestP5 = {}
            interestP5.interestId = interestId5
            interestP5.value = rangeValue5
            let geometric = [interestP1, interestP2, interestP3, interestP4, interestP5]
            geometric = filterz(geometric)
            await modifyUser(token, name, surname, genderId, geometric, description, day, month, year, radius)

            history.push('/myprofile')

        } catch (error) {
            console.error(error)
        }

    }


    function handleGoToMyProfile(event) {
        event.preventDefault()
        history.push('/myprofile')
    }
    function handleLogout() {

        sessionStorage.clear()

        handleGoBack()
    }
    function handleGoBack() {

        history.push('/')
    }

    return <section className="view edit-profile">
        <article className="edit-profile__header-buttons">
            <button className="edit-profile__header-button" onClick={handleGoToMyProfile} type="button"><i className="far fa-user"></i></button>
            <button className="logout" onClick={handleLogout}><i className="fas fa-sign-out-alt" ></i></button>
        </article>
        <h1 className="edit-profile__title">Complete Profile</h1>
        <div className="edit-profile__geometric shape"></div>
        <form className="edit-profile__form" onSubmit={handleComplete}>
            <section className="edit-profile__interests">
                <h3>Interests</h3>
                <article className="edit-profile__interest">
                    <select className="selector__interest" name="interest1" >
                        <option value="music">Music</option>
                        <option value="movies">Movies</option>
                        <option value="sports">Sports</option>
                        <option value="books">Books</option>
                        <option value="sdnr">Sex Drugs and Rockn'Roll</option>
                        <option value="nature">Nature</option>
                        <option value="traveling">Traveling</option>
                        <option value="videogames">Videogames</option>
                        <option value="art">Art</option>
                        <option value="gastronomy">Gastronomy</option>
                    </select>
                    <div className="edit-profile__slider-block">
                        <InputRange
                            maxValue={100}
                            minValue={1}
                            value={rangeValue1}
                            onChange={value => setRangeValue1(value)} />
                    </div>

                </article>
                <article className="edit-profile__interest">
                    <select className="selector__interest" name="interest2" >
                        <option value="z">Select an interest</option>
                        <option value="sports">Sports</option>
                        <option value="music">Music</option>
                        <option value="movies">Movies</option>
                        <option value="books">Books</option>
                        <option value="sdnr">Sex Drugs and Rockn'Roll</option>
                        <option value="nature">Nature</option>
                        <option value="traveling">Traveling</option>
                        <option value="videogames">Videogames</option>
                        <option value="art">Art</option>
                        <option value="gastronomy">Gastronomy</option>
                    </select>
                    <div className="edit-profile__slider-block">
                        <InputRange
                            maxValue={100}
                            minValue={0}
                            value={rangeValue2}
                            onChange={value => setRangeValue2(value)} />
                    </div>

                </article>
                <article className="edit-profile__interest">
                    <select className="selector__interest" name="interest3" >
                        <option value="z">Select an interest</option>
                        <option value="sports">Sports</option>
                        <option value="music">Music</option>
                        <option value="movies">Movies</option>
                        <option value="books">Books</option>
                        <option value="sdnr">Sex Drugs and Rockn'Roll</option>
                        <option value="nature">Nature</option>
                        <option value="traveling">Traveling</option>
                        <option value="videogames">Videogames</option>
                        <option value="art">Art</option>
                        <option value="gastronomy">Gastronomy</option>
                    </select>
                    <div className="edit-profile__slider-block">
                        <InputRange
                            maxValue={100}
                            minValue={0}
                            value={rangeValue3}
                            onChange={value => setRangeValue3(value)} />
                    </div>

                </article>
                <article className="edit-profile__interest">
                    <select className="selector__interest" name="interest4" >
                        <option value="z">Select an interest</option>
                        <option value="sports">Sports</option>
                        <option value="music">Music</option>
                        <option value="movies">Movies</option>
                        <option value="books">Books</option>
                        <option value="sdnr">Sex Drugs and Rockn'Roll</option>
                        <option value="nature">Nature</option>
                        <option value="traveling">Traveling</option>
                        <option value="videogames">Videogames</option>
                        <option value="art">Art</option>
                        <option value="gastronomy">Gastronomy</option>
                    </select>
                    <div className="edit-profile__slider-block">
                        <InputRange
                            maxValue={100}
                            minValue={0}
                            value={rangeValue4}
                            onChange={value => setRangeValue4(value)} />
                    </div>

                </article>
                <article className="edit-profile__interest">
                    <select className="selector__interest" name="interest5" >
                        <option value="z">Select an interest</option>
                        <option value="sports">Sports</option>
                        <option value="music">Music</option>
                        <option value="movies">Movies</option>
                        <option value="books">Books</option>
                        <option value="sdnr">Sex Drugs and Rockn'Roll</option>
                        <option value="nature">Nature</option>
                        <option value="traveling">Traveling</option>
                        <option value="videogames">Videogames</option>
                        <option value="art">Art</option>
                        <option value="gastronomy">Gastronomy</option>
                    </select>
                    <div className="edit-profile__slider-block">
                        <InputRange
                            maxValue={100}
                            minValue={0}
                            value={rangeValue5}
                            onChange={value => setRangeValue5(value)} />
                    </div>

                </article>
            </section>
            <article className="edit-profile__description">
                <h3>Description</h3>
                <textarea className="edit-profile__description-text" maxLength="500" name="description"></textarea>
            </article>

            <article className="edit-profile__radius">
                <h4>Search Radius</h4>
                <div className="edit-profile__slider-block radius">
                    <InputRange
                        maxValue={100}
                        minValue={1}
                        value={rangeValueR}
                        onChange={value => setRangeValueR(value)} />
                </div>
            </article>
            <button className="edit-profile__submit" type="button"><i className="fas fa-door-open"></i></button>
        </form>

    </section>

}

export default withRouter(Finish)

// const { description: { value: description }, rangeValueR : { value: radius },interest1: {  value: interestId1 }, rangeValue1: { value: value1 },interest2: {  value: interestId2 }, rangeValue2: { value: value2 },interest3: {  value: interestId3 }, rangeValue3: { value: value3 }, interest4: {  value: interestId4 }, rangeValue4: { value: value4 }, interest5: {  value: interestId5 }, rangeValue5: { value: value5 }} = event.target

// const { name: { value: name }, surname: { value: surname }, email: { value: email }, username: { value: username }, genderId: { value: genderId }, password: { value: password }, day: { value: day }, month: { value: month }, year: { value: year }, description: { value: description }, rangeValueR : { value: radius },interest1: {  value: interestId1 }, rangeValue1: { value: value1 },interest2: {  value: interestId2 }, rangeValue2: { value: value2 },interest3: {  value: interestId3 }, rangeValue3: { value: value3 }, interest4: {  value: interestId4 }, rangeValue4: { value: value4 }, interest5: {  value: interestId5 }, rangeValue5: { value: value5, geometric: {value: geometric} }} = event.target
