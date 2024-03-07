import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { DataContext } from "./context/DataContext";

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
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
        </form>
    )
}

export default Login