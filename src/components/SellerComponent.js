import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { themeContext } from './ThemeContextProvider'
import axios from 'axios'

const baseUrl = "https://c2c-nu.vercel.app"

export default function SellerComponent(props) {
  const { Theme ,user} = useContext(themeContext)
  const [seller,setSeller] = useState("")
  console.log(props.seller)
  // console.log(props)
  // const base64String = btoa(String.fromCharCode(...new Uint8Array(props.img.data)));
  // console.log(props.img.data);
  // console.log(base64String)
  useEffect(() => {
    const getList = async () => {
        // dispatch({ type: "LIST_REQUEST" })
        try {
            const {data:sellerUser} = await axios.get(`${baseUrl}/api/users/`+props.userId)
            setSeller(sellerUser);
            // dispatch({type:"LIST_SUCCESS",payload:data})
        }
        catch (err) {
            // dispatch({ type: "LIST_FAILS", payload: err.message })
        }
    }
    getList();
    console.log(user);
}, [])
  return (
    <Link to={`/sell/seller/${props.id}`}>
    <div className='seller-card'>
      <div className='seller-image'><img src={`${props.image}`} alt='error'></img></div>
      <div className='seller-content'><h3>{props.mainTitle}</h3>
        {/* {console.log(props.image)} */}
        <span><small>-{props.author}</small></span>
        <span style={{margin:"17px 0px" , fontWeight:"500"}}>Seller - {seller.userName}</span>
        {/* <span>Seller - {user.userName}</span> */}
        {/* <small style={{height:"100%", display:"flex" , justifyContent:"center" , alignItems:"end"}}>-{user.createdAt}</small> 
   */}
      </div>
      
      <div className='seller-purchase-content' style={{display:"flex" , justifyContent:"center" , alignItems:"center"}} >
          <h3>
            <i class="fa fa-inr" aria-hidden="true"></i>
            {props.price}
        </h3>
        </div>
    </div>
    </Link>
  )
}
