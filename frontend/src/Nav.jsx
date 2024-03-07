import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from './context/DataContext'

import pfp from './img/pfp.jpg'

const Nav = () => {
    const { loggedIn, setLoggedIn, navigate } = useContext(DataContext)

    const [dropdown, setDropdown] = useState(false)

    const handleLogout = () => {
        setLoggedIn(false)

        localStorage.setItem('loggedIn', false)

        localStorage.removeItem('accData')
    }
    
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to='/' className='nav-link'>Home</Link>
                </li>
                <li>
                    <Link to='/' className='nav-link'>About</Link>
                </li>
                <li>
                    <Link to='/' className='nav-link'>Contact Us</Link>
                </li>
            </ul>

            {
                loggedIn ?
                <div className='pfp-container'>
                    <img src={pfp} className="pfp" onClick={() => setDropdown(!dropdown)}/>

                    {
                        dropdown ?
                        <ul className="dropdown">
                            <li>
                                <Link className='dropdown-link'>My Profile</Link>
                            </li>
                            <li>
                                <Link className='dropdown-link'>My Timelines</Link>
                            </li>
                            <li>
                                <Link className='dropdown-link' id='sign-out' onClick={handleLogout}>Sign Out</Link>
                            </li>
                        </ul>
                        :
                        null
                    }
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