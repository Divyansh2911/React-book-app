import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { themeContext } from './ThemeContextProvider';
import image from '../images/user-image.jpg'

const baseUrl = "https://c2c-nu.vercel.app"
const initialState={
    loading:false,
    success:false,
    loggedInUser:null,
    error:""
}
const reducer = (state,action)=>{
    switch(action.type){
        case "LOGIN_REQUEST":
            return {...state,loading:true,error:""}
        case "LOGIN_SUCCESS":
            return {...state, success:true,loading:false,error:"",loggedInUser:action.payload}
        case "LOGIN_FAILS":
            return {...state,success:false,loading:false,error:action.payload}
        default:
            return {...state};
    }
}
export default function Login() {
    const navigate = useNavigate();
    const {user,setUser,Theme} = useContext(themeContext);
    const [state,dispatch] = useReducer(reducer,initialState)
    const {loading,success,loggedInUser,error} = state;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async(event) => {
        event.preventDefault();
        dispatch({type:"LOGIN_REQUEST"})
        try{
            // const {data} = await axios.get(`https://backend1-smki.onrender.com/api/users?email=${email}&password=${password}`);
            const {data} = await axios.get(`${baseUrl}/api/users?email=${email}&password=${password}`);
            if(data.length>0){
                localStorage.setItem('bookUser',JSON.stringify(data[0]))
                dispatch({type:"LOGIN_SUCCESS",payload:data[0]})
            }
            else{
                dispatch({type:"LOGIN_FAILS",payload:"Invalid Email or Password"})
            }
        }
        catch(err){
            dispatch({type:"LOGIN_FAILS", payload:err.message})
        }
    }
    useEffect(()=>{
        if(loggedInUser){
            setUser(loggedInUser)
            return navigate("/viewer/user")
        }
    },[loggedInUser])
    return (
        <div className={`form-container ${Theme} `}>
            <h1>Login!</h1>
            <div className='form'>
                <div className='header-items-login'>
                    <div className='log-image-container'>
                        <img src={image} alt='error'/>
                    </div>
                    <h3>Log-in to your account</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-item'>
                        <label htmlFor='email'>
                        <i class="fa-solid fa-envelope"></i> Email:
                        </label>
                        <input type='email' id='email' required value={email} name='name' onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='password'>
                        <i class="fa-solid fa-lock"></i> Password:
                        </label>
                        <input type='password' required value={password} name='password' onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    {loading && 
                    <div className='form-item-button'>
                    <label></label>
                    <span className='processing'>loading...</span>
                </div> }
                {error && <div>
                    <label></label>
                    <span className='error'>Error : {error}</span>
                    </div>}
                    
                    <div className='form-item-button'>
                        <label></label>
                        <button type='submit'>Log-in</button>

                    </div>
                    <div className='form-item-signup'>
                        <label></label>
                        <span>New User? : <Link to={'/signup'}>Register</Link></span>

                    </div>
                </form>
            </div>
        </div>
        // <div></div>
    )
}
