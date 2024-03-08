import { useContext, useEffect, useState } from "react"
import { DataContext } from "./context/DataContext"
import { Link } from "react-router-dom"

import pfp from './img/pfp.jpg'

const Dashboard = () => {
    const { loggedIn, navigate } = useContext(DataContext)

    const profiles = Array.from({ length: 12 }, () => pfp)

    const [search, setSearch] = useState('')

    const timelines = [
        {
            name: "Timeline 1",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae cum facilis laudantium consectetur perspiciatis doloremque eveniet ab, quibusdam voluptate sapiente nemo neque, eius molestias commodi eligendi labore illo, error magni corporis. Praesentium deserunt asperiores dignissimos autem, a, et eveniet quod at perferendis, accusantium tenetur quia omnis minus consectetur ratione harum."
        },
        {
            name: "Timeline 1",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae cum facilis laudantium consectetur perspiciatis doloremque eveniet ab, quibusdam voluptate sapiente nemo neque, eius molestias commodi eligendi labore illo, error magni corporis. Praesentium deserunt asperiores dignissimos autem, a, et eveniet quod at perferendis, accusantium tenetur quia omnis minus consectetur ratione harum."
        },
        {
            name: "Timeline 1",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae cum facilis laudantium consectetur perspiciatis doloremque eveniet ab, quibusdam voluptate sapiente nemo neque, eius molestias commodi eligendi labore illo, error magni corporis. Praesentium deserunt asperiores dignissimos autem, a, et eveniet quod at perferendis, accusantium tenetur quia omnis minus consectetur ratione harum."
        },
        {
            name: "Timeline 1",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae cum facilis laudantium consectetur perspiciatis doloremque eveniet ab, quibusdam voluptate sapiente nemo neque, eius molestias commodi eligendi labore illo, error magni corporis. Praesentium deserunt asperiores dignissimos autem, a, et eveniet quod at perferendis, accusantium tenetur quia omnis minus consectetur ratione harum."
        },
        {
            name: "Timeline 1",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae cum facilis laudantium consectetur perspiciatis doloremque eveniet ab, quibusdam voluptate sapiente nemo neque, eius molestias commodi eligendi labore illo, error magni corporis. Praesentium deserunt asperiores dignissimos autem, a, et eveniet quod at perferendis, accusantium tenetur quia omnis minus consectetur ratione harum."
        },
        {
            name: "Timeline 1",
            description: "Loorem ipsum dolor sit amet consectetur, adipisicing elit. Quae cum facilis laudantium consectetur perspiciatis doloremque eveniet ab, quibusdam voluptate sapiente nemo neque, eius molestias commodi eligendi labore illo, error magni corporis. Praesentium deserunt asperiores dignissimos autem, a, et eveniet quod at perferendis, accusantium tenetur quia omnis minus consectetur ratione harum."
        },
        {
            name: "Timeline 1",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae cum facilis laudantium consectetur perspiciatis doloremque eveniet ab, quibusdam voluptate sapiente nemo neque, eius molestias commodi eligendi labore illo, error magni corporis. Praesentium deserunt asperiores dignissimos autem, a, et eveniet quod at perferendis, accusantium tenetur quia omnis minus consectetur ratione harum."
        },
        {
            name: "Timeline 1",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae cum facilis laudantium consectetur perspiciatis doloremque eveniet ab, quibusdam voluptate sapiente nemo neque, eius molestias commodi eligendi labore illo, error magni corporis. Praesentium deserunt asperiores dignissimos autem, a, et eveniet quod at perferendis, accusantium tenetur quia omnis minus consectetur ratione harum."
        }
    ]

    const [shownTimelines, setShownTimelines] = useState([])

    useEffect(() => {
        setShownTimelines(timelines.filter(timeline => 
            timeline.name.toLowerCase().includes(search.toLowerCase()) || timeline.description.toLowerCase().includes(search.toLowerCase())
        ))
    }, [search])

    useEffect(() => {
        if(!loggedIn) navigate('/login')
    }, [loggedIn])
    
    return (
        <section className="section-dashboard">
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
                    timelines.length ?
                    shownTimelines.length ?
                        <div className="container timeline-grid">
                            {
                                shownTimelines.map(timeline => (
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
                            <p className="dashboard-text">No result.</p>
                        </div>
                    :
                    <div className="container">
                        <p className="dashboard-empty">No timelines yet. Perhaps you can <Link to=''>create your own</Link></p>
                    </div>
                }
        </section>
    )
}

export default Dashboard