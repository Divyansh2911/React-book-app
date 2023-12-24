import React, { useState } from 'react'

export default function Dashboard() {

  const [Dashboard, setDashboard] = useState({
    chat: true,
    saved_Offers: false,

  })
  const { chat, saved_Offers } = Dashboard;
  return (
    <>
      <div className={`grid-list-items ${chat ? "active" : ""}`} onClick={() => {
        setDashboard({
          chat: true,
          saved_Offers: false,
        })
      }}>
        <h5 className='grid-list-items-head'>Chat</h5>
        <small className='grid-list-items-para'>Your chat section</small>
      </div>
      <div className={`grid-list-items ${saved_Offers ? "active" : ""}`} onClick={() => {
        setDashboard({
          chat: false,
          saved_Offers: true,
        })
      }}>
        <h5 className='grid-list-items-head'>Saved Offers</h5>
        <small className='grid-list-items-para'>Offers you showed intrest</small>
      </div>
      </>
  )

}
