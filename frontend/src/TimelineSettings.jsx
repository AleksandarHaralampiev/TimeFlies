import { useEffect } from "react"
import { IoCloseOutline } from "react-icons/io5"

const TimelineSettings = ({ setSettings }) => {
    useEffect(() => {
        const handleClose = (e) => {
            
        }

        document.addEventListener('click', handleClose)
    }, [])

    return (
        <div className="timeline-settings">
            <div className="timeline-settings-container">
                <IoCloseOutline className="timeline-settings-close" onClick={() => setSettings(null)}/>
            </div>
        </div>
    )
}

export default TimelineSettings