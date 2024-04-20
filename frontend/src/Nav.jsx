import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DataContext } from './context/DataContext';
import { HashLink } from 'react-router-hash-link';
import pfp from './img/pfp.jpg'
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5'
import Skeleton from 'react-loading-skeleton';
import logo from './img/Logo.png';

const Nav = () => {
    const { loggedIn, setLoggedIn, navigate, account, accountLoading } = useContext(DataContext)


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
    const [dropdown, setDropdown] = useState(false)

    const handleCollapse = (e) => {
        const dropdownContainer = document.querySelector('.nav-pfp-container')

        if (!dropdownContainer.contains(e.target) || e.target.classList.contains('dropdown-link')) setDropdown(false)
    }

    document.addEventListener('click', (e) => dropdown ? handleCollapse(e) : null)

    useEffect(() => {
        if (loggedIn) setDropdown(false)
    }, [loggedIn])


    // MOBILE
    const handleClose = () => {
        // setTimeout(() => {
        setOpen(false)
        // }, 500)
    }


    return (
        <nav className={sticky ? "navbar sticky" : "navbar"}>

            {
                open ?
                    <IoCloseOutline className='mobile-nav-btn' onClick={handleClose} />
                    :
                    <IoMenuOutline className='mobile-nav-btn' onClick={() => setOpen(true)} />
            }

            <ul className={open ? "nav-links-mobile nav-links" : "nav-links"}>
                <li>
                    <HashLink to='/#' className='nav-link' onClick={() => setOpen(false)}>
                        <img src={logo} className='logo' />
                    </HashLink>
                </li>
                <li>
                    <HashLink to='/#about-us' className='nav-link' onClick={() => setOpen(false)}>About</HashLink>
                </li>
                <li>
                    <HashLink to='/#contact-us' className='nav-link' onClick={() => setOpen(false)}>Contact Us</HashLink>
                </li>
                {loggedIn && (
                    <li>
                        <Link to='/dashboard' className='nav-link' onClick={() => setOpen(false)}>Dashboard</Link>
                    </li>
                )}
                {
                    !loggedIn && open ?
                        <div className='nav-account-links'>
                            <li>
                                <Link to='/login' className='nav-link' onClick={() => setOpen(false)}>Log In</Link>
                            </li>
                            <li>
                                <Link to='/register' className='nav-link' onClick={() => setOpen(false)}>Sign Up</Link>
                            </li>
                        </div>
                        :
                        null
                }
            </ul>


            {
                loggedIn ?
                    <div className='nav-pfp-container'>
                        {
                            accountLoading ?
                                <div onClick={() => setDropdown(!dropdown)}>
                                    <Skeleton className='nav-pfp' />
                                </div>
                                :
                                <img src={account.profile_picture} className="nav-pfp" onClick={() => setDropdown(!dropdown)} />
                        }

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