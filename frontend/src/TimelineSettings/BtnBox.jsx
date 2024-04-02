import { useContext } from "react"
import { Link } from "react-router-dom"
import { TimelineContext } from "./TimelineSettings"

const BtnBox = () => {
    const { setOpenMembers, openMembers, timeline, id } = useContext(TimelineContext)

    return (
        <div className="timeline-settings-btn-box">
            <div className="timeline-settings-members" onClick={() => setOpenMembers(!openMembers)}>
                <div className="timeline-img-box timeline-settings-img-box">
                    {
                        timeline.contributors.map(user => (
                            <img src={user.profile_picture} className="timeline-pfp"/>
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

            <Link className="btn timeline-settings-view-btn" to={`/timeline/${id}`}>View</Link>
        </div>
    )
}

export default BtnBox