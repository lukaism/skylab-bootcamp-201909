import React, { useState } from 'react'
import './index.sass'
import "react-input-range/lib/css/index.css"
import { withRouter } from 'react-router-dom'

function Description({ user }) {

    return <section className="description">
            <p className="description-text">{user.description}</p>
        </section>
}

export default withRouter(Description)