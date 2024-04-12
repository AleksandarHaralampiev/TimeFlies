import { useContext, useState } from "react"
import { BarLoader } from "react-spinners"
import { DataContext } from "../context/DataContext"
import { TimelineContext } from './TimelineSettings'
import axios from "axios"

const AddMember = () => {
    const { handleAlert } = useContext(DataContext)
    const { id } = useContext(TimelineContext)

    // // ADDING NEW MEMBERS
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('1')

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const obj = {
            email,
            server_id: id,
            role
        }

        console.log(obj)

        try {
            const response = await axios.post('http://127.0.0.1:8000/server/addUserToServer/', obj)

            console.log(response)

            if (response.status == 200) {
                handleAlert('success', 'User added successfully! Refresh to see them in the list.')
            }
        } catch (err) {
            console.log(err)
            handleAlert('error', "Couldn't add user.")
        } finally {
            setEmail('')
            setRole('1')
            setLoading(false)
        }
    }
    
    return (
        <>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="icon-new" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path fill="none" strokeLinecap="round" strokeLinejoin="round" stroke-width="32" d="M145.61 464h220.78c19.8 0 35.55-16.29 33.42-35.06C386.06 308 304 310 304 256s83.11-51 95.8-172.94c2-18.78-13.61-35.06-33.41-35.06H145.61c-19.8 0-35.37 16.28-33.41 35.06C124.89 205 208 201 208 256s-82.06 52-95.8 172.94c-2.14 18.77 13.61 35.06 33.41 35.06z"></path><path d="M343.3 432H169.13c-15.6 0-20-18-9.06-29.16C186.55 376 240 356.78 240 326V224c0-19.85-38-35-61.51-67.2-3.88-5.31-3.49-12.8 6.37-12.8h142.73c8.41 0 10.23 7.43 6.4 12.75C310.82 189 272 204.05 272 224v102c0 30.53 55.71 47 80.4 76.87 9.95 12.04 6.47 29.13-9.1 29.13z"></path>
            </svg>
            
            <h2 className="timeline-settings-heading">Add user to your timeline</h2>
            {
                loading &&
                <BarLoader color="#625149" width={400} className="timeline-settings-loading" />
            }
            <form className="timeline-settings-add-form" onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value='1'>Member</option>
                    <option value='2'>Editor</option>
                </select>

                <button className="btn" type="submit">Add new member</button>
            </form>
        </>
    )
}

export default AddMember