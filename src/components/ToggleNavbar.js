import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import image from '../images/logo.png'
import imageText from '../images/logo_text.png'
import hamburger from '../images/menu.png'
import { themeContext } from './ThemeContextProvider'
import AnchorLink from "react-anchor-link-smooth-scroll";
import { HashLink } from 'react-router-hash-link';
import BooksComponent from './BooksComponent'
import Dropdown from '../sub-component/Dropdown';

export default function ToggleNavbar() {
    const { Theme, ToggleTheme, user } = useContext(themeContext);
    const [toggleMenu, setToggleMenu] = useState(false)
    const handleToggle = async () => {
        setToggleMenu(!toggleMenu);
    }
    return (
        <div className='navbar'>
            <div className=' navbar-content '>
                <div className='brand-and-toggler'>
                    <Link to={'/'} className='navbar-brand'>
                        <img src={image} alt='error' className='logo-image'></img>
                        <img src={imageText} alt='error' className='logo-text-image'></img>
                        {/* <span className='logo-text'>MyBook</span> */}
                    </Link>
                    <button className='hamburger-button' onClick={handleToggle}>
                        {console.log(toggleMenu)}
                        {/* {toggleMenu ? <div></div> : <img src={hamburger} alt='error' className='hamburger-image' ></img>} */}
                        <img src={hamburger} alt='error' className='hamburger-image' ></img>
                    </button>
                </div>
                <div className={toggleMenu ? "sidebar-collapse show-sidebar-collapse" : "sidebar-collapse"}>
                    <ul className='navbar-nav'>
                        {user ? (<li className='nav-Item'>

                            <Link to={'/viewer/user'} className='nav-user-link'><i class="fa-solid fa-user fa-beat" ></i>{` ${user.userName}`}</Link>
                        </li>

                        ) : <li className='nav-Item'><Link to={'/login'} className='nav-link'>Login</Link></li>}
                        {/* <li className='nav-Item'><Link to={'/sell'} className='nav-link'>Home</Link></li> */}
                        {/* <li className='nav-Item'><Link to={'#'} className='nav-link'></Link></li> */}
                        <Dropdown />
                        <li className='nav-Item'><Link to={'/viewer/create'} className='nav-link'>{` `}Sell Book</Link></li>
                        {/* <li className='nav-Item'><Link to={'/'} className='nav-link'> E-books </Link></li> */}
                      
                        <li className='nav-Item'>
                            <Link><button onClick={ToggleTheme}>{Theme === 'Light' ? <i class="fa fa-moon-o" aria-hidden="true"></i> : <i class="fa fa-sun-o" aria-hidden="true"></i>}</button></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
