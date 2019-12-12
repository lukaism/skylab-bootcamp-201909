import React, { useState } from 'react'
import './index.sass'
import "react-input-range/lib/css/index.css"
import { withRouter } from 'react-router-dom'

function Description({ currentCandidate }) {

    return <section className="description">
            <p className="description-text">{currentCandidate.description}</p>
        </section>
}

export default withRouter(Description)