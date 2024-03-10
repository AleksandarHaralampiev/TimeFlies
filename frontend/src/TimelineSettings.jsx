import { useContext, useEffect, useState } from "react"
import { IoCheckmarkDoneOutline, IoCloseOutline, IoPencilOutline } from "react-icons/io5"
import { DataContext } from "./context/DataContext"
import { Link } from "react-router-dom"
import axios from "axios"

const TimelineSettings = ({ id, setSettings }) => {
    // TIMELINE VARIABLES
    const { publicTimelines } = useContext(DataContext)
    const [timeline, setTimeline] = useState()
    
    

    // MENU VARIABLES
    const [closed, setClosed] = useState(false)
    const [openMembers, setOpenMembers] = useState(false)



    // LOADING
    const [loading, setLoading] = useState(true)



    // EDIT NAME
    const [namePencil, setNamePencil] = useState(false)
    const [name, setName] = useState('')
    const [editName, setEditName] = useState(false)



    // EDIT DESCRIPTION
    const [descriptionPencil, setDescriptionPencil] = useState(false)
    const [description, setDescription] = useState('')
    const [editDescription, setEditDescription] = useState(false)



    // OWNER
    const [owner, setOwner] = useState(null)

    useEffect(() => {
        // console.log(`Owner id: ${owner.id}`)
        console.log(owner)
        console.log(`Account id: ${parseInt(JSON.parse(localStorage.getItem('accData')).id)}`)
    }, [owner])



    // SEARCH BAR
    const [search, setSearch] = useState('')
    const [shownContributors, setShownContributors] = useState([])

    useEffect(() => {
        if(timeline) setShownContributors(timeline.contributors.filter(user => user.username.toLowerCase().includes(search.toLowerCase())))
    }, [search, timeline])




    // ADDING NEW MEMBERS
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
            const foundTimeline = publicTimelines.find(currentTimeline => currentTimeline.id === id)
            
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

    // OPEN ADD FORM
    const [addMember, setAddMember] = useState(false)

    return (
        loading ?
        <p className="timeline-settings">Loading</p>
        :
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

                    <Link className="btn timeline-settings-view-btn" to={`/timeline/${id}`}>View</Link>
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
                                // owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) ?
                                <button className="btn" onClick={() => setAddMember(!addMember)}>
                                    {
                                        addMember ?
                                        '- Add'
                                        :
                                        '+ Add'

                                    }
                                </button>
                                // :
                                // null
                            }
                        </div>

                        <div className="members-list">
                            {
                                shownContributors.length ?
                                shownContributors.map(user => (
                                    <>
                                        <img src={user.profile_picture} alt="Profile Pic" />
                                        <p>{user.username}</p>
                                        <p className="members-role">{
                                            user.role === 1 ?
                                            'Member' :
                                            user.role === 2 ?
                                            'Editor' :
                                            user.role === 3 ?
                                            'Owner' :
                                            null
                                        }</p>
                                    </>
                                    
                                ))
                                :
                                null
                            }


                            {
                                // profiles.slice(0, 7).map((pic, index) => (
                                //     <>
                                //         <img src={pic} alt="Profile Pic" />
                                //         <p>Member {index + 1}</p>
                                //         <p className="members-role">Member</p>
                                //     </>
                                // ))
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
    )
}

export default TimelineSettings