import { useContext, useEffect, useState } from "react"
import { DataContext } from "./context/DataContext"
import pfp from './img/pfp.jpg'
import { IoAddOutline } from "react-icons/io5"
import axios from "axios"
import { Link } from "react-router-dom"

const MyTimelines = () => {
    const { navigate, loggedIn, myTimelines, myLoading, myError } = useContext(DataContext)
    const profiles = Array.from({ length: 12 }, () => pfp)

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
                    myLoading ?
                    <div className="container">
                        <p className="dashboard-text">Loading</p>
                    </div>
                    :
                    myError ?
                    <div className="container">
                        <p className="dashboard-text">{myError}</p>
                    </div>
                    :
                    myTimelines.length ?
                    <div className="container timeline-grid">
                        {
                            myTimelines.map(timeline => (
                                <div className="timeline-container" onClick={() => navigate(`/timeline/${timeline.id}`)}>
                                    
                                    <h3 className="timeline-name">{timeline.name}</h3>

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
                        <p className="dashboard-empty">You don't contribute in any timelines yet.</p>
                    </div>
                }
        </section>
    )
}

export default MyTimelines