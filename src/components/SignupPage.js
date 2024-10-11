import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { themeContext } from './ThemeContextProvider';
import image from '../images/user-image.jpg'
import MapComponenetRegisterPage from '../sub-component/MapComponentRegisterPage';

const baseUrl = "https://c2c-nu.vercel.app"

const reducer = (state, action) => {
    switch (action.type) {
        case "SIGN_IN_REQUEST":
            return { ...state, loading: true };
        case "SIGN_IN_SUCCESS":
            return { ...state, loading: false, success: true, signedInUser: action.payload, error: "" };
        case "SIGN_IN_FAILS":
            return { ...state, loading: false, success: false, error: action.payload };
        default:
            return { ...state }
    }
}
export default function SignupPage() {
    const navigate = useNavigate();
    const { user, setUser ,Theme} = useContext(themeContext)
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
    const [address, setAddress] = useState({lat:"",lng:""});
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "SIGN_IN_REQUEST" })
        try {
            const { data } = await axios.post(`${baseUrl}/api/users`, {
                userId: Math.floor(Math.random() * 1000000),
                userName: userName,
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                email: email,
                password: password,
                address: address,

            })
            console.log(data)

            localStorage.setItem('bookUser', JSON.stringify(data))
            dispatch({ type: "SIGN_IN_SUCCESS", payload: data })

        } catch (err) {
            dispatch({ type: "SIGN_IN_FAILS", payload: err.message });
        }

    }
    useEffect(() => {
        if (signedInUser) {
            setUser(signedInUser)
            return navigate('/viewer/user')
        }
    }, [signedInUser])
    return (
        <div className={`form-container ${Theme}`}>
            <h1>Sign up!</h1>
            <div className='form'>
                <div className='header-items-login'>
                    <div className='log-image-container'>
                        <img src={image} alt='error' />
                    </div>
                    <h3>Create Account</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-item'>
                        <label htmlFor='username'>
                        <i class="fa-solid fa-user-secret fa-lg"></i> UserName:
                        </label>
                        <input type='text' required value={userName} name='username' onChange={(e) => { setUserName(e.target.value) }} />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='firstName'>
                        <i class="fa-solid fa-user"></i> First Name:
                        </label>
                        <input type='text' required value={first_name} name='firstName' onChange={(e) => { setFirstName(e.target.value) }} />
                    </div>

                    <div className='form-item'>
                        <label htmlFor='lastName'>
                        <i class="fa-solid fa-user"></i>  Last Name:
                        </label>
                        <input type='text' required value={last_name} name='lastName' onChange={(e) => { setLastName(e.target.value) }} />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='email'>
                        <i class="fa-solid fa-envelope"></i>   Email:
                        </label>
                        <input type='email' required value={email} name='name' onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='phone'>
                        <i class="fa-solid fa-phone"></i>  Phone:
                        </label>
                        <input type='number' required value={phone} name='phone' onChange={(e) => { setPhone(e.target.value) }} />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='password'>
                        <i class="fa-solid fa-lock"></i>  Password:
                        </label>
                        <input type='password' required value={password} name='password' onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='address'>
                        <i class="fa-solid fa-house"></i>  Address:
                        </label>
                        {/* <textarea rows={4} required value={address} name='address' onChange={(e) => { setAddress(e.target.value) }} /> */}
                        <div className='map-signup-page' style={{width:'100%'}}><MapComponenetRegisterPage address = {address} setAddress={setAddress}/></div>
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
                        <span className='success'>User successfully registered</span>
                    </div>}

                    <div className='form-item-button'>
                        <label></label>
                        <button type='submit'>Submit</button>

                    </div>
                    <div className='form-item-signup'>
                        <label></label>
                        <span>Already Registered? : <Link to={'/login'}>Log-in</Link></span>

                    </div>
                </form>
            </div>
        </div>
    )
}
