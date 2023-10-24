import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { themeContext } from './ThemeContextProvider'
import axios from 'axios'


const initialState = {
  loading: false,
  success: false,
  result: [],
  error: ""
}
const reducer = (state, action) => {
  switch (action.type) {
    case "BOOK_REQUEST":
      return { ...state, loading: true, error: "" }
    case "BOOK_SUCCESS":
      return { ...state, success: true, loading: false, error: "", result: action.payload }
    case "BOOK_FAILS":
      return { ...state, success: false, loading: false, error: action.payload }
    default:
      return { ...state };
  }
}
export default function HomeComponent() {
  const navigate = useNavigate();
  const { user, setUser, Theme } = useContext(themeContext);
  const [state, dispatch] = useReducer(reducer, initialState)
  const { loading, success, result, error } = state;
  const [searchValue, setSearchValue] = useState("");
  const fetchData = async () => {
    dispatch({ type: "BOOK_REQUEST" });
    try {
      console.log(searchValue)
      const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=AIzaSyBAK41g6Wr2wp77in00aPT_vtiTw2nxDXc&maxResults=20`)
      console.log(data.items)
      dispatch({ type: "BOOK_SUCCESS", payload: data.items });
    }
    catch (err) {
      dispatch({ type: "BOOK_FAILS", payload: err.message })
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchValue])
  return (
    <div className='search-form'>
    <i class="fa-solid fa-spinner fa-fade"></i>
      <h3>Find Books of your choice</h3>
      <p> Best place to find book , where u can buy or sell books on your own </p>
      <div className='home-search-container'>
        <div className='home-search-content'>
          <form className='searchForm'>
            <div className='search-form-element'>
              <input type='text' value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} className='form-control' placeholder='Enter Book Title'></input>
              <button className='flex-button'><i class="fas fa-search fa-lg"></i></button>
            </div>
          </form>
        </div>

      </div>
      
      {loading && <div className='search-results'><i className='loading-icon' class="fa-solid fa-spinner fa-fade "></i></div>}
      {error && <span></span>}
      {success && searchValue && result ? <div className='search-results'>
        {/* <p><i>Suggested books</i></p> */}
        <ul>
          {console.log(result)}
          {result.map((value, index) => (

            <li key={index}><button className='resultButton'>{value.volumeInfo.title}</button></li>
          ))}
        </ul>
      </div>
        : ""}


    </div>
  )
}
