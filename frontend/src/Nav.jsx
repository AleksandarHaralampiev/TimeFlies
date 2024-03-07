import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from './context/DataContext'

import pfp from './img/pfp.jpg'

const Nav = () => {
    const { loggedIn } = useContext(DataContext)
    
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

            <ul className="nav-links">
                {
                    loggedIn ?
                    <li>
                        <img src={pfp} className="pfp" />
                    </li>
                    :
                    <>
                        <li>
                            <Link to='/login' className='nav-link'>Log In</Link>
                        </li>
                        <li>
                            <Link to='/register' className='nav-link'>Sign Up</Link>
                        </li>
                    </>
                }
            </ul>


        </nav>
    )
}

export default Nav