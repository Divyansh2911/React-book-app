import React, { useContext } from 'react'
import { themeContext } from './ThemeContextProvider';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const {Theme , ToggleTheme,user} = useContext(themeContext);
  return (
    
    <div className='Nav-Container'>
      
        <div className='nav-items'>
           <Link to={'/'}><span className='nav-title'>MyBook</span></Link>
           <button onClick={()=>{navigate('/sell')}}>Home</button>
           <button>Services</button>
           <button>Contact Us</button>
        </div>
        <div className='nav-items'>
            {user?(<div>
              
              <Link to={'/viewer/user'} className='side-link'><i class="fa-solid fa-user fa-beat" ></i>{user.userName}</Link>
              <Link to={'/viewer/create'} className='side-link'><i class="fa-solid fa-dollar-sign fa-beat"></i>Sell Book</Link>
            </div>
              
            ): <Link to={'/login'} className='side-link'>Log-in</Link>}
           
            <button onClick={ToggleTheme}>Theme:{Theme==='Dark'?<i class="fa fa-sun-o" aria-hidden="true"></i>
            :
           <i class="fa fa-moon-o" aria-hidden="true"></i>
          }</button>
        </div>

    </div>
   
  )
}
