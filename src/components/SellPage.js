import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import SellerComponent from './SellerComponent'
import { themeContext } from './ThemeContextProvider'
// import { Carousel } from 'bootstrap'
import Carousel from "./Carousel";
import sellImage from '../images/sell-image/42589.jpg'
import carousel from "../images/Carousel.png"

const baseUrl = "https://c2c-nu.vercel.app"

export default function SellPage() {
    const { Theme } = useContext(themeContext)
    const [sellList, setSellList] = useState("")
   


    const photos = [
        // "https://images.dog.ceo/breeds/hound-basset/n02088238_12555.jpg",
        carousel,
        carousel
        // Add more image URLs here
    ];

    useEffect(() => {
        const getList = async () => {
            // dispatch({ type: "LIST_REQUEST" })
            try {
                const { data } = await axios.get(`${baseUrl}/api/items`)

                console.log(data)
                setSellList(data)
                // dispatch({type:"LIST_SUCCESS",payload:data})
            }
            catch (err) {
                // dispatch({ type: "LIST_FAILS", payload: err.message })
            }
        }
        getList();
    }, [])
    return (
        <div >
             <div style={{  display:"flex",width:'100%',textAlign:'center', justifyContent:'center', background:'#dedede54',margin:'6px auto'}}><h1 style={{margin:"8px auto"}}>Store <i class="fa-solid fa-cart-shopping"></i></h1></div>
            <Carousel images={photos} />
            {/* <aside>Bar</aside> */}
            <div style={{  display:"flex",width:'100%',textAlign:'center', justifyContent:'center', background:'#dedede54'}}><h3 style={{margin:"5px auto"}} >Newest</h3></div>
            <div className={`seller-card-container ${Theme}`}>
                {sellList ? sellList.map((value) => (
                    
                    <SellerComponent id={value.id} description={value.description} price={value.price} mainTitle={value.mainTitle} userId={value.userId} image={value.image} author={value.author} subTitle={value.subTitle}  />
                    
                )) : ""}
            </div>

        </div>
    )
}
