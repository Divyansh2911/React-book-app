import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { themeContext } from '../components/ThemeContextProvider'

const baseUrl = "https://c2c-nu.vercel.app"

export default function Orders() {
  const [items,setItems] = useState([])
  const [list ,setList] = useState([])
  const { user, setUser, Theme, bookName, setBookName } = useContext(themeContext);
 
  
  const handleDelete =async(event,id)=>{
      console.log(id)
    try{
      await axios.delete(`${baseUrl}/api/items/`+id)
      // console.log(data)
    }
    catch(err){
      console.log(err)
    }
    setList([])
  }
  // console.log(items)
  useEffect(()=>{
    console.log('run')
    const fetchData = async()=>{
      const {data} = await axios.get(`${baseUrl}/api/items/`+user.userId);
      console.log(data)
      setItems(data);
      // console.log(data);
    }
    fetchData();
    setList(items)
    
  },[list])
  return (
    <div>
        <h1> Books for Sale</h1>

<table id="customers">
  <tr >
    <th>Title</th>
    <th>Price</th>
    <th>Posted On</th>
    <th>Delete</th>
  </tr>
  {items?items.map((value,index)=>(
    <tr key={index}>
      <td>{value.mainTitle}</td>
      <td>{value.price}</td>
      <td >{value.createdAt}</td>
      <td><i class="fa-solid fa-trash"  onClick={(event)=>handleDelete(event,value.id)}></i></td>
    </tr>
  )):""}
  {/* <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>Germany</td>
  </tr> */}
  
</table>
    </div>
  )
}
