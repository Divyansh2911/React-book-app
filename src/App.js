import { useContext } from 'react';
// import './App.css';

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
import ToggleNavbar from './components/ToggleNavbar';
import Footer from './components/Footer';
import SellerVisit from './components/SellerVisit';
import ProfilePage from './components/ProfilePage';
import Temp from './components/Temp';
import MapScreen from './components/MapScreen';
// import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const {Theme} = useContext(themeContext)
  return (
    <div className='container'>
   <BrowserRouter>
   {/* <Navbar/> */}
   <ToggleNavbar/>
   <div className= {`All-container ${Theme}`}>
   
    
   <Routes>
    <Route path='/'  element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element = {<SignupPage/>}/>
    <Route path='/sell' element={<SellPage/>}/>
    <Route path='/temp' element={<Temp/>}/>
    <Route path='/viewer/' element={<PrivateRoute/>}>
      <Route path='/viewer/user' element={<ProfilePage/>}/>
      <Route path='/viewer/:isbn'element={<BookViewer/>}/>
      <Route path='/viewer/create' element={<CreateItem/>}/>
      <Route path='/viewer/google' element={<MapScreen/>}/>
      {/* <Route path='/viewer/' */}
    </Route> 
    <Route path='/sell/seller/:id' element={<SellerVisit/>}/>
   </Routes>
   <div>
      <Footer/>
    </div>
   </div>
   </BrowserRouter>
    </div>
  );
}

export default App;
