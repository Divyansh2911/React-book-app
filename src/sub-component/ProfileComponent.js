import React, { useState } from 'react'

const baseUrl = "https://c2c-nu.vercel.app"

export default function ProfileComponent(props) {
      const {Profile,setProfile} = props
      console.log(props)
      const {edit_Profile,edit_Address,edit_Book_Details,edit_Password} = Profile;
  return (
   
    <>
    <div className={`grid-list-items ${edit_Profile?"active":""}`} onClick={() => {
                  setProfile({
                    edit_Profile: true,
                    edit_Address: false,
                    edit_Book_Details: false,
                    edit_Password: false
                  })
                }}>
                  <h5 className='grid-list-items-head'>Edit Profile</h5>
                  <small className='grid-list-items-para'>Edit your personal details</small>
                </div>
                <div className={`grid-list-items ${edit_Address?"active":""}`} onClick={() => {
                  setProfile({
                    edit_Profile: false,
                    edit_Address: true,
                    edit_Book_Details: false,
                    edit_Password: false
                  })
                }}>
                  <h5 className='grid-list-items-head'>Edit Address</h5>
                  <small className='grid-list-items-para'>Choose your location on map</small>
                </div>
                <div className={`grid-list-items ${edit_Book_Details?"active":""}`} onClick={() => {
                  setProfile({
                    edit_Profile: false,
                    edit_Address: false,
                    edit_Book_Details: true,
                    edit_Password: false
                  })
                }}>
                  <h5 className='grid-list-items-head'>Edit Book Details</h5>
                  <small className='grid-list-items-para'>Edit book details which are on sale</small>
                </div>
                <div className={`grid-list-items ${edit_Password?"active":""}`} onClick={() => {
                  setProfile({
                    edit_Profile: false,
                    edit_Address: false,
                    edit_Book_Details: false,
                    edit_Password: true
                  })
                }}>
                  <h5 className='grid-list-items-head'>Password</h5>
                  <small className='grid-list-items-para'>Choose your location on map</small>
                </div></>
  )
}
