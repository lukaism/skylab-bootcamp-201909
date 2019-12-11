import React, { useState } from 'react'
import './index.sass'
import "react-input-range/lib/css/index.css"
import { withRouter } from 'react-router-dom'



function Detail({ user }) {


    return <section className="detail">
            {user.geometric.map(interest => <article key={interest.id} className={` detail__interest detail-interest--${interest.interestId}`} >
                <div className="detail__bg">
                    <h2 className="detail__title">{interest.interestId}</h2>
                    <p className="detail__description">{interest.description}</p>
                </div>
            </article>)}
        </section>
}






export default withRouter(Detail)