import { useContext } from "react"
import { TimelineContext } from "./TimelineSettings"
import { Link } from "react-router-dom"

const ButtonBox = () => {
    const { openMembers, setOpenMembers, timeline, id } = useContext(TimelineContext)

    return (
        <div className="timeline-settings-btn-box">
            <div className="timeline-settings-members" onClick={() => setOpenMembers(!openMembers)}>
                <div className="timeline-img-box timeline-settings-img-box">
                    {
                        timeline.contributors.map(user => (
                            <img src={user.profile_picture} className="timeline-pfp" key={user.id}/>
                        ))
                    }
                </div>

                {
                    openMembers ?
                        <div className="btn-contributors">Hide Contributors &uarr;</div>
                        :
                        <div className="btn-contributors">View All Contributors &darr;</div>
                }
            </div>

            <div className="timeline-settings-trash-btn-box">
                <Link className="btn timeline-settings-view-btn" to={`/timeline/${id}`}>View</Link>
            </div>
        </div>
    )
}

export default ButtonBox