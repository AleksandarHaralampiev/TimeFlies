import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { DataContext } from "./context/DataContext";
import { IoPersonOutline } from "react-icons/io5";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { loggedIn, navigate } = useContext(DataContext)

    useEffect(() => {
        if(loggedIn) navigate('/dashboard')
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email)
        console.log(password)

        const obj = {
            email,
            password
        }

        try {
            const response = await axios.post('', obj)
        } catch(err) {
            console.log(err)
        } finally {
            setEmail('')
            setPassword('')
        }
    }

    return (
        <section className="section-account">
            <div className="account-container">
                <div className="account-text-box">
                    <IoPersonOutline className="account-icon"/>

                    <h2 className="heading-secondary">Log In To Your Account</h2>
                </div>


                <form className="account-form" onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="btn">Log In</button>
                </form>
            </div>
        </section>
    )
}

export default Login