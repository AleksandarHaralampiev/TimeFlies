import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { DataContext } from "./context/DataContext";

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
        <form onSubmit={(e) => handleSubmit(e)}>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit">Register</button>
        </form>
    )
}

export default Register