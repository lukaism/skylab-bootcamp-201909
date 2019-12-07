import React, { useState } from 'react'
import './index.sass'
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"
import Feedback from '../Feedback'
import { modifyUser } from '../../logic'
import { withRouter } from 'react-router-dom'
const { filterz } = require('affinity-util')

function Complete({ history }) {
    let error

    const [rangeValue1, setRangeValue1] = useState(0)
    const [rangeValue2, setRangeValue2] = useState(0)
    const [rangeValue3, setRangeValue3] = useState(0)
    const [rangeValue4, setRangeValue4] = useState(0)
    const [rangeValue5, setRangeValue5] = useState(0)
    const [rangeValueR, setRangeValueR] = useState(0)


    async function handleComplete(event) {
        event.preventDefault()
        try {

            let interest1 = { interestId: { value: interest1 }, value: { rangeValue1 } }
            let interest2 = { interestId: { value: interest2 }, value: { rangeValue2 } }
            let interest3 = { interestId: { value: interest3 }, value: { rangeValue3 } }
            let interest4 = { interestId: { value: interest4 }, value: { rangeValue4 } }
            let interest5 = { interestId: { value: interest5 }, value: { rangeValue5 } }
            let geometric = [interest1, interest2, interest3, interest4, interest5]
            geometric = filterz(geometric)



            const { name: { value: name }, surname: { value: surname }, email: { value: email }, username: { value: username }, genderId: { value: genderId }, description: { value: description }, day: { value: day }, month: { value: month }, year: { value: year }, radius: { value: radius } } = event.target

            await modifyUser(name, surname, email, username, genderId, description, geometric, day, month, year, radius)

            history.push('/candidates')

        } catch (error) {
            console.error(error)
        }

    }


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

    return <section className="view edit-profile">
        <article className="edit-profile__header-buttons">
            <button className="edit-profile__header-button" onClick={handleGoToMyProfile} type="button"><i class="far fa-user"></i></button>
            <button className="logout" onClick={handleLogout}><i className="fas fa-sign-out-alt" ></i></button>
        </article>
        <h1 className="edit-profile__title">Complete Profile</h1>
        <div className="edit-profile__geometric shape"></div>
        <form className="edit-profile__form" onSubmit={handleComplete}>
            <section className="edit-profile__interests">
                <h3>Interests</h3>
                <article className="edit-profile__interest">
                    <select className="selector__interest" name="interest1" >
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

            <article>
                <h4 className="edit-profile__title">Basic info</h4>
                <input className="edit-profile__field" type="text" name="name" placeholder="name" />
                <input className="edit-profile__field" type="text" name="surname" placeholder="surname" />
                <input className="edit-profile__field" type="email" name="email" placeholder="e-mail" />
                <input className="edit-profile__field" type="username" name="surname" placeholder="surname" />
            </article>
            <article className="edit-profile__birthday">
                <h4>Birthday</h4>
                <select className="selector__day">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                </select>
                <select className="selector__month">
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <input type="number" min="1900" max="2020" step="1" placeholder="1980" name="year" />
            </article>
            <article>
                <select className="selector__month" name="genderId">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </article>
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
            <button className="edit-profile__submit" type="submit"><i class="fas fa-archive"></i></button>
        </form>


        <section className="buton">
            <button className="buton__directions" onClick={handleGoToMyProfile} type="button" >My profile</button>
            <button className="buton__directions" onClick={handleGoToMyProfile} type="button">Filter preferences</button>
            <button className="buton__directions" onClick={handleGoToChats} type="button">Chats</button>
        </section>

    </section>

}

export default withRouter(Complete)
