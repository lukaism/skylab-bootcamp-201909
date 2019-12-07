import React, { useState, useEffect } from 'react';
import './index.sass'
import Register from '../Register'
import Login from '../Login'
import MyProfile from '../MyProfile'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { registerUser, authenticateUser, retrieveUser, modifyUser, updateLocation, rejectCandidate, aproveCandidate, checkConnection, getCandidates, createChat, retrieveChat, retrieveChats, sendMessage } from '../../logic'
import Scroller from '../Scroller';
import Complete from '../Complete';
import Finish from '../Finish';

export default withRouter(function ({ history }) {
    const [user, setUser] = useState()
    const [candidate, setCandidate] = useState([])
    const { token } = sessionStorage;
    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const user = await retrieveUser(token)

                setUser(user)

                // await getCandidates(token)
            }
        })()
    }, [sessionStorage.token])

    async function getCandidates(token) {
        const candidates = await getCandidates(token)

        // setCandidate(TODO)
    }

    function handleGoToRegister() { history.push('/register') }

    function handleGoToLogin() { history.push('/login') }

    function handleGoToProfileScroller() { history.push('/profilescroller') }

    function handleGoToMyProfile() { history.push('/myprofile') }

    function handleGoToChats() { history.push('/chats') }



    async function handleLogin(username, password) {
        try {
            const token = await authenticateUser(username, password)



            history.push('/board')
        } catch (error) {
            console.error(error)
        }
    }

    function handleGoBack() { history.push('/') }

    function handleLogout() {
        sessionStorage.clear()

        handleGoBack()
    }

    async function handleEdit(id) {
        try {


            await modifyUser(token)

            await retrieveUser(token)
        } catch (error) {
            console.error(error)
        }
    }
    async function handleRejectCandidate(id, id1) {
        try {


            await rejectCandidate(token, id1)

            // await nextCandidate(token)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleAproveCandidate(id, id1) {
        try {


            await aproveCandidate(token, id1)

            // await nextCandidate(token)
        } catch (error) {
            console.error(error)
        }
    }
    async function handleCheckConnection(id, id1) {
        try {


            await checkConnection(token, id1)

            await createChat(token, id1)
        } catch (error) {
            console.error(error)
        }
    }

    async function handleRetrieveChats(id, id1) {
        try {


            await retrieveChats(token)

        } catch (error) {
            console.error(error)
        }
    }

    async function handleCreateChat(id, id1) {
        try {


            await retrieveChats(token)

        } catch (error) {
            console.error(error)
        }
    }


    const { candidates } = sessionStorage

    return <>
        <Route exact path="/" render={() => token ? <Redirect to="/candidates" /> : <Login onLogin={handleLogin} onToRegister={handleGoToRegister} />} />
        <Route path="/register" render={() => token ? <Redirect to="/board" /> : <Register onToLogin={handleGoToLogin} />} />
        <Route path="/login" render={() => token ? <Redirect to="/complete" /> : <Login onLogin={handleLogin} onToRegister={handleGoToRegister} />} />
        {/* <Route path="/candidates" render={() => token ? <Scroller user={name}  onLogout={handleLogout} onRejectCandidate={handleRejectCandidate} onAproveCandidate={handleAproveCandidate} onCheckConnection={handleCheckConnection} onCreateChat={handleCreateChat} /> : <Redirect to="/" />} /> */}
        {/* <Route path="/myProfile" render={() => token ? <MyProfile  onLogout={handleLogout} onEdit={handleEdit}  /> : <Redirect to="/" />} /> */}
        <Route path="/complete" render={() => <Complete /> } />
        <Route path="/finish" render={() => <Finish /> } />
        <Route path="/myprofile" render={() => <MyProfile user={user} /> } />


    </>
})
