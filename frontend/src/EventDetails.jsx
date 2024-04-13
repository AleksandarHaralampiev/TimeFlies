import { useEffect, useState } from "react"
import PopUp from "./components/PopUp"
import { IoCloseOutline } from "react-icons/io5"

const EventDetails = ({ id, events, setSelectedEvent, handleDateFormat }) => {
    const [event, setEvent] = useState(events[id])
    const [date, setDate] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        if(id != null) {
            setEvent(events[id])
            
            setShowAlert(true)
        }
        else setShowAlert(false)
    }, [id])

    useEffect(() => {
        if(event) setDate(handleDateFormat(event.date_modified))
    }, [event])

    return (
        <PopUp
            shown={showAlert}
            closeFunc={() => setSelectedEvent(null)}
            className="event-details-container"
        >
            {
                event &&
                <>
                    <h1 className="event-details-title">{event.title}</h1>
                    <p className="event-details-date">{date}</p>
                    <p className="event-details-description">{event.description}</p>

                    {
                        event.event_pictures.length ?
                        <div className="event-details-img-box">
                            {
                                event.event_pictures.map(pic => (
                                    <img src={pic} alt="" className="event-details-img"/>
                                ))
                            }
                        </div>
                        :
                        null
                    }

                    <IoCloseOutline className="timeline-settings-close" onClick={() => setSelectedEvent(null)} />
                </>
            }
        </PopUp>
    )
}

export default EventDetails