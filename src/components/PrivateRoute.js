import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { themeContext } from "./ThemeContextProvider";

const PrivateRoute = ()=>{
    const {user} = useContext(themeContext)
    
    console.log(user)
    return(
        // <Routes>
        //    <Route path="/profile/*" element={(props)=>{user?<Component {...props}></Component>:<Navigate to={'/login'}></Navigate>}}/>
        
        // </Routes>
        user?<Outlet/>:<Navigate to={'/login'}></Navigate>

    )
}
export default PrivateRoute;