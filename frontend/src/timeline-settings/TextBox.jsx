import { useContext } from "react"
import { TimelineContext } from "./TimelineSettings"

const TextBox = () => {
    const { editName, setEditName, name, setName, namePencil, setNamePencil, owner, loadingTimeline, editDescription, description, descriptionPencil, timeline, changes } = useContext(TimelineContext)

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
                        <IoCheckmarkDoneOutline className="timeline-settings-name-done" onClick={() => setEditName(false)} />
                    </div>
                    :
                    <div className="timeline-settings-name" onMouseEnter={() => setNamePencil(true)} onMouseLeave={() => setNamePencil(false)}>
                        {name}
                        {
                            namePencil && owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) ?
                                // namePencil ?
                                <IoPencilOutline className="timeline-settings-name-edit" onClick={() => setEditName(true)} />
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
                loadingTimeline &&
                <BarLoader color="#625149" width={300} className="timeline-settings-loading" />
            }

            {
                editDescription ?
                    <div className="timeline-settings-description">
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <IoCheckmarkDoneOutline className="timeline-settings-description-done" onClick={() => setEditDescription(false)} />

                    </div>
                    :
                    <div className="timeline-settings-description" onMouseEnter={() => setDescriptionPencil(true)} onMouseLeave={() => setDescriptionPencil(false)}>
                        {description}
                        {
                            descriptionPencil && owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) ?
                                // descriptionPencil ?
                                <IoPencilOutline className="timeline-settings-description-icon" onClick={() => setEditDescription(true)} />
                                :
                                null
                        }
                    </div>
            }

            <p className="timeline-settings-date">
                {timeline.date}
            </p>

            {
                changes &&
                <>
                    <Link className="btn save-changes" onClick={handleEditTimeline}>Save Changes</Link>
                </>
            }

            {
                owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) &&
                <FaTrash className="trash-icon" onClick={() => setConfirmDelete(true)} />
            }

        </div>
    )
}

export default TextBox