import React from 'react'

export default function CardRating(props) {
    return (
       
            <span className='rating-stars'>
                <span>{" "}<i class={props.rating >= 1 ? "fa-solid fa-star" : props.rating >= 0.5? "fa-solid fa-star-half-stroke":"fa-regular fa-star"}></i>{" "}</span>
                <span>{" "}<i class={props.rating >= 2 ? "fa-solid fa-star" : props.rating >= 1.5? "fa-solid fa-star-half-stroke":"fa-regular fa-star"}></i>{" "}</span>
                <span>{" "}<i class={props.rating >= 3 ? "fa-solid fa-star" : props.rating >= 2.5? "fa-solid fa-star-half-stroke":"fa-regular fa-star"}></i>{" "}</span>
                <span>{" "}<i class={props.rating >= 4 ? "fa-solid fa-star" : props.rating >= 3.5? "fa-solid fa-star-half-stroke":"fa-regular fa-star"}></i>{" "}</span>
                <span>{" "}<i class={props.rating >= 5 ? "fa-solid fa-star" : props.rating >= 4.5? "fa-solid fa-star-half-stroke":"fa-regular fa-star"}></i>{" "}</span>

        </span>
    )
}
