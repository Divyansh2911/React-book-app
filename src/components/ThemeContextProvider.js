import React, { createContext, useEffect, useState } from 'react'

const themeContext = createContext();
 function ThemeContextProvider(props) {
  const lsUser = localStorage.getItem('bookUser')?JSON.parse(localStorage.getItem('bookUser')):null;
  const [user,setUser] = useState(lsUser)
  const [userLocation,setUserLocation] = useState({lat:"",lng:""});
  const [Theme,setTheme] = useState("Light");
  const [bookName,setBookName] = useState('');
 const Locuser = localStorage.getItem('bookUser')?JSON.parse(localStorage.getItem('bookUser')):null;
 if(Locuser && Locuser.address && Locuser.address.long)
 {
   setUserLocation(Locuser.address)
  console.log(userLocation)
} 
  
  const ToggleTheme=(event)=>{
    setTheme(Theme==='Light'?'Dark':'Light')
  }
  // useEffect(() => {
  //   console.log(bookName);
  // }, [bookName]);
  return (
    <themeContext.Provider value={{Theme, ToggleTheme ,user ,setUser,bookName,setBookName,userLocation,setUserLocation}}>
      {props.children}
    </themeContext.Provider>
  )
}
export {themeContext, ThemeContextProvider}
