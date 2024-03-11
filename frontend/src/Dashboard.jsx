import { useContext, useEffect, useState } from "react"
import { DataContext } from "./context/DataContext"
import { Link } from "react-router-dom"

import pfp from './img/pfp.jpg'
import axios from "axios"
import TimelineSettings from "./TimelineSettings"
import { HashLink } from "react-router-hash-link"

const Dashboard = () => {
    const { loggedIn, navigate, publicTimelines, dashboardLoading, dashboardError } = useContext(DataContext)

    // const profiles = Array.from({ length: 12 }, () => pfp)
    
    const [settings, setSettings] = useState(null)
    
    
    // SETTING THE SHOWN TIMELINES
    const [search, setSearch] = useState('')
    const [shownTimelines, setShownTimelines] = useState([])

    useEffect(() => {
        setShownTimelines(publicTimelines.filter(timeline => 
            timeline.name.toLowerCase().includes(search.toLowerCase()) || timeline.description.toLowerCase().includes(search.toLowerCase())
        ))
    }, [search])

    useEffect(() => {
        setShownTimelines(publicTimelines.filter(timeline => 
            timeline.name.toLowerCase().includes(search.toLowerCase()) || timeline.description.toLowerCase().includes(search.toLowerCase())
        ))
    }, [publicTimelines])





    // CHECKING IF USER IS LOGGED IN
    useEffect(() => {
        if(!loggedIn) navigate('/login')
    }, [loggedIn])
    



    return (
        <section className="section-dashboard" >
            {
                settings ?
                <TimelineSettings
                    id={settings}
                    setSettings={setSettings}
                    list="public-timelines"
                />
                :
                null
            }
            <div className="container">
                <div className="text-box">
                    <h1 className="dashboard-heading">Dashboard</h1>

                    <p className="dashboard-text">All available timelines are displayed here. Choose one and start building upon it!</p>
                </div>

                <div className="search-box">
                    <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
            </div>

                {
                    dashboardLoading ?
                    <div className="container">
                        <p className="dashboard-text">Loading</p>
                    </div>
                    :
                    dashboardError.length ?
                    <div className="container">
                        <p className="dashboard-text">{dashboardError}</p>
                        <HashLink to='/#contact-us' className='dashboard-text dashboard-link'>Contact Us &rarr;</HashLink>
                    </div>
                    :
                    publicTimelines.length ?
                    shownTimelines.length ?
                        <div className="container timeline-grid">
                            {
                                shownTimelines.map(timeline => (
                                    <div className="timeline-container" onClick={() => setSettings(timeline.id)}>
                                        
                                        <div className="timeline-text-box">
                                            <h3 to='/timeline' className="timeline-name">{timeline.name}</h3>

                                            <p className="timeline-description">
                                                {
                                                    timeline.description.length < 100 ?
                                                    timeline.description
                                                    :
                                                    `${timeline.description.slice(0, 100)}...`
                                                }
                                            </p>
                                        </div>

                                        <div className="timeline-img-box">
                                            {
                                                timeline.contributors.slice(0, 5).map(user => (
                                                    <img src={user.profile_picture} className="timeline-pfp"/>
                                                ))
                                            }

                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div className="container">
                            <p className="dashboard-text">No result.</p>
                        </div>
                    :
                    <div className="container">
                        <p className="dashboard-empty">No timelines yet. Perhaps you can <Link to='/newtimeline'>create your own</Link></p>
                    </div>
                }
        </section>
    )
}

export default Dashboard