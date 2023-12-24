import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { themeContext } from './ThemeContextProvider'

export default function Footer() {
    const {Theme} = useContext(themeContext)
  return (
    <div id='footer' className={`footer-container ${Theme}`}>
    <footer className="footer section bd-container">
        <div className="footer__container bd-grid">
            <div className="footer__content">
                <Link href="/" className="footer__logo"> Booke</Link>
                <span class="footer__description">BookStore</span>
                <div>
                    <Link to={"https://facebook.com"} target="_blank" className="footer__social"><i class="fa-brands fa-facebook"></i></Link>
                    <Link href={"https://instagram.com"} target="_blank" className="footer__social"><i class="fa-brands fa-instagram"></i></Link>
                    <Link href={"https://twitter.com"} target="_blank" className="footer__social"><i class="fa-brands fa-twitter"></i></Link>
                </div>
            </div>

            <div className="footer__content">
                <h3 className="footer__title">Services</h3>
                <ul>
                    <li><Link to={"/viewer/create"} className="footer__link">Sell Books </Link></li>
                    <li><Link to={"/"} className="footer__link">E-books</Link></li>
                    <li><Link to={"/sell"} className="footer__link">Purchase Books</Link></li>
                    <li><Link to={"/"} className="footer__link">Reserve your spot</Link></li>
                </ul>
            </div>

            <div className="footer__content">
                <h3 className="footer__title">Information</h3>
                <ul>
                    <li><Link to={"/"} className="footer__link">Event</Link></li>
                    <li><Link to={"/"} className="footer__link">Contact us</Link></li>
                    <li><Link to={"/"} className="footer__link">Privacy policy</Link></li>
                    <li><Link to={"/"} className="footer__link">Terms of services</Link></li>
                </ul>
            </div>

            <div className="footer__content">
                <h3 className="footer__title">Adress</h3>
                <ul>
                    <li>Itm-Goi</li>
                    <li>Sitholi Railway Station</li>
                    <li>999 - 888 - 777</li>
                    <li>Booke@email.com</li>
                </ul>
            </div>
        </div>

        <p className="footer__copy">&#169; 2023  All right reserved</p>
    </footer>

    </div>
  )
}
