const DashboardCard = ({ timeline, setSettings }) => {
    return (
        <div className="timeline-container" onClick={() => setSettings(timeline.id)}>
                                        
            <div className="timeline-text-box">
                <h3 className="timeline-name">{timeline.name}</h3>

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
                    timeline.contributors.slice(0, 5).map((user, index) => (
                        <img src={user.profile_picture} className="timeline-pfp" key={index}/>
                    ))
                }

            </div>

        </div>
    )
}

export default DashboardCard