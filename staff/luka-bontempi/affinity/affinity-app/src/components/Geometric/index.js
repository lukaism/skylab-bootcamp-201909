import React, { useState } from 'react'
import './index.sass'
import "react-input-range/lib/css/index.css"
import { withRouter } from 'react-router-dom'



function Geometric({ instructions }) {
    return <ul className="geometric">
        {instructions.map(block => <li key={block.id} className={`block block--${block.direction}${block.size}  block--${block.interest}`} ></li>)}
    </ul>
}
export default withRouter(Geometric)

