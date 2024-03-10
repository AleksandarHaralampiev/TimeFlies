import { useContext, useEffect, useState } from "react"
import { IoCheckmarkDoneOutline, IoCloseOutline, IoPencilOutline } from "react-icons/io5"
import { DataContext } from "./context/DataContext"
import { Link } from "react-router-dom"

import pfp from './img/pfp.jpg'

const TimelineSettings = ({ id, setSettings }) => {
    const [closed, setClosed] = useState(false)

    const { publicTimelines } = useContext(DataContext)

    const [timeline, setTimeline] = useState({})

    const [openMembers, setOpenMembers] = useState(false)

    // EDIT NAME
    const [namePencil, setNamePencil] = useState(false)
    const [name, setName] = useState('')
    const [editName, setEditName] = useState(false)

    // EDIT DESCRIPTION
    const [descriptionPencil, setDescriptionPencil] = useState(false)
    const [description, setDescription] = useState('')
    const [editDescription, setEditDescription] = useState(false)

    const profiles = Array.from({ length: 12 }, () => pfp)

    useEffect(() => {
        setTimeline(publicTimelines.find(currentTimeline => currentTimeline.id === id))
    }, [publicTimelines])

    useEffect(() => {
        setName(timeline.name)
        setDescription(timeline.description)
    }, [timeline])

    const handleClose = () => {
        setClosed(true)

        setTimeout(() => {
            setSettings(null)
        }, 400)
    }

    return (
        <div className="timeline-settings">
            <div className={closed ? "timeline-settings-container timeline-settings-closed" : "timeline-settings-container"}>
                <div className="timeline-settings-text-box">
                    {
                        editName ?
                        <div className="timeline-settings-name">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <IoCheckmarkDoneOutline className="timeline-settings-name-icon" onClick={() => setEditName(false)}/>
                        </div>
                        :
                        <div className="timeline-settings-name" onMouseEnter={() => setNamePencil(true)} onMouseLeave={() => setNamePencil(false)}>
                            {name}
                            {
                                namePencil && timeline.owner_id === parseInt(JSON.parse(localStorage.getItem('accData')).id) ?
                                <IoPencilOutline className="timeline-settings-name-icon" onClick={() => setEditName(true)}/>
                                :
                                null
                            }
                        </div>
                    }
                    
                    <p className="timeline-settings-owner">
                        <img src={timeline.owner_photo} alt="Owner Profile Pic" className="timeline-settings-owner-pfp" />
                        <span>{timeline.owner_username}</span>
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
                                descriptionPencil && timeline.owner_id === parseInt(JSON.parse(localStorage.getItem('accData')).id) ?
                                <IoPencilOutline className="timeline-settings-description-icon" onClick={() => setEditDescription(true)}/>
                                :
                                null
                            }
                        </div>
                    }

                    <p className="timeline-settings-date">
                        {timeline.date}
                    </p>
                </div>

                <div className="timeline-settings-btn-box">
                    <div className="timeline-settings-members" onClick={() => setOpenMembers(!openMembers)}>
                        <div className="timeline-img-box timeline-settings-img-box">
                            <img src={timeline.owner_photo} className="timeline-pfp"/>
                            {
                                profiles.slice(0, 4).map(pic => (
                                    <img src={pic} className="timeline-pfp"/>
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
                
                {
                    openMembers ?
                    <div className="timeline-settings-contributors">
                        <h2 className="timeline-settings-heading">Contributors</h2>

                        <input 
                            type="text" 
                            className="timeline-settings-search" 
                            placeholder="Search members" 
                        />

                        <div className="members-list">
                            <img src={timeline.owner_photo} alt="Profile Pic" />
                            <p>{timeline.owner_username}</p>

                            <p className="members-role">Owner</p>

                            {
                                profiles.slice(0, 7).map((pic, index) => (
                                    <>
                                        <img src={pic} alt="Profile Pic" />
                                        <p>Member {index + 1}</p>
                                        <p className="members-role">Member</p>
                                    </>
                                ))
                            }
                        </div>
                    </div>
                    :
                    null
                }

                <IoCloseOutline className="timeline-settings-close" onClick={handleClose}/>
            </div>
        </div>
    )
}

export default TimelineSettings