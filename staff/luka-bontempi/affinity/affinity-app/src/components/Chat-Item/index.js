import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './index.sass'
import { createChat } from '../../logic'
import Feedback from '../Feedback'
import Geometric from '../Geometric'
const { blocks } = require('affinity-util/block')
const { arrayShuffle } = require('affinity-util/polyfills')

function ChatItem({ history, account: { _id: accountId, name, geometric }, chatId }) {

    const { token } = sessionStorage
    const [error, setError] = useState()
    const [instructions, SetInstructions] = useState([])


    useEffect(() => {

        (async () => {
            if (token) {

                makeInstructions(geometric)
            }
        })()
    }, [SetInstructions])


    async function makeInstructions(geometric) {

        let instructions = await blocks(geometric)
        instructions = await arrayShuffle(instructions)
        console.log(instructions)
        SetInstructions(instructions)

    }

    function onGoToUser(e) {
        e.preventDefault()
        history.push(`/users/${accountId}`)

    }


    async function handleChat(e) {
        e.preventDefault()
        try {
            e.stopPropagation()
            const chatId = await createChat(token, accountId)
            history.push(`/chat/${chatId}`)
        } catch (error) {
            setError(error.message)
        }
    }

    function handleGoChat(e) {
        e.preventDefault()
        history.push(`/chat/${chatId}`)
    }

    return <div className="acc-resume"  >
        <div className="acc-resume__geometric-container" onClick={onGoToUser}>
        
        </div>
        <div className=" acc-resume__info info">
            <p className=" info__username" onClick={handleGoChat}>{name}</p>
        </div>
        {error && <Feedback text={error} />}
    </div>
}


export default withRouter(ChatItem)