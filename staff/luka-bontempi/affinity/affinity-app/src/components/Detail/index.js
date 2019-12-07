import React from 'react'
import './index.sass'
import Feedback from '../Feedback'



export default function Detail({ geometric, onNextView }) {
    return <section class="strips">
        {geometric.map(interest => <article class="strips__strip">
            <div class="strip__content">
                <h1 class="strip__title" data-name="Lorem">{interest.id}</h1>
                <div class="strip__inner-text">
                    <h2>{interest.id}</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia sapiente deserunt consectetur, quod reiciendis corrupti quo ea aliquid! Repellendus numquam quo, voluptate.</p>
                    <p>
                        <a href="https://twitter.com/ettrics" target="_blank"><i class="fa fa-twitter"></i></a>
                    </p>
                </div>

            </div>
        </article>)}
        <i class="fa fa-close strip__close"></i>
    </section>
}





// return <section className="view detail ">
//     <h2 className="detail__title">{title}</h2>
//     <img className="detail__image" src={image} />
//     <p className="detail__description">{description}</p>
//     <a className="detail__store" href={link}>Go to store</a>
//     <span className="detail__price">{price}</span>
//     <span className="detail__fav" onClick={event => {
//         event.preventDefault()
//         event.stopPropagation()

//         onFav(id)
//     }}>{isFav ? '🧡' : '💔'}</span>
//     <a className="detail__back" href="" onClick={event => {
//         event.preventDefault()

//         onBack()
//     }}>Go back</a>
// </section>