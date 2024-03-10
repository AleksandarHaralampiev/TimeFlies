import { useContext, useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { DataContext } from "./context/DataContext"

const TimelineSettings = ({ id, setSettings }) => {
    const [closed, setClosed] = useState(false)

    const { publicTimelines } = useContext(DataContext)

    const [timeline, setTimeline] = useState({})

    useEffect(() => {
        setTimeline(publicTimelines.find(currentTimeline => currentTimeline.id === id))
        console.log('current timeline')
        console.log(timeline)
    }, [publicTimelines])

    const handleClose = () => {
        setClosed(true)

        setTimeout(() => {
            setSettings(null)
        }, 400)
    }

    const currentDate = new Date()

    return (
        <div className="timeline-settings">
            <div className={closed ? "timeline-settings-container timeline-settings-closed" : "timeline-settings-container"}>
                <div className="timeline-settings-text-box">
                    <h2 className="timeline-settings-name">{timeline.name}</h2>
                    <p className="timeline-settings-owner">
                        <img src={timeline.owner_photo} alt="Owner Profile Pic" className="timeline-settings-owner-pfp" />
                        <span>{timeline.owner_username}</span>
                    </p>

                    <p className="timeline-settings-description">{timeline.description}</p>

                    <p className="timeline-settings-date">
                        {/* {currentDate.getDate()} - {currentDate.getMonth()} - {currentDate.getFullYear()} */}
                        {timeline.date}
                    </p>
                </div>

                <div className="timeline-settings-btn-box">

                </div>

                <IoCloseOutline className="timeline-settings-close" onClick={handleClose}/>
            </div>
        </div>
    )
}

export default TimelineSettings