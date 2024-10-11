import React, { useContext, useEffect, useState } from 'react'
import { themeContext } from './ThemeContextProvider'
// import  Carousel  from './Carousel2'
import Carousel2 from './Carousel2';
import Carousel from './Carousel';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MapWindow from '../sub-component/MapWindow';

const baseUrl = "https://c2c-nu.vercel.app"

export default function SellerVisit(props) {

  const { Theme } = useContext(themeContext)
  const [sellList, setSellList] = useState("")
  const [seller, setSeller] = useState({})
  const { id } = useParams();
  const images = [

    // Add more image URLs here
  ];
  useEffect(() => {
    const getList = async () => {
      // dispatch({ type: "LIST_REQUEST" })

      try {
        const { data } = await axios.get(`${baseUrl}/api/items/own/` + id)
        console.log(data)
        setSellList(data)
        const {data: seller} = await axios.get(`${baseUrl}/api/users/`+data.userId)
        console.log(seller)
        setSeller(seller)
        // dispatch({type:"LIST_SUCCESS",payload:data})
      }
      catch (err) {
        // dispatch({ type: "LIST_FAILS", payload: err.message })
      }
    }
    getList();
  }, [])
  // console.log(seller.address.lat)
  return (
    <div className={`visit ${Theme}`}>
      {/* <Carousel2 className='carousel' images={images} /> */}
      <div className={`visit-container `} >

        <div className='visit-grid-one'>
          <div className='image-constainer-seller-visit' style={{ padding: '10px 10px 10px 10px', display: 'flex',       flexDirection: 'row' }}>
            <img src={sellList.image} alt='Trouble in loading' style={{ height: '250px', width: '180px', padding: '20px 3px 7px 25px'}}></img>
            <div className='image-side-header' style={{ width: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }}><h1>{sellList.mainTitle}</h1>
              <p>-{sellList.author}</p>
              <p style={{ fontSize: '1.5rem' }}><i>{sellList.subTitle}</i></p>
              <button style={{width:"60%", backgroundColor:'#069c54',cursor:'pointer', margin:'65px auto 8px auto', borderRadius:'8px', padding:'8px 2px' , color:'white'}}>Add To MyLibrary</button>
            </div>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <h3>Description</h3> - {sellList.description}</div>
        </div>
        <div className='visit-grid-two'>
          <div className='seller-visit-head' style={{ padding: '10px', display: 'flex',flexDirection: 'column', textAlign:'center'}}>
            <h3 style={{fontWeight:'400', backgroundColor:'#ececec61'}}>Contact Seller</h3>
            <p style={{fontWeight:'500', fontSize:'38px' , textTransform:'capitalize' }}><i>{seller.first_name} {seller.last_name}</i></p>
            <p><i class="fa-solid fa-envelope"></i>&nbsp; &nbsp;{seller.email}</p>
            <p><i class="fa-solid fa-phone"> </i>&nbsp; &nbsp;{seller.phone}</p>
          </div>
          {/* <div style={{height:'100%',textAlign:'end' }}><p style={{textAlign:'end' }}>-{(sellList.createdAt)}</p></div> */}
          {seller && seller.address?<>
            <div className='map-window-seller-visit'style={{width:'100%', margin:'auto'}}><MapWindow sellerLocLng={seller?seller.address.lng:28.23673281} sellerLocLat = {seller?seller.address.lat:74.23673281}></MapWindow></div>
          </>:""}
          
        </div>
      </div>
    </div>
  )
}
