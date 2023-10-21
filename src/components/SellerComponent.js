import React from 'react'

export default function SellerComponent(props) {
  return (
    <div className='seller-card'>
        <div className='seller-image'><img src='http://books.google.com/books/content?id=kRqeDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' alt='error'></img></div>
        <div className='seller-content'><h3>{props.title}</h3>
        <span>-Alebert johnysins</span>
        </div>
    </div>
  )
}
