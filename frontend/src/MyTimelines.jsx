import { useContext, useEffect, useState } from "react"
import { DataContext } from "./context/DataContext"
import pfp from './img/pfp.jpg'
import { IoAddOutline } from "react-icons/io5"
import axios from "axios"
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import TimelineSettings from "./timeline-settings/TimelineSettings"
import DashboardSkeleton from "./DashboardSkeleton"
import DashboardCard from "./DashboardCard"

const MyTimelines = () => {
    const { navigate, loggedIn, myTimelines, myLoading, myError } = useContext(DataContext)
    const profiles = Array.from({ length: 12 }, () => pfp)

    useEffect(() => {
        if(!loggedIn) navigate('/login')
    }, [loggedIn])

    const [settings, setSettings] = useState(null)

    return (
        <section className="section-dashboard">
            {
                settings ?
                <TimelineSettings
                    id={settings}
                    setSettings={setSettings}
                    list="my-timelines"
                />
                :
                null
            }
            <div className="container my-timelines-header">
                <div className="text-box">
                    <h1 className="dashboard-heading">Your Timelines</h1>

                    <p className="dashboard-text">These are all the timelines you contribute in.</p>
                    {!myError && <p className="dashboard-text">{myTimelines.length} timelines</p>}
                </div>

                <div className="btn-box">
                    <Link className="btn" to='/newtimeline'>
                        + Create a new timeline
                    </Link>
                </div>
            </div>

                {
                    myLoading ?
                    <div className="container timeline-grid">
                        {
                            Array.from({length: 6}, _ => null).map((_, index) => (
                                <DashboardSkeleton key={index} />
                            ))
                        }
                    </div>
                    :
                    myError ?
                    <div className="container">
                        <p className="dashboard-text">{myError}</p>
                        <HashLink to='/#contact-us' className='dashboard-text dashboard-link'>Contact Us &rarr;</HashLink>
                    </div>
                    :
                    myTimelines.length ?
                    <div className="container timeline-grid">
                        {
                            myTimelines.map(timeline => (
                                <DashboardCard 
                                    timeline={timeline}
                                    setSettings={setSettings}
                                />
                            ))
                        }
                    </div>
                    :
                    <div className="container">
                        <p className="dashboard-empty">You don't contribute in any timelines yet.</p>
                    </div>
                }
        </section>
    )
}

export default MyTimelines