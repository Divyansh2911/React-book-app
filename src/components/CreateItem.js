import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { themeContext } from './ThemeContextProvider';
import axios from 'axios';
import SignupPage from './SignupPage';

const reducer = (state, action) => {
    switch (action.type) {
        case "Create_Item_REQUEST":
            return { ...state, loading: true };
        case "Create_Item_SUCCESS":
            return { ...state, loading: false, success: true, createdItem: action.payload, error: "" };
        case "Create_Item_FAILS":
            return { ...state, loading: false, success: false, error: action.payload };
        default:
            return { ...state }
    }
}
export default function CreateItem() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(themeContext)
    console.log(user.userId)
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        success: false,
        error: "",
        createdItem: null
    })
    const { loading, success, error, createdItem } = state;
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
 

    const handleSubmit = async(e)=>{
        e.preventDefault();
        dispatch({type:"Create_Item_REQUEST"});
        try{
            const {data} = await axios.post('/api/items',{
                userId:user.userId,
                title:title,
                description:description,
                price:price,
                id:Math.floor(Math.random()*1000000)
            })
            console.log(data)
            dispatch({type:"Create_Item_SUCCESS",payload:data});
        }
        catch(err){
            dispatch({type:"Create_Item_FAILS",payload:err.message})
        }
    }
    useEffect(()=>{
        // if(createdItem){
        //     navigate('/')
        // }
    },[createdItem])
  return (
    <div>
         <div className='form-container'>
            <h1>Sign up!</h1>
            <div className='form'>
                <div className='header-items-login'>
                    <div className='log-image-container'>
                        <img src='../../user-image.jpg' alt='error' />
                    </div>
                    <h3>Create Account</h3>
                </div>
                <form onSubmit={handleSubmit}>
                   
                    <div className='form-item'>
                        <label htmlFor='price'>
                            Price:
                        </label>
                        <input type='number' required value={price} name='price' onChange={(e) => { setPrice(e.target.value) }} />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='title'>
                            Title:
                        </label>
                        <input type='text' required value={title} name='title' onChange={(e) => { setTitle(e.target.value) }} />
                    </div>

                    <div className='form-item'>
                        <label htmlFor='description'>
                            Description:
                        </label>
                        <textarea rows={6} required value={description} name='description' onChange={(e) => { setDescription(e.target.value) }} />
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
                        <span className='success'>Book successfully added to sell.</span>
                    </div>}

                    <div className='form-item-button'>
                        <label></label>
                        <button type='submit'>Submit</button>

                    </div>
                    {/* <div className='form-item-signup'>
                        <label></label>
                        <button>Log-out</button>

                    </div> */}
                </form>
            </div>
        </div>
    </div>
  )
}
