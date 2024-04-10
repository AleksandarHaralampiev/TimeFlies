import { useContext, useEffect, useState } from "react"
import { DataContext } from "./context/DataContext"
import { Link } from "react-router-dom"

import pfp from './img/pfp.jpg'
import axios from "axios"
import TimelineSettings from "./timeline-settings/TimelineSettings"
import { HashLink } from "react-router-hash-link"

import { BarLoader, ClipLoader } from "react-spinners"
import DashboardCard from "./DashboardCard"
import DashboardSkeleton from "./DashboardSkeleton"

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
                    <div className="container timeline-grid">
                        {
                            Array.from({length: 6}, _ => null).map(_ => (
                                <DashboardSkeleton />
                            ))
                        }
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
                                <DashboardCard 
                                    timeline={timeline}
                                    setSettings={setSettings}
                                />
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