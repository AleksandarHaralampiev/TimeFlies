import { useContext, useEffect } from "react"
import { DataContext } from "./context/DataContext"
import { Link } from "react-router-dom"

import pfp from './img/pfp.jpg'

const Dashboard = () => {
    const { loggedIn, navigate } = useContext(DataContext)

    const profiles = Array.from({ length: 12 }, () => pfp)

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
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae cum facilis laudantium consectetur perspiciatis doloremque eveniet ab, quibusdam voluptate sapiente nemo neque, eius molestias commodi eligendi labore illo, error magni corporis. Praesentium deserunt asperiores dignissimos autem, a, et eveniet quod at perferendis, accusantium tenetur quia omnis minus consectetur ratione harum."
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

    useEffect(() => {
        if(!loggedIn) navigate('/login')
    }, [loggedIn])
    
    return (
        <section className="section-dashboard">
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
        </section>
    )
}

export default Dashboard