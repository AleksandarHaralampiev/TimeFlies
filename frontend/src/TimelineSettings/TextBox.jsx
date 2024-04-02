import { useContext } from "react"
import { TimelineContext } from "./TimelineSettings"
import { IoCheckmarkDoneOutline, IoPencilOutline } from "react-icons/io5"

const TextBox = () => {
    const { editName, name, setName, setEditName, setNamePencil, namePencil, owner, editDescription, description, setDescription, setDescriptionPencil, descriptionPencil, timeline, handleDelete, handleEditTimeline } = useContext(TimelineContext)

    return (
        <div className="timeline-settings-text-box">
            {
                editName ?
                <div className="timeline-settings-name">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <IoCheckmarkDoneOutline className="timeline-settings-name-done" onClick={() => setEditName(false)}/>
                </div>
                :
                <div className="timeline-settings-name" onMouseEnter={() => setNamePencil(true)} onMouseLeave={() => setNamePencil(false)}>
                    {name}
                    {
                        namePencil && owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) ?
                        <IoPencilOutline className="timeline-settings-name-edit" onClick={() => setEditName(true)}/>
                        :
                        null
                    }
                </div>
            }
            
            <p className="timeline-settings-owner">
                <img src={owner.profile_picture} alt="Owner Profile Pic" className="timeline-settings-owner-pfp" />
                <span>{owner.username}</span>
            </p>

            {
                editDescription ?
                <div className="timeline-settings-description">
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <IoCheckmarkDoneOutline className="timeline-settings-description-done" onClick={() => setEditDescription(false)}/>

                </div>
                :
                <div className="timeline-settings-description" onMouseEnter={() => setDescriptionPencil(true)} onMouseLeave={() => setDescriptionPencil(false)}>
                    {description}
                    {
                        descriptionPencil && owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) ?
                        <IoPencilOutline className="timeline-settings-description-icon" onClick={() => setEditDescription(true)}/>
                        :
                        null
                    }
                </div>
            }

            <p className="timeline-settings-date">
                {timeline.date}
            </p>

            {
                owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) ?
                <>
                    <button className="btn" onClick={handleDelete}>Delete timeline</button>
                    <button className="btn" onClick={handleEditTimeline}>Save Changes</button>
                </>
                :
                null
            }
        </div>
    )
}

export default TextBox