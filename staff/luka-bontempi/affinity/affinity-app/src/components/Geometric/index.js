import React from 'react'
import './index.sass'


export default function ({ instructions }) {
    return <ul className="geometric">
        {instructions.map(block => <li className={`block block--${block.direction}${block.size} ${block.direction} block--${block.interest}`} ></li>)}
    </ul>
}