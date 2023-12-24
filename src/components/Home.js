  // "proxy": "https://backend1-smki.onrender.com",
import React, { useContext } from 'react'
import { themeContext } from './ThemeContextProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import BooksComponent from './BooksComponent'
import BookViewer from './BookViewer'
import HomeComponent from './HomeComponent'
import Footer from './Footer'
import HomeMiddleComponent from './HomeMiddleComponent'
import HomeMiddleComponent2 from './HomeMiddleComponent2'
// import Fade from 'react-reveal/Fade'

export default function Home() {
  const { Theme } = useContext(themeContext)
  return (
    <div >
      <div className='home-header'>
        
          <HomeComponent />
     
      </div>


      <div>
        <BooksComponent />
      </div>
      <div>
        <h1 id='about' style={{ width: '100%', textAlign: 'center', margin: '7px auto 0px auto' }}>About</h1>
        <HomeMiddleComponent />
      </div>
      <div>
        <HomeMiddleComponent2 />
      </div>

      {/* <Routes>
      <Route path='/viewer/:isbn' element={<BookViewer/>}/>
    </Routes> */}

    </div>
  )
}
