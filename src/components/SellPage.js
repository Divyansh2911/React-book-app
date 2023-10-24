import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import SellerComponent from './SellerComponent'
import { themeContext } from './ThemeContextProvider'


export default function SellPage() {
    const {Theme} = useContext(themeContext)
    const [sellList,setSellList] =useState("")
   
    useEffect(() => {
        const getList = async () => {
            // dispatch({ type: "LIST_REQUEST" })
            try {
                const {data} = await axios.get("/api/items")
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
        <div className={`seller-card-container ${Theme}`}>
           {/* <aside>Bar</aside> */}
            {sellList?sellList.map((value)=>(<div>
                <SellerComponent id={value.id} description={value.description} price={value.price} title={value.title} userId={value.userId}/>
            </div>)):""}
        </div>
    )
}
