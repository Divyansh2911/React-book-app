import React from 'react'
import sell from '../images/sell-illustration.png'
import { Link } from 'react-router-dom'

export default function HomeMiddleComponent() {
  return (
    <div className='home-mid-container'>
      
        <div className='childOne'>
           <img className='sell-illustration' src={sell} alt='Trouble in loading'></img>
        </div>
        <div className='childTwo'>
           <h1 className='child-two-head'>Sell It!</h1>
           <div className='child-two-body'> Sell the books and get its real value , Make books reusable by selling it to interested people.<p>
            </p></div>
            <Link to={'/viewer/create'} className='about-button'>Sell a Book</Link>
        </div>
    </div>
  )
}
