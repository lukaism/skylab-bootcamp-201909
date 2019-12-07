import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import { registerUser } from '../../logic'
import { withRouter } from 'react-router-dom'


function Register({ history }) {
let error 

    async function handleRegister(event) {
        event.preventDefault()
        try {
            const { name: { value: name }, surname: { value: surname }, email: { value: email }, username: { value: username }, genderId: { value: genderId }, password: { value: password }, day: { value: day }, month: { value: month }, year: { value: year } } = event.target

            
            await registerUser(name, surname, email, username, genderId, password, day, month, year)

            history.push('/login')
        } catch (error) {
            console.error(error)
        }

    }
    function handleGoToLogin(event){
        event.preventDefault()
        history.push('/login')
    }



    return <section className="view register">
        <form onSubmit={handleRegister}>
            <h1 className="register__title">Register</h1>
            <input className="register__field" type="text" name="name" placeholder="name" />
            <input className="register__field" type="text" name="surname" placeholder="surname" />
            <input className="register__field" type="email" name="email" placeholder="e-mail" />
            <input className="register__field" type="username" name="username" placeholder="username" />
            <select className="selector__month" name="genderId">
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
            <input className="register__field" type="password" name="password" placeholder="password" />

            <section className="register__birthdate">
                <h4>Birthday</h4>
                <select className="selector__day" name="day">
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
                <select className="selector__month" name="month">
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
                <input type="number" min="1900" max="2020" step="1" placeholder="2016" name="year" />

            </section>
            <button className="register__submit"><i className="fas fa-sign-in-alt"></i></button>

            <a className="register__toLogin"  onClick={handleGoToLogin}>Sign in</a>
        </form>

        {error && <Feedback message={error} />}
    </section>
}

export default withRouter(Register)