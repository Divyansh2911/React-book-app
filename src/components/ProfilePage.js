import React, { useContext, useEffect, useReducer, useState } from 'react'
import image from '../images/user-image.jpg'
import { useNavigate } from 'react-router-dom';
import { themeContext } from './ThemeContextProvider';
import axios from 'axios';
import Profile from '../sub-component/ProfileComponent';
import Dashboard from '../sub-component/Dashboard';
import Orders from '../sub-component/Orders';
import ProfileComponent from '../sub-component/ProfileComponent';
import EditProfile from '../sub-component/EditProfile';
import EditAddress from '../sub-component/EditAddress';
import EditPassword from '../sub-component/EditPassword';
import { confirmWrapper, confirm } from '../sub-component/Confirm'
// import MapAddress from '../sub-component/MapAddress';



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
const newReducer = (currentState, action) => {
  switch (action.type) {
    case "PROFILE":
      return { ...currentState, profile: true, dashboard: false, onSale: false, myLibrary: false, setting: false };
    case "DASHBOARD":
      return { ...currentState, profile: false, dashboard: true, onSale: false, myLibrary: false, setting: false };
    case "ONSALE":
      return { ...currentState, profile: false, dashboard: false, onSale: true, myLibrary: false, setting: false };
    case "MYLIBRARY":
      return { ...currentState, profile: false, dashboard: false, onSale: false, myLibrary: true, setting: false };
    case "SETTING":
      return { ...currentState, profile: false, dashboard: false, onSale: false, myLibrary: false, setting: true };
    default:
      return { ...currentState };
  }
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser, Theme } = useContext(themeContext)
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    success: false,
    error: "",
    signedInUser: null
  })
  const [currentState, dispatch2] = useReducer(newReducer, {
    profile: true,
    dashboard: false,
    onSale: false,
    myLibrary: false,
    setting: false
  })
  const [Profile, setProfile] = useState({
    edit_Profile: true,
    edit_Address: false,
    edit_Book_Details: false,
    edit_Password: false
  })
  const { edit_Profile, edit_Address, edit_Book_Details, edit_Password } = Profile;
  const { loading, success, error, signedInUser } = state;
  const { profile, dashboard, onSale, myLibrary, setting } = currentState;
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
      const { data } = await axios.put('/api/users/' + user.userId, {
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
  const logoutHandler = async (e) => {
    e.preventDefault();
    
    dispatch2({ type: "SETTING" });
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
    setPassword(user.password);
    setAddress(user.address);
  }

}, [signedInUser])
return (
  <div className={`profile-container ${Theme}`} >
    <div className='left-profile'>
      <img src={image} alt='error' className='user-image'></img>
      <h3>Account</h3>
      <div className='profile-left-list-item'>
        <ul>
          <li className={profile ? "active" : ""} onClick={() => { dispatch2({ type: "PROFILE" }) }}><i class="fa-solid fa-user"></i><span>Profile</span></li>
          <li className={dashboard ? "active" : ""} onClick={() => { dispatch2({ type: "DASHBOARD" }) }}><i class="fa-solid fa-list"></i>Dashboard</li>
          <li className={onSale ? "active" : ""} onClick={() => { dispatch2({ type: "ONSALE" }) }}><i class="fa-solid fa-clock-rotate-left"></i>Orders</li>
          <li className={myLibrary ? "active" : ""} onClick={() => { dispatch2({ type: "MYLIBRARY" }) }}><i class="fa-solid fa-bookmark"></i>My Library</li>
          <li className={setting ? "active" : ""} onClick={logoutHandler}><i class="fa-solid fa-right-from-bracket"></i>Log-out</li>
        </ul>
      </div>
    </div>
    <div className='right-profile-container'>
      <div className='profile-top-bar'></div>
      <div className='right-profile'>

        <div className='right-sub-left-grid-container'>

          {profile ? <ProfileComponent Profile={Profile} setProfile={setProfile} /> : ""}
          {dashboard ? <Dashboard /> : ""}
          {onSale ? <div className={`grid-list-items ${onSale ? "active" : ""}`}>
            <h5 className='grid-list-items-head'>All Orders</h5>
            <small className='grid-list-items-para'>Your Books for sale</small></div> : ""}

        </div>
        <div className='right-sub-right-grid-container'>
          {profile ? <>{edit_Profile ? <><EditProfile /></> : ""}{edit_Address ? <><EditAddress /></> : ""}{edit_Book_Details ? <><Orders/></> : ""}{edit_Password ? <><EditPassword /></> : ""}</> : ""}




          {onSale ? <Orders /> : ""}
          {/* <MapAddress/> */}
        </div>
      </div>
    </div>

  </div>
)
}
