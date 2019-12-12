import React, { useState, useEffect } from 'react';
import './index.sass'
import Register from '../Register'
import Login from '../Login'
import MyProfile from '../MyProfile'
import AccountDetail from '../AccountDetail'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { retrieveUser } from '../../logic'
import Scroller from '../Scroller'
import Finish from '../Finish'
import Edit from '../Edit'
import Chats from '../Chats'
import Chat from '../Chat'


export default withRouter(function ({ history }) {

    const [user, setUser] = useState()
    const { token } = sessionStorage;
    useEffect(() => {
        const { token } = sessionStorage;

        (async () => {
            if (token) {
                const user = await retrieveUser(token)

                setUser(user)

            }
        })()
    }, [sessionStorage.token])


    return <>
        <Route path="/login" render={() => token ? <Redirect to="/finish" /> : <Redirect to="/login" />} />
        <Route path="/finish" render={() => user && user.geometric !== [] ? <Redirect to="/myprofile" /> : <Redirect to="/finish" />} />
        <Route exact path="/" render={() => token ? <Redirect to="/login" /> : <Login />} />
        <Route path="/register" render={() => <Register />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/finish" render={() => <Finish />} />
        <Route path="/myprofile" render={() => <MyProfile />} />
        <Route path="/editprofile" render={() => <Edit />} />
        <Route path="/candidates" render={() => <Scroller />} />
        <Route path="/chats" render={() => <Chats />} />
        <Route path='/users/:userId' render={({ match: { params: { userId } } }) =>  token && userId ? <> <AccountDetail userId={userId} />    </> :<Redirect to="/myprofile" />} /> 
        <Route path='/chat/:chatId' render={({ match: { params: { chatId } } }) =>  token ? <>   <Chat chatId={chatId}/>    </> :<Login/>} />  

    </>
})
