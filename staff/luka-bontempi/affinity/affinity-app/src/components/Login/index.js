import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import { authenticateUser, retrieveUser } from '../../logic'
import { withRouter } from 'react-router-dom'

function Login({ history }) {
    let error

    async function handleLogin(event) {
        event.preventDefault()
        try {
            const { username: { value: username }, password: { value: password } } = event.target


            const token = await authenticateUser(username, password)
            sessionStorage.token = token
            const user = await retrieveUser(token)
            sessionStorage.id = user.id
            history.push('/finish')

        } catch (error) {

        }

    }
    function handleGoToRegister(event) {
        event.preventDefault()
        history.push('/register')
    }

    return <section className="view login">
        <form onSubmit={handleLogin}>
            <h1 className="login__title">Login</h1>
            <input className="login__field" type="username" name="username" placeholder="username" />
            <input className="login__field" type="password" name="password" placeholder="password" />
            <button className="login__submit"><i className="fas fa-key"></i></button>
            <br></br>
            <br></br>
            <a className="login__toRegister" href="" onClick={handleGoToRegister}>Sign up</a>
        </form>

        {error && <Feedback message={error} />}
    </section>
}

export default withRouter(Login)