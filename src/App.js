import { useContext } from 'react';
import './App.css';

import BookViewer from './components/BookViewer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import { themeContext } from './components/ThemeContextProvider';
import UserProfile from './components/UserProfile';
import SignupPage from './components/SignupPage';
import CreateItem from './components/CreateItem';
import SellPage from './components/SellPage';



function App() {
  const {Theme} = useContext(themeContext)
  return (
   <BrowserRouter>
   <div className= {`All-container ${Theme}`}>
   <Navbar/>
   </div>
    
   <Routes>
    <Route path='/'  element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element = {<SignupPage/>}/>
    <Route path='/sell' element={<SellPage/>}/>
    <Route path='/viewer/' element={<PrivateRoute/>}>
      <Route path='/viewer/user' element={<UserProfile/>}/>
      <Route path='/viewer/:isbn'element={<BookViewer/>}/>
      <Route path='/viewer/create' element={<CreateItem/>}/>
      {/* <Route path='/viewer/' */}
    </Route> 
   </Routes>
   </BrowserRouter>
  );
}

export default App;
