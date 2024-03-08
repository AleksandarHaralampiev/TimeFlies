import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataContext } from './context/DataContext';

import pfp from './img/pfp.jpg'

const Nav = () => {
    const { loggedIn, setLoggedIn, navigate } = useContext(DataContext)

    const [dropdown, setDropdown] = useState(false)
    const [sticky, setSticky] = useState(false)

    // STICKY
    const handleSticky = () => {
        if (!sticky && window.scrollY > 50) setSticky(true)
        if (sticky && window.scrollY < 50) setSticky(false)
    }

    window.addEventListener('scroll', handleSticky)


    // LOG OUT
    const handleLogout = () => {
        setLoggedIn(false)

        localStorage.setItem('loggedIn', false)

        localStorage.removeItem('accData')
    }


    // DROPDOWN
    const handleCollapse = (e) => {
        const dropdownContainer = document.querySelector('.nav-pfp-container')

        if (!dropdownContainer.contains(e.target) || e.target.classList.contains('dropdown-link')) setDropdown(false)
    }

    document.addEventListener('click', (e) => dropdown ? handleCollapse(e) : null)

    const location = useLocation();
    const currentPath = location.pathname;
    console.log(currentPath);

    return (
        <nav className={sticky ? "navbar sticky" : "navbar"}>

            {currentPath !== '/' ? (
                <ul className="nav-links">
                    <li>
                        <Link to='/' className='nav-link'>Home</Link>
                    </li>
                    <li>
                        <a href='/#about-us' className='nav-link'>About</a>
                    </li>
                    <li>
                        <Link to='/#contact' className='nav-link'>Contact Us</Link>
                    </li>
                    {loggedIn && (
                        <li>
                            <Link to='/dashboard' className='nav-link'>Dashboard</Link>
                        </li>
                    )}
                </ul>
            ) : (
                <ul className="nav-links">
                    <li>
                        <a href='#home' className='nav-link'>Home</a>
                    </li>
                    <li>
                        <a href='#about-us' className='nav-link'>About</a>
                    </li>
                    <li>
                        <a href='#contact-us' className='nav-link'>Contact Us</a>
                    </li>
                    {loggedIn && (
                        <li>
                            <Link to='/dashboard' className='nav-link'>Dashboard</Link>
                        </li>
                    )}
                </ul>
            )}


            {
                loggedIn ?
                    <div className='nav-pfp-container'>
                        <img src={pfp} className="pfp" onClick={() => setDropdown(!dropdown)} />

                        <ul className={dropdown ? "dropdown active" : "dropdown"}>
                            <li>
                                <Link to='/myprofile' className='dropdown-link'>My Profile</Link>
                            </li>
                            <li>
                                <Link to='/mytimelines' className='dropdown-link'>My Timelines</Link>
                            </li>
                            <li>
                                <Link className='dropdown-link' id='sign-out' onClick={handleLogout}>Sign Out</Link>
                            </li>
                        </ul>
                    </div>
                    :
                    <ul className='nav-links'>
                        <li>
                            <Link to='/login' className='nav-link'>Log In</Link>
                        </li>
                        <li>
                            <Link to='/register' className='nav-link'>Sign Up</Link>
                        </li>
                    </ul>
            }

        </nav>
    )
}

export default Nav