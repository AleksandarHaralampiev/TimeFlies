import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataContext } from './context/DataContext';
import { HashLink } from 'react-router-hash-link';
import pfp from './img/pfp.jpg'
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5'

const Nav = () => {
    const { loggedIn, setLoggedIn, navigate, account } = useContext(DataContext)

    const [dropdown, setDropdown] = useState(false)
    const [sticky, setSticky] = useState(false)
    const [open, setOpen] = useState(false)

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



    return (
        <nav className={sticky ? "navbar sticky" : "navbar"}>

            {
                open ?
                <IoCloseOutline className='mobile-nav-btn' onClick={() => setOpen(false)}/>
                :
                <IoMenuOutline className='mobile-nav-btn' onClick={() => setOpen(true)}/>
            }
            
            <ul className={open ? "nav-links nav-links-mobile" : "nav-links"}>
                <li>
                    <Link to='/' className='nav-link'>Home</Link>
                </li>
                <li>
                    <HashLink to='/#about-us' className='nav-link'>About</HashLink>
                </li>
                <li>
                    <HashLink to='/#contact-us' className='nav-link'>Contact Us</HashLink>
                </li>
                {loggedIn && (
                    <li>
                        <Link to='/dashboard' className='nav-link'>Dashboard</Link>
                    </li>
                )}
            </ul>


            {
                loggedIn ?
                    <div className='nav-pfp-container'>
                        <img src={account.profile_picture} className="pfp" onClick={() => setDropdown(!dropdown)} />

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