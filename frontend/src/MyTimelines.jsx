import { useContext } from "react"
import { DataContext } from "./context/DataContext"
import pfp from './img/pfp.jpg'
import { IoAddOutline } from "react-icons/io5"

const MyTimelines = () => {
    const { navigate } = useContext(DataContext)

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

    return (
        <section className="section-dashboard">
            <div className="container my-timelines-header">
                <div className="text-box">
                    <h1 className="dashboard-heading">Your Timelines</h1>

                    <p className="dashboard-text">These are all the timelines you contribute in.</p>
                </div>

                <div className="btn-box">
                    <button className="btn">
                        {/* <IoAddOutline className="add-icon"/>
                        <span>Create a new timeline</span> */}
                        + Create a new timeline
                    </button>
                </div>

                {/* <div className="search-box">
                    <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div> */}
            </div>

                {
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