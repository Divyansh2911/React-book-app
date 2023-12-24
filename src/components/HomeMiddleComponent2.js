import React from 'react'
import { Link } from 'react-router-dom'
import buy from '../images/buy.svg'

export default function HomeMiddleComponent2() {
  return (
    <div className='home-mid-container'>
        <div className='childTwo'>
           <h1 className='child-two-head'>Buy It!</h1>
           <div className='child-two-body'>Go through books you are intrested in and grab the deal by contacting to seller.<p>
            </p></div>
            <Link to={'/sell'} className='about-button'>Buy a Book</Link>
        </div>
       <div className='childOne'>
           <img className='sell-illustration2' src={buy} alt='Trouble in loading'></img>
        </div>
    </div>
  )
}
