import { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { DataContext } from "./context/DataContext";
import { IoPersonOutline } from "react-icons/io5";
import { BarLoader } from "react-spinners";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { loggedIn, setLoggedIn, navigate, handleAlert } = useContext(DataContext)

    useEffect(() => {
        if(loggedIn) navigate('/dashboard')
    }, [loggedIn])
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)

        const obj = {
            email,
            password
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/authenticate/valid/?Content-Type=application/json', obj)

            console.log(response)

            if(response.status == 200) {
                const response2 = await axios.post('http://127.0.0.1:8000/api/token/', obj)

                console.log(response2)

                if(response2.status == 200) {
                    const accData = {
                        id: response.data.id,
                        access: response2.data.access,
                        refresh: response2.data.refresh
                    }

                    handleAlert('success', 'You successfully logged in.')

                    setLoggedIn(true)

                    localStorage.setItem('accData', JSON.stringify(accData))
                    localStorage.setItem('loggedIn', true)
                }
            }
        } catch(err) {
            console.log(err)
            setError(err.response.data.message)
        } finally {
            setEmail('')
            setPassword('')
            setLoading(false)
        }
    }

    return (
        <section className="section-account">
            <div className="account-container">
                <div className="account-text-box">
                    <IoPersonOutline className="account-icon"/>

                    <h2 className="heading-secondary-reusable">Log In To Your Account</h2>

                    {
                        loading ?
                            <BarLoader color="#625149" width={200} className="account-loading"/>
                        :
                        null
                    }

                    {
                        error.length ?
                        <p className="err-message">{error}</p>
                        :
                        null
                    }
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