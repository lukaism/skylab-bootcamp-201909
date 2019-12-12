import React, { useEffect, useState } from 'react'
// import AccountResume from '../Account-Resume'
import ChatItem from '../Chat-Item'
import { withRouter } from 'react-router-dom'
import './index.sass'
import { retrieveChat, sendMessage } from '../../logic'
import Message from '../Message'
import Feedback from '../Feedback'
import Footer from '../Footer';



function Chat({ chatId }) {

    const { token } = sessionStorage
    const [messages, setMessages] = useState([])
    const [error, setError] = useState()
    let refresher



    useEffect(() => {
        if (typeof refresher !== 'number') refresher = setInterval(() => {
            (async () => {
                try {
                    setMessages(await retrieveChat(token, chatId))
                    console.log(messages)
                } catch (error) {
                    setError(error.message)
                }
            })()
        }, 1000);

        (async () => {
            try {
                setMessages(await retrieveChat(token, chatId))

            } catch (error) {
                setError(error.message)
            }
        })()

        return () => { clearInterval(refresher) }
    }, [setMessages])

    async function handleSendMessage(e) {
        e.preventDefault()
        console.log("hola")
        const { message: { value: message } } = e.target
        try {
            await sendMessage(chatId, token, message)
        } catch (error) {
            setError(error.message)
        }
    }




    return <section className=" post ">
        {/* <div className=" post__header ">
        <img className=" post-image " src=" https://media.licdn.com/dms/image/C4D03AQGJs_fj9WmNsQ/profile-displayphoto-shrink_200_200/0?e=1579737600&amp;v=beta&amp;t=aXY597WUWHurjEtV8y9ORSngTUm7RYWjjGdoHvpUXCg " alt=" profile "/>
        <div className=" header-info ">
            <p className=" header-item header__user-username ">Julian Assange</p>
            <p className=" header-item header__user-introduction ">Dramatic actor</p>
        </div>
    </div> */}

        <ul>
            {messages && messages.map(message => <li key={message._id}> <Message message={message} /></li>)}
        </ul>

        <section className="new-comment ">

            <form action=" " className="new-comment__form form" onSubmit={handleSendMessage}>
                <textarea className="form__textarea " name="message" cols="30 " rows="2 " placeholder="send a comment here ... "></textarea>
                <button className="form__button"><i className="material-icons ">send</i></button>
            </form>
        </section>

        {error && <Feedback text={error} />}
        <Footer />
    </section>

        }
export default withRouter(Chat)