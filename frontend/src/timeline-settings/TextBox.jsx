import { useContext, useEffect, useState } from "react"
import { TimelineContext } from "./TimelineSettings"
import { FaTrash } from "react-icons/fa";
import { IoCheckmarkDoneOutline, IoPencilOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { DataContext } from "../context/DataContext";
import axios from "axios";

const TextBox = () => {
    // GLOBAL
    const { handleAlert, myTimelines, setMyTimelines, publicTimelines, setPublicTimelines } = useContext(DataContext)
    const { id, owner, timeline, setTimeline, handleClose } = useContext(TimelineContext)





    // // EDIT NAME
    const [namePencil, setNamePencil] = useState(false)
    const [name, setName] = useState('')
    const [editName, setEditName] = useState(false)


    // // EDIT DESCRIPTION
    const [descriptionPencil, setDescriptionPencil] = useState(false)
    const [description, setDescription] = useState('')
    const [editDescription, setEditDescription] = useState(false)


    // DEFAULT NAME AND DESCRIPTION
    useEffect(() => {
        if(timeline) {
            setName(timeline.name)
            setDescription(timeline.description)
        }
    }, [timeline])




    // CHANGES
    const [changes, setChanges] = useState(false)

    useEffect(() => {
        if (timeline) {
            if (name !== timeline.name || description !== timeline.description) setChanges(true)
            else setChanges(false)
        }
    }, [name, description])




    // // EDIT TIMELINE
    const [loadingTimeline, setLoadingTimeline] = useState(false)

    const handleEditTimeline = async () => {
        setLoadingTimeline(true)
        setEditName(false)
        setEditDescription(false)

        try {
            const obj = {
                name,
                description,
                server_id: id
            }

            const response = await axios.post('http://127.0.0.1:8000/server/changes/', obj)

            console.log(response)

            if (response.status == 200) {
                setTimeline({ ...timeline, name: name, description: description })
                handleAlert('success', 'Changes saved successfully!')
                setChanges(false)
            }
        } catch (err) {
            console.log(err)
            handleAlert('error', "Couldn't save the changes!")
            setName(timeline.name)
            setDescription(timeline.description)
        } finally {
            setLoadingTimeline(false)
        }
    }





    // DELETE TIMELINE
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [closeDelete, setCloseDelete] = useState(false)

    useEffect(() => {
        if (closeDelete) {
            setTimeout(() => {
                setConfirmDelete(false)
                setCloseDelete(false)
            }, [480])
        }
    }, [closeDelete])


    const handleDelete = async () => {
        setLoadingTimeline(true)

        setCloseDelete(true)

        try {
            const obj = {
                timeline_id: id
            }

            console.log(obj)

            const response = await axios.post('http://127.0.0.1:8000/server/deleteTimeline/', obj)

            console.log(response)
            if (response.status == 200) {
                handleAlert('success', 'Delete successful.')
                setMyTimelines(myTimelines.filter(currentTimeline => currentTimeline.id !== id))
                setPublicTimelines(publicTimelines.filter(currentTimeline => currentTimeline.id !== id))
                handleClose()
            }
        } catch (err) {
            console.log(err)
            handleAlert('error', "Couldn't delete timeline!")
        } finally {
            setLoadingTimeline(false)
        }
    }

    



    return (
        <div className="timeline-settings-text-box">

        {
            confirmDelete &&
            <div className="timeline-settings confirm-delete-container">
                <div className={closeDelete ? "timeline-settings-container timeline-settings-closed confirm-delete" : "timeline-settings-container confirm-delete"}>
                    <p className="confirm-delete-title">Are you sure you want to delete this timeline?</p>
                    <div className="confirm-delete-btn-box">
                        <button className="btn save-changes cancel" onClick={() => setCloseDelete(true)}>Cancel</button>
                        <button className="btn save-changes" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
            // <PopUp closeFunc={() => setCloseDelete(true)}>
            //     <p className="confirm-delete-title">Are you sure you want to delete this timeline?</p>
            //     <div className="confirm-delete-btn-box">
            //         <button className="btn save-changes cancel" /*onClick={() => setCloseDelete(true)}*/>Cancel</button>
            //         <button className="btn save-changes" onClick={handleDelete}>Delete</button>
            //     </div>
            // </PopUp>
        }

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