import React, { useState, useEffect } from 'react';
import './index.sass'
import Register from '../Register'
import Login from '../Login'
import MyProfile from '../MyProfile'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { registerUser, authenticateUser, retrieveUser, modifyUser, updateLocation, rejectCandidate, aproveCandidate, checkConnection, getCandidates, createChat, retrieveChat, retrieveChats, sendMessage } from '../../logic'
import Scroller from '../Scroller';
import Finish from '../Finish';
import Edit from '../Edit';

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
        <Route path="/login" render={() => token ? <Redirect to="/login" /> : <Redirect to="/login" />} />
        {/* <Route path="/candidates" render={() => token ? <Scroller user={name}  onLogout={handleLogout} onRejectCandidate={handleRejectCandidate} onAproveCandidate={handleAproveCandidate} onCheckConnection={handleCheckConnection} onCreateChat={handleCreateChat} /> : <Redirect to="/" />} /> */}
        {/* <Route path="/myProfile" render={() => token ? <MyProfile  onLogout={handleLogout} onEdit={handleEdit}  /> : <Redirect to="/" />} /> */}
        <Route exact path="/" render={() => token? <Redirect to="/login" /> : <Login  />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/finish" render={() => <Finish />} />
        <Route path="/myprofile" render={() => <MyProfile />} />
        <Route path="/editprofile" render={() => <Edit />} />
        <Route path="/candidates" render={() => <Scroller />} />
        {/* <Route path="/candidates" render={() => <Scroller /> } /> */}



    </>
})
