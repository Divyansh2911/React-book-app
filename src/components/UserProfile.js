import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { themeContext } from './ThemeContextProvider';

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

export default function UserProfile() {
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
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_REQUEST" })
    try {
      const { data } = await axios.put('/api/users/'+user.userId, {
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
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem('bookUser')
    setUser(null)
  }
  useEffect(() => {
    if (signedInUser) {
      setUser(signedInUser)
      
    }
    else{
      setUserName(user.userName);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setPhone(user.phone);
      setEmail(user.email);
      setPassword(user.password);
      setAddress(user.address);
    }

  }, [signedInUser])
  return (
    <div className={`form-container ${Theme}`}>
      <h1>My Profile</h1>
      <div className='form'>
        <div className='header-items-login'>
          <div className='log-image-container'>
            <img src='../../user-image.jpg' alt='error' />
          </div>
          <h3>Edit Account</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='form-item'>
            <label htmlFor='username'>
              UserName:
            </label>
            <input type='text' required value={userName} name='username' onChange={(e) => { setUserName(e.target.value) }} />
          </div>
          <div className='form-item'>
            <label htmlFor='firstName'>
              First Name:
            </label>
            <input type='text' required value={first_name} name='firstName' onChange={(e) => { setFirstName(e.target.value) }} />
          </div>

          <div className='form-item'>
            <label htmlFor='lastName'>
              Last Name:
            </label>
            <input type='text' required value={last_name} name='lastName' onChange={(e) => { setLastName(e.target.value) }} />
          </div>
          <div className='form-item'>
            <label htmlFor='email'>
              Email:
            </label>
            <input type='email' required value={email} name='name' onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className='form-item'>
            <label htmlFor='phone'>
              Phone:
            </label>
            <input type='number' required value={phone} name='phone' onChange={(e) => { setPhone(e.target.value) }} />
          </div>
          <div className='form-item'>
            <label htmlFor='password'>
              Password:
            </label>
            <input type='password' required value={password} name='password' onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <div className='form-item'>
            <label htmlFor='address'>
              Address:
            </label>
            <textarea rows={3} required value={address} name='address' onChange={(e) => { setAddress(e.target.value) }} />
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
          <div className='form-item-button'>
            <label></label>
            <button onClick={logoutHandler}>log-out</button>

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
