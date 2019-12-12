import React, { useState } from 'react'
import './index.sass'
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"
import Feedback from '../Feedback'
import { modifyUser } from '../../logic'
import { withRouter } from 'react-router-dom'

function Complete({ history }) {
    let error

    const [rangeValue, setRangeValue] = useState(50)
    const [fields, setFields] = useState([{ value: 'hi' }]);

    function handleChange(i, event) {
        event.preventDefault()
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
    }

    function handleAdd(event) {
        event.preventDefault()

        const values = [...fields];
        values.push({ value: 'hi' });
        setFields(values);
        console.log(values)
        console.log(fields)
    }

    function handleRemove(i) {

        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    async function handleComplete(event) {
        event.preventDefault()
        try {


            const { name: { value: name }, surname: { value: surname }, email: { value: email }, username: { value: username }, genderId: { value: genderId }, description: { value: description }, geometric: { geometric }, day: { value: day }, month: { value: month }, year: { value: year }, radius: { value: radius } } = event.target

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
        <section className="edit-profile__buttons">
            <button className="logout" onClick={handleLogout}><i className="fas fa-sign-out-alt" type="button"></i></button>
            <button className="buton__directions" onClick={handleGoToMyProfile} type="button">My profile</button>
        </section>
        <h1 className="edit-profile__title">Complete Profile</h1>
        {/* <h3 className="edit-profile__name">{user.name}</h3> */}
        <div className="edit-profile__geometric shape"></div>
        <form className="edit-profile__form" onSubmit={() =>{
            console.log("peta aqui");handleComplete()}}>
            {fields && fields.map((field, idx) => {
                return (
                    <section className="edit-profile__interest" key={`${field}-${idx}`}>
                        <select className="selector__interest" name="interest" onChange={e => handleChange(idx, e)}>
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
                                value={rangeValue}
                                onChange={value => setRangeValue(value)} />
                        </div>
                        <button className="edit-profile__remove" onClick={handleRemove(idx)} type="button"><i className="fas fa-eraser"></i></button>
                    </section>
                )
            })}


            <button className="edit-profile__add-interest" onClick={handleAdd} type="button"><i className="fas fa-plus-circle"></i></button>
            <div>
                <h4 className="edit-profile__title">Basic info</h4>
                <input className="edit-profile__field" type="text" name="name" placeholder="name" />
                <input className="edit-profile__field" type="text" name="surname" placeholder="surname" />
                <input className="edit-profile__field" type="email" name="email" placeholder="e-mail" />
                <input className="edit-profile__field" type="username" name="surname" placeholder="surname" />
            </div>
            <div className="edit-profile__birthday">
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
                <input type="number" min="1900" max="2020" step="1" value="2016" />
            </div>
            <div>
                <select className="selector__month" name="genderId">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>
            <button className="register__submit" type="submit"><i className="fas fa-sign-in-alt"></i></button>
        </form>


        <section className="buton">
            <button className="buton__directions" onClick={handleGoToMyProfile} type="button" >My profile</button>
            <button className="buton__directions" onClick={handleGoToMyProfile} type="button">Filter preferences</button>
            <button className="buton__directions" onClick={handleGoToChats} type="button">Chats</button>
        </section>

    </section>

}

export default withRouter(Complete)
