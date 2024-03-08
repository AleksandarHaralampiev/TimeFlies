import { useContext, useEffect, useState } from "react"
import { DataContext } from "./context/DataContext"
import pfp from './img/pfp.jpg'
import { IoAddOutline } from "react-icons/io5"
import axios from "axios"
import { Link } from "react-router-dom"

const MyTimelines = () => {
    const { navigate, loggedIn } = useContext(DataContext)

    const profiles = Array.from({ length: 12 }, () => pfp)

    const [timelines, setTimelines] = useState([])

    const [loading, setLoading] = useState(false)
    const [loadMessage, setLoadMessage] = useState('Loading')

    useEffect(() => {
        if(loading) {
            setTimeout(() => {
                if(loadMessage === 'Loading...') setLoadMessage('Loading')
                // else setLoadMessage([...loadMessage + '.'])
            }, 200)
        }
    }, [loading, loadMessage])


    useEffect(() => {
        const fetching = async () => {
            setLoading(true)

            try {
                const response = await axios.get(`http://127.0.0.1:8000/server/list/?Content-Type=application-json&id=${JSON.parse(localStorage.getItem('accData')).id}`)

                setTimelines(response.data.servers)
            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        fetching()
    }, [])


    useEffect(() => {
        if(!loggedIn) navigate('/login')
    }, [loggedIn])


    return (
        <section className="section-dashboard">
            <div className="container my-timelines-header">
                <div className="text-box">
                    <h1 className="dashboard-heading">Your Timelines</h1>

                    <p className="dashboard-text">These are all the timelines you contribute in.</p>
                </div>

                <div className="btn-box">
                    <Link className="btn" to='/newtimeline'>
                        + Create a new timeline
                    </Link>
                </div>
            </div>

                {
                    loading ?
                    <div className="container">
                        <p className="dashboard-text">{loadMessage}</p>
                    </div>
                    :
                    timelines.length ?
                    <div className="container timeline-grid">
                        {
                            timelines.map(timeline => (
                                <div className="timeline-container" onClick={() => navigate('/timeline')}>
                                    
                                    <h3 to='/timeline' className="timeline-name">{timeline.name}</h3>

                                    <p className="timeline-description">
                                        {
                                            timeline.description.length < 100 ?
                                            timeline.description
                                            :
                                            `${timeline.description.slice(0, 100)}...`
                                        }
                                    </p>

                                    <div className="timeline-img-box">
                                        {
                                            profiles.slice(0, 5).map(pic => (
                                                <img src={pic} className="timeline-pfp"/>
                                            ))
                                        }

                                    </div>

                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className="container">
                        <p className="dashboard-empty">No timelines yet. Perhaps you can <Link to=''>create your own</Link></p>
                    </div>
                }
        </section>
    )
}

export default MyTimelines