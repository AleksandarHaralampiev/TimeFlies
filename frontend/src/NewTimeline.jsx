import axios from "axios"
import { useState } from "react"
import { IoHourglass, IoHourglassOutline } from "react-icons/io5"

const NewTimeline = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [access, setAccess] = useState('0')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const obj = {
            name,
            description,
            public: access,
            owner_id: localStorage.getItem('accData').id
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/server/create/', obj)

            console.log(response)
        } catch(err) {
            console.log(err)
        } finally {
            setName('')
            setDescription('')
            setAccess('')
        }
    }

    return (
        <section className="section-new">
            <div className="container header-new">
                <IoHourglassOutline className="icon-new"/>

                <h1 className="heading-secondary">Create a timeline</h1>
            </div>

            <div className="container">
                <form className="new-timeline-form" onSubmit={(e) => handleSubmit(e)}>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <textarea
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <select required value={access} onChange={(e) => setAccess(e.target.value)}>
                        <option value='0'>Private</option>
                        <option value='1'>Public</option>
                    </select>

                    <button type="submit" className="btn">Create</button>

                </form>
            </div>
        </section>
    )
}

export default NewTimeline