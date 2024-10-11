import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { themeContext } from './ThemeContextProvider';
import axios from 'axios';
// import SignupPage from './SignupPage';
import SellSearchBar from './SellSearchBar';
import sellImage from '../images/sell-image/42589.jpg'

const baseUrl = "https://c2c-nu.vercel.app"

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
    const { user, setUser, Theme } = useContext(themeContext)
    const [sellBook, setSellBook] = useState({})
    // console.log(user.userId)
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        success: false,
        error: "",
        createdItem: null
    })
    const { loading, success, error, createdItem } = state;
    const [mainTitle, setMainTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [pages, setPages] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("")
    const [images, setImages] = useState({data:""})
    const [postImage, setPostImage] = useState('l');
    
    function convertToBase64(file){
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload=()=>{
                // console.log(fileReader.result)
                
                resolve(fileReader.result);
            }
            fileReader.onerror=(error)=>{
                reject(error);
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "Create_Item_REQUEST" });
        
        try {
            const { data } = await axios.post(`${baseUrl}/api/items`, {
                userId: user.userId,
                mainTitle: mainTitle,
                subTitle: subTitle,
                author: author,
                description: description,
                pages: pages,
                price: price,
                quantity: quantity,
                image: postImage,
                // img:{data:postImage,contentType:"happy"},
                id: Math.floor(Math.random() * 1000000)
            })
            console.log(data)
            dispatch({ type: "Create_Item_SUCCESS", payload: data });
        }
        catch (err) {
            dispatch({ type: "Create_Item_FAILS", payload: err })
        }
    }
    
    const [loadingUpload,setLoadingUpload] = useState(false);
    const [errorUpload,setErrorUpload] = useState("")
    const uploadFileHandler =async(e)=>{
        console.log(postImage)
        const file = e.target.files[0];
        // console.log(file)
        const base64 = await convertToBase64(file)
        // console.log(base64)
        setPostImage(base64);
        
        // setImages({...images, data:base64})
        console.log(postImage)
        // console.log(images)
        const bodyFormData = new FormData();
        bodyFormData.append('image',postImage);
        bodyFormData.append('mainTitle',mainTitle)
        // console.log(bodyFormData)
        // setLoadingUpload(true);
        try{
        //     const {data} = await axios.post('/api/uploads',bodyFormData,
        //     {headers:{'Content-Type':'multipart/form-data'}
        // }) 
        // console.log(data);
        // console.log(bodyFormData)
        //     setImages(data);
        //     setLoadingUpload(false)
        //     console.log(images)
    }
        catch(err){
            // setErrorUpload(err.message)
            console.log(err.message)
            // setLoadingUpload(false)
        }
    }
   
    useEffect(() => {
        // if(createdItem){
        //     navigate('/')
        // }
        // console.log(sellBook)
        if (sellBook) {
            setMainTitle(sellBook.title)
            setSubTitle(sellBook.subtitle)
            setDescription(sellBook.description)
            if (sellBook.authors) {
                setAuthor(sellBook.authors[0])
            }
            setPages(sellBook.pageCount)
            // console.log(sellBook)
        }
        else{
          
        }

    }, [createdItem, sellBook])
    console.log(postImage)
    return (
        <div>
            <div className={`form-container ${Theme}`}>
                <h1>Sell A Book!</h1>
                <div className='form'>
                    <div className='header-items-login'>
                        <div className='log-image-container'>
                            <img src={sellImage} alt='error' />
                        </div>
                        <SellSearchBar sellBook={sellBook} setSellBook={setSellBook} />
                        <h3>Tell about book you want to sell</h3>
                    </div>
                    <form  onSubmit={handleSubmit}>
                    
                        <div className='form-item'>
                            <label htmlFor='mainTitle'>
                                Main Title:
                            </label>
                            <input type='text' required value={mainTitle} name='mainTitle' onChange={(e) => { setMainTitle(e.target.value) }} />
                        </div>
                        <div className='form-item'>
                            <label htmlFor='subTitle'>
                                Sub Title:
                            </label>
                            <input type='text' required value={subTitle} name='subTitle' onChange={(e) => { setSubTitle(e.target.value) }} />
                        </div>
                        <div className='form-item'>
                            <label htmlFor='author'>
                                Author / Publisher:
                            </label>
                            <input type='text' required value={author} name='author' onChange={(e) => { setAuthor(e.target.value) }} />
                        </div>

                        <div className='form-item'>
                            <label htmlFor='pages'>
                                No. of Pages:
                            </label>
                            <input type='number' required value={pages} name='pages' onChange={(e) => { setPages(e.target.value) }} />
                        </div>

                        <div className='form-item'>
                            <label htmlFor='price'>
                                Price:
                            </label>
                            <input type='number' required value={price} name='price' onChange={(e) => { setPrice(e.target.value) }} />
                        </div>
                        <div className='form-item'>
                            <label htmlFor='quantity'>
                                Quantity:
                            </label>
                            <input type='number' required value={quantity} name='quantity' onChange={(e) => { setQuantity(e.target.value) }} />
                        </div>
                        <div className='form-item'>
                            <label htmlFor='description'>
                                Description:
                            </label>
                            <textarea rows={6} required value={description} name='description' onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                        <div className='form-item' >
                            <label></label>
                            <input multiple accept='.jpeg, .png ,.jpg' onChange={uploadFileHandler} type='file' style={{ backgroundColor: "transparent" }} />
                        </div>
                        <span className='warning'><small>Image size should be under 100 kb.</small></span>
                        {loading &&
                            <div className='form-item-button'>
                                <label></label>
                                <span className='processing'>loading...</span>
                            </div>}
                        {error && <div>
                            <label></label>
                            <span className='error'>Error : {error.message}</span>
                        </div>}
                        {error  && <span className='error'>File size too large</span>}
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
