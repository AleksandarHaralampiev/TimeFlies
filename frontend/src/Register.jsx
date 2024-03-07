import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { DataContext } from "./context/DataContext";
import { IoPersonOutline } from "react-icons/io5";

const Register = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { loggedIn, navigate } = useContext(DataContext)

    useEffect(() => {
        if(loggedIn) navigate('/dashboard')
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email)
        console.log(username)
        console.log(password)
        console.log(confirmPassword)

        const obj = {
            email,
            username,
            password,
            confirmPassword
        }

        try {
            const response = await axios.post('', obj)
        } catch(err) {
            console.log(err)
        } finally {
            setEmail('')
            setUsername('')
            setPassword('')
            setConfirmPassword('')
        }
    }

    return (
        <section className="section-account">
            <div className="account-container">
                <div className="account-text-box">
                    <IoPersonOutline className="account-icon"/>

                    <h2 className="heading-secondary">Register An Account</h2>
                </div>

                <form className="account-form" onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button className="btn" type="submit">Register</button>
                </form>
            </div>
        </section>
    )
}

export default Register