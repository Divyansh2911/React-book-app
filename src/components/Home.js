import React, { useContext } from 'react'
import { themeContext } from './ThemeContextProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Navbar'
import BooksComponent from './BooksComponent'
import BookViewer from './BookViewer'
import HomeComponent from './HomeComponent'

export default function Home() {
  const { Theme } = useContext(themeContext)
  return (
    <div className={`All-container ${Theme}`}>

      <div className='home-header'>
        <HomeComponent />
      </div>


      <div>
        <BooksComponent />
      </div>

      {/* <Routes>
      <Route path='/viewer/:isbn' element={<BookViewer/>}/>
    </Routes> */}

    </div>
  )
}
