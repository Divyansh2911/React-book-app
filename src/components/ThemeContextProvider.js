import React, { createContext, useState } from 'react'

const themeContext = createContext();
 function ThemeContextProvider(props) {
  const lsUser = localStorage.getItem('bookUser')?JSON.parse(localStorage.getItem('bookUser')):null;
  const [user,setUser] = useState(lsUser)
  const [Theme,setTheme] = useState("Light");
  const ToggleTheme=(event)=>{
    setTheme(Theme==='Light'?'Dark':'Light')
  }
  return (
    <themeContext.Provider value={{Theme, ToggleTheme ,user ,setUser}}>
      {props.children}
    </themeContext.Provider>
  )
}
export {themeContext, ThemeContextProvider}
