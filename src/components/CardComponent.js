
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import CardRating from './CardRating';

export default function CardComponent(props) {
    // console.log(props.isbn)
    const navigate = useNavigate();
    
    return (
        <div className='Card-container'>
            <div className='thumbnail-container'>
                <div className='book-image'>
                    <div id='bookThumb'>
                        <img src={props.imageLinks} alt='Trouble in loading!' />
                    </div>
                </div>
            </div>
            <div className='info-container'>
                <h3 id='title'>{props.title}</h3>
                <p>-{props.author ? props.author : ""}</p>
                <div className='inner-info-container'>
                    <div className='rating'>
                        <div className='rating-item'>
                        
                            {props.rating ? <span><strong>Rating:</strong><div className='rating-star'><CardRating rating={props.rating}/> </div> &#40;{props.ratingCount ? <span>{props.ratingCount}</span> : ""}&#41;</span> : ""}
                        </div>
                        <div className='rating-item'>
                            {props.publishDate ? <span><strong>Publish Date : </strong>{props.publishDate} </span> : ""}
                        </div>
                    </div>
                    <div className='synopsis'>
                        <div className='synopsis-items'>
                            {/* {console.log(props.isbn)} */}
                            {/* <button className='read-button' onClick={handleClick}></button> */}
                            <button className='read-button'><Link to={'/viewer/'+props.isbn} target='blank' >
                            Read
                        </Link></button>
                        </div>
                        <div className='synopsis-items'>

                        </div>
                    </div>
                </div>
                <div className='synopsis-end' >
                    <details>
                        <summary>About:</summary>
                        <span>{props.searchInfo}</span>
                    </details>
                </div>
            </div>

        </div>
    )
}
