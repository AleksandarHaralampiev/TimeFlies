import { useContext, useEffect, useState } from "react"
import { IoCheckmarkDoneOutline, IoCloseOutline, IoPencilOutline } from "react-icons/io5"
import { DataContext } from "./context/DataContext"
import { Link } from "react-router-dom"
import axios from "axios"
import pfp from './img/pfp.jpg'
import { FaTrash } from "react-icons/fa";
import { BarLoader, FadeLoader } from "react-spinners";
import Spinner from 'react-bootstrap/Spinner';

const TimelineSettings = ({ id, setSettings, list = 'public-timelines' }) => {
    // const owner = {
    //     id: 6,
    //     profile_picture: pfp,
    //     username: 'MARTIN'
    // }

    // const timeline = {
    //     date: '02-04-2024',
    //     contributors: [
    //         {
    //             profile_picture: pfp,
    //             username: 'ANASTASOV',
    //             id: 1,
    //             role: 3
    //         },
    //         {
    //             profile_picture: pfp,
    //             username: 'ANASTASOV',
    //             id: 2,
    //             role: 2
    //         },
    //         {
    //             profile_picture: pfp,
    //             username: 'ANASTASOV',
    //             id: 3,
    //             role: 1
    //         }
    //     ]
    // }

    

    

    // TIMELINE VARIABLES
    const { publicTimelines, setPublicTimelines, myTimelines, setMyTimelines, navigate, handleAlert } = useContext(DataContext)
    const [timeline, setTimeline] = useState()
    
    

    // // MENU VARIABLES
    const [closed, setClosed] = useState(false)
    const [openMembers, setOpenMembers] = useState(false)



    // // LOADING
    const [loading, setLoading] = useState(true)



    // // EDIT NAME
    const [namePencil, setNamePencil] = useState(false)
    const [name, setName] = useState('')
    const [editName, setEditName] = useState(false)

    // // EDIT DESCRIPTION
    const [descriptionPencil, setDescriptionPencil] = useState(false)
    const [description, setDescription] = useState('')
    const [editDescription, setEditDescription] = useState(false)

    // // EDIT TIMELINE
    const [loadingTimeline, setLoadingTimeline] = useState(false)

    const handleEditTimeline = async () => {
        setLoadingTimeline(true)

        try {
            const obj = {
                name,
                description,
                server_id: id
            }

            const response = await axios.post('http://127.0.0.1:8000/server/changes/', obj)

            console.log(response)

            if(response.status == 200) {
                setTimeline({...timeline, name: name, description: description})
                handleAlert('success', 'Changes saved successfully!')
                setChanges(false)
            }
        } catch(err) {
            console.log(err)
            handleAlert('error', "Couldn't save the changes!")
        } finally {
            setLoadingTimeline(false)
        }
    }


    const [changes, setChanges] = useState(false)

    useEffect(() => {
        // if(editName || editDescription) setChanges(true)
        if(timeline){
            if(name !== timeline.name || description !== timeline.description) setChanges(true)
            else setChanges(false)
        }
    }, [name, description])



    // // EDIT MEMBERS
    const [editMembers, setEditMembers] = useState(null)
    const [roleEdit, setRoleEdit] = useState(1)
    const [roleLoading, setRoleLoading] = useState(false)
    const [removeUser, setRemoveUser] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)

    useEffect(() => {
        if(editMembers) setRoleEdit(timeline.contributors.find(contributor => contributor.id === editMembers).role)
    }, [editMembers])

    const handleRemoveUser = async (e, userId) => {
        e.preventDefault()

        setRemoveLoading(true)

        try {
            const obj = {
                user_id_role: userId,
                server_id: timeline.id,
                new_role: 0
            }

            // console.log(obj)

            const response = await axios.post('http://127.0.0.1:8000/server/changeRole/', obj)

            console.log(response)

            if(response.status == 200) {
                const user = timeline.contributors.find(contributor => contributor.id === userId).username

                const updatedContributors = timeline.contributors.filter(contributor => contributor.id !== userId)
                const updatedTimeline = {
                    ...timeline,
                    contributors: updatedContributors
                }
                setTimeline(updatedTimeline)
                setShownContributors(updatedContributors)
                
                handleAlert('success', `${user} was removed from your timeline.`)
            }
        } catch(err) {
            console.log(err)
        } finally {
            setRemoveLoading(false)
            setCloseDelete(true)
        }

    }

    const handleEditMember = async (e, userId) => {
        e.preventDefault()

        if(roleEdit !== timeline.contributors.find(contributor => contributor.id === editMembers).role){
            setRoleLoading(true)

            try {
                const obj = {
                    user_id_role: userId,
                    server_id: timeline.id,
                    new_role: parseInt(roleEdit)
                }

                // console.log(obj)

                const response = await axios.post('http://127.0.0.1:8000/server/changeRole/', obj)

                if(response.status == 200) {
                    handleAlert('success', 'Role was changed.')
                    // const updatedContributors = [ 
                    //     ...timeline.contributors,
                    //     {
                    //         ...timeline.contributors.find(contributor => contributor.id === userId),
                    //         role: roleEdit
                    //     }
                    // ]

                    const index = timeline.contributors.findIndex(contributor => contributor.id === userId)

                    let updatedObject = timeline.contributors[index]

                    updatedObject.role = parseInt(roleEdit)

                    console.log(updatedObject)
                    console.log(shownContributors)

                    let updatedContributors = timeline.contributors
                    updatedContributors[index] = updatedObject

                    const updatedTimeline = {
                        ...timeline,
                        contributors: updatedContributors
                    }
                    setTimeline(updatedTimeline)
                    setShownContributors(updatedContributors)
                }

                console.log(response)
            } catch(err) {
                console.log(err)
            } finally {
                setRoleLoading(false)
            }
        }
        setEditMembers(null)
    }


    // // OWNER
    const [owner, setOwner] = useState(null)

    useEffect(() => {
        // console.log(`Owner id: ${owner.id}`)
        console.log(owner)
        console.log(`Account id: ${parseInt(JSON.parse(localStorage.getItem('accData')).id)}`)
    }, [owner])



    useEffect(() => {
        const currentScroll = window.scrollY

        window.scrollTo(0, 0);

        return () => window.scrollTo(0, currentScroll)
    }, [])



    // // SEARCH BAR
    const [search, setSearch] = useState('')
    const [shownContributors, setShownContributors] = useState([])

    useEffect(() => {
        if(timeline) setShownContributors(timeline.contributors.filter(user => user.username.toLowerCase().includes(search.toLowerCase())))
    }, [search, timeline])




    // // ADDING NEW MEMBERS
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('1')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const obj = {
            email,
            server_id: id,
            role
        }

        console.log(obj)

        try {
            const response = await axios.post('http://127.0.0.1:8000/server/addUserToServer/', obj)

            console.log(response)
        } catch(err) {
            console.log(err)
        } finally {
            setEmail('')
            setRole('1')
        }
    }




    // SETTING THE VARIABLES
    useEffect(() => {
        const fetchData = async () => {
            const foundTimeline = list === 'my-timelines' ? myTimelines.find(currentTimeline => currentTimeline.id === id) : publicTimelines.find(currentTimeline => currentTimeline.id === id)
            
            const sortedContributors = foundTimeline.contributors.sort((user1, user2) => {
                if(user1.role > user2.role) return -1
                else if(user1.role < user2.role) return 1
                else return 0
            })

            // console.log('Sorted Contributors')
            // console.log(sortedContributors)

            const sortedTimeline = {...foundTimeline, contributors: sortedContributors }
            
            // console.log('Sorted Timeline')
            // console.log(sortedTimeline)

            setTimeline(sortedTimeline)
        
            if (sortedTimeline) {
                setName(sortedTimeline.name)
                setDescription(sortedTimeline.description)
            
                setOwner(sortedTimeline.contributors.find(user => user.role === 3))
            
                setLoading(false)

                console.log(timeline)
            }
        }
        
        fetchData()
    }, [publicTimelines, id])



    
    // CLOSING THE SETTINGS
    const handleClose = () => {
        setClosed(true)

        setTimeout(() => {
            setSettings(null)
        }, 400)
    }

    // // OPEN ADD FORM
    const [addMember, setAddMember] = useState(false)



    // DELETING TIMELINE
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [closeDelete, setCloseDelete] = useState(false)

    useEffect(() => {
        if(closeDelete){
            setTimeout(() => {
                setConfirmDelete(false)
                setRemoveUser(null)
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
            if(response.status == 200) {
                handleAlert('success', 'Delete successful.')
                setMyTimelines(myTimelines.filter(currentTimeline => currentTimeline.id !== id))
                setPublicTimelines(publicTimelines.filter(currentTimeline => currentTimeline.id !== id))
                handleClose()
            }
        } catch(err) {
            console.log(err)
            handleAlert('error', "Couldn't delete timeline!")
        } finally {
            setLoadingTimeline(false)
        }
    }



    return (
        <>
            {
                loading ?
                <p className="timeline-settings">Loading</p>
                :
                <div className="timeline-settings">
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
                    }
                    {
                        removeUser &&
                        <div className="timeline-settings confirm-delete-container">
                            <div className={closeDelete ? "timeline-settings-container timeline-settings-closed confirm-delete" : "timeline-settings-container confirm-delete"}>
                                <p className="confirm-delete-title">Are you sure you want to remove {
                                    ` ${
                                        timeline.contributors.find(contributor => contributor.id === removeUser) ?
                                        timeline.contributors.find(contributor => contributor.id === removeUser).username
                                        :
                                        'user'
                                    } `
                                } from your timeline?</p>
                                {
                                    removeLoading &&
                                    <BarLoader color="#625149" width={300} className="timeline-settings-loading"/>
                                }
                                <div className="confirm-delete-btn-box">
                                    <button className="btn save-changes cancel" onClick={() => setCloseDelete(true)}>Cancel</button>
                                    <button className="btn save-changes" onClick={(e) => handleRemoveUser(e, removeUser)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    }
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
                                    <IoCheckmarkDoneOutline className="timeline-settings-name-done" onClick={() => setEditName(false)}/>
                                </div>
                                :
                                <div className="timeline-settings-name" onMouseEnter={() => setNamePencil(true)} onMouseLeave={() => setNamePencil(false)}>
                                    {name}
                                    {
                                        namePencil && owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) ?
                                        // namePencil ?
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
                                loadingTimeline &&
                                <BarLoader color="#625149" width={300} className="timeline-settings-loading"/>
                            }

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
                                        // descriptionPencil ?
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
                                changes &&
                                <>
                                    <Link className="btn save-changes" onClick={handleEditTimeline}>Save Changes</Link>
                                </>
                            }

                            {
                                owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) &&
                                <FaTrash className="trash-icon" onClick={() => setConfirmDelete(true)}/>
                            }
                            
                        </div>

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

                            <div className="timeline-settings-trash-btn-box">
                                <Link className="btn timeline-settings-view-btn" to={`/timeline/${id}`}>View</Link>
                            </div>
                        </div>
                        
                        {
                            openMembers ?
                            <div className="timeline-settings-contributors">
                                <h2 className="timeline-settings-heading">Contributors</h2>

                                <div className="timeline-settings-search-box">
                                    <input
                                        type="text" 
                                        className="timeline-settings-search" 
                                        placeholder="Search members"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />

                                    {
                                        owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) ?
                                        <button className="btn" onClick={() => setAddMember(!addMember)}>
                                            {
                                                addMember ?
                                                '- Add'
                                                :
                                                '+ Add'

                                            }
                                        </button>
                                        :
                                        null
                                    }
                                </div>

                                <div className="members-list">
                                    {
                                        shownContributors.length ?
                                        shownContributors.map(user => (
                                            <>
                                                <div className="members-pfp">
                                                    {
                                                        owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) && owner.id !== user.id &&
                                                        <IoCloseOutline className="remove-user" onClick={() => setRemoveUser(user.id)}/>
                                                    }
                                                    <img src={user.profile_picture} alt="Profile Pic" />
                                                </div>
                                                <p>{user.username}</p>
                                                {
                                                    editMembers === user.id ?
                                                    <form className="members-role" onSubmit={(e) => handleEditMember(e, user.id)}>
                                                        <select className="members-role" value={roleEdit} onChange={(e) => setRoleEdit(e.target.value)}>
                                                            <option value={2}>Editor</option>
                                                            <option value={1}>Member</option>
                                                            <option value={0}>Remove</option>
                                                        </select>
                                                        {
                                                            roleLoading ?
                                                            <div class="members-role-edit">
                                                                <div className="dot-spinner">
                                                                {
                                                                    Array.from({length: 8}, _ => null).map(_ => (
                                                                        <div class="dot-spinner__dot"></div>
                                                                    ))
                                                                }
                                                                </div>
                                                            </div>
                                                            :
                                                            <button className="members-role-edit" type="submit">
                                                                <IoCheckmarkDoneOutline/>
                                                            </button>
                                                        }
                                                    </form>
                                                    :
                                                    <span className="members-role">
                                                        <p>
                                                            {
                                                            user.role === 1 ?
                                                            'Member' :
                                                            user.role === 2 ?
                                                            'Editor' :
                                                            user.role === 3 ?
                                                            'Owner' :
                                                            null
                                                            }
                                                        </p>
                                                        {
                                                            owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) && owner.id !== user.id ?
                                                            <IoPencilOutline className="members-role-edit" onClick={() => setEditMembers(user.id)}/>
                                                            :
                                                            null
                                                        }
                                                    </span>
                                                }
                                            </>
                                            
                                        ))
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            :
                            null
                        }

                        {
                            openMembers && addMember ?
                            <form className="timeline-settings-add-form" onSubmit={(e) => handleSubmit(e)}>
                                <input 
                                    type="email" 
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value='1'>Member</option>
                                    <option value='2'>Editor</option>
                                </select>

                                <button className="btn" type="submit">Add new member</button>
                            </form>
                            :
                            null

                        }

                        <IoCloseOutline className="timeline-settings-close" onClick={handleClose}/>
                                    
                    </div>
                </div>
            }
        </>
    )
}

export default TimelineSettings