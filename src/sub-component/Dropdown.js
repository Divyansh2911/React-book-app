// Dropdown.js

import React, { useState } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    // setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-btn">
        {isOpen ? <li className='nav-Item'><Link className='nav-link'>Options <i class="fa-solid fa-caret-down"></i></Link></li>: <><>Options</><i class="fa-solid fa-caret-down"></i></>}
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <Link to={"/"}><i class="fa-solid fa-house"></i> Home</Link>
          <Link to={'/sell'}><i class="fa-solid fa-store"></i> Store</Link>
          {/* <Link href="#"><i class="fa-solid fa-circle-info"></i> About</Link> */}
          <HashLink scroll={(el) => el.scrollIntoView({ behavior: "smooth", block: 'start' })} to="#about"><i class="fa-solid fa-circle-info"></i>About</HashLink>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
