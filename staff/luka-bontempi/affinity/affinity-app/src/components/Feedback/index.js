import React from 'react'
import './index.sass'

export default function ({ message }) {
    return <section className="feedback _hiden">
        <span className="feedback__icon" role="img">👻</span>
        <p className="feedback__message">{message}</p>
        <span className="feedback__icon" role="img">👻</span>
    </section>
}