import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { themeContext } from '../components/ThemeContextProvider';
import imageUser from '../images/user-image.jpg'

const baseUrl = "https://c2c-nu.vercel.app"

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_REQUEST":
            return { ...state, loading: true };
        case "UPDATE_SUCCESS":
            return { ...state, loading: false, success: true, signedInUser: action.payload, error: "" };
        case "UPDATE_FAILS":
            return { ...state, loading: false, success: false, error: action.payload };
        default:
            return { ...state }
    }
}

export default function EditPassword() {
    const navigate = useNavigate();
    const { user, setUser, Theme } = useContext(themeContext)
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        success: false,
        error: "",
        signedInUser: null
    })
    const { loading, success, error, signedInUser } = state;
    const [userName, setUserName] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [Cpassword, setCPassword] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_REQUEST" })
        if (password === Cpassword) {
            try {
                const { data } = await axios.put(`${baseUrl}/api/users/` + user.userId, {
                    userName: userName,
                    first_name: first_name,
                    last_name: last_name,
                    phone: phone,
                    email: email,
                    password: password,
                    address: address

                })
                console.log(data)

                localStorage.setItem('bookUser', JSON.stringify(data))
                dispatch({ type: "UPDATE_SUCCESS", payload: data })

            } catch (err) {
                dispatch({ type: "UPDATE_FAILS", payload: err.message });
            }

        }
        else{
            dispatch({ type: "UPDATE_FAILS", payload: "Password do not match, please try again!" });
        }


    }
    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem('bookUser')
        setUser(null)
    }
    useEffect(() => {
        if (signedInUser) {
            setUser(signedInUser)

        }
        else {
            setUserName(user.userName);
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setPhone(user.phone);
            setEmail(user.email);
            setPassword("");
            setAddress(user.address);
            
        }

    }, [signedInUser])
    return (
        <div className={`form-container ${Theme}`}>
            <h1>Address</h1>
            <div className='form' style={{width:'80%'}}>
                <div className='header-items-login'>
                    <div className='log-image-container'>
                        {/* <img src={Home} alt='error' /> */}
                        <i class="fa-solid fa-lock fa-2xl"></i>
                    </div>
                    <h3>Edit Password</h3>
                </div>
                <form onSubmit={handleSubmit}>

                    <div className='form-item'>
                        <label htmlFor='password'>
                            Password:
                        </label>
                        <input type='password' required value={password} name='password' onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='Cpassword'>
                            Confirm Password:
                        </label>
                        <input type='password' required value={Cpassword} name='Cpassword' onChange={(e) => { setCPassword(e.target.value) }} />
                    </div>
                    {loading &&
                        <div className='form-item-button'>
                            <label></label>
                            <span className='processing'>loading...</span>
                        </div>}
                    {error && <div>
                        <label></label>
                        <span className='error'>Error : {error}</span>
                    </div>}
                    {success && <div>
                        <label></label>
                        <span className='success' style={{ color: "green" }}>Address Successfully Edited</span>
                    </div>}

                    <div className='form-item-button'>
                        <label></label>
                        <button type='submit' style={{ backgroundColor: '#048654', color: "white" }}>Submit</button>

                    </div>
                    {/* <div className='form-item-button'>
          <label></label>
          <button onClick={logoutHandler}>log-out</button>

        </div> */}
                    {/* <div className='form-item-signup'>
          <label></label>
          <span>Already Registered? : <Link to={'/login'}>Log-in</Link></span>

        </div> */}
                </form>
            </div>
        </div>
    )
}
