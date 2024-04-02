import { createContext, useContext, useEffect, useState } from "react"
import { IoCheckmarkDoneOutline, IoCloseOutline, IoPencilOutline } from "react-icons/io5"
import { DataContext } from "../context/DataContext"
import { Link } from "react-router-dom"
import axios from "axios"
import TextBox from "./TextBox"
import BtnBox from "./BtnBox"
import Search from "./Search"
import MembersList from "./MembersList"
import AddForm from "./AddForm"

export const TimelineContext = createContext({})

const TimelineSettings = ({ id, setSettings, list = 'public-timelines' }) => {
    // TIMELINE VARIABLES
    const { publicTimelines, myTimelines, navigate, handleAlert } = useContext(DataContext)
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

    // EDIT TIMELINE
    const handleEditTimeline = async () => {
        try {
            const obj = {
                name,
                description,
                server_id: id
            }

            const response = await axios.post('http://127.0.0.1:8000/server/changes/', obj)

            console.log(response)

            if(response.status == 200) {
                handleAlert('success', 'Changes Saved Successfully!')
            }
        } catch(err) {
            
        }
    }



    // EDIT MEMBERS
    const [editMembers, setEditMembers] = useState(null)
    const [roleEdit, setRoleEdit] = useState(1)

    const handleEditMember = async (e) => {
        e.preventDefault()

        try {
            const obj = {
                user_id_role: editMembers,
                server_id: timeline.id,
                new_role: parseInt(roleEdit)
            }

            // console.log(obj)

            const response = await axios.post('http://127.0.0.1:8000/server/changeRole/', obj)

            console.log(response)
        } catch(err) {
            console.log(err)
        }

        // setEditMembers(null)


    }


    // OWNER
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

    // OPEN ADD FORM
    const [addMember, setAddMember] = useState(false)



    // DELETING TIMELINE
    const handleDelete = async () => {
        try {
            const obj = {
                timeline_id: id
            }

            const response = await axios.post('http://127.0.0.1:8000/server/deleteTimeline/')

            console.log(response)
            if(response.status == 200) {
                handleAlert('success', 'Delete successful')
                handleClose()
            }
        } catch(err) {
            console.log(err)
        }
    }


    return (
        <TimelineContext.Provider value={{
            editName, name, setName, setEditName, setNamePencil, namePencil, owner, editDescription, description, setDescription, setDescriptionPencil, descriptionPencil, timeline, handleDelete, handleEditTimeline,
            setOpenMembers, openMembers, timeline, id,
            search, setSearch, setAddMember, addMember
        }}>

            loading ?
            <p className="timeline-settings">Loading</p>
            :
            <div className="timeline-settings">
                <div className={closed ? "timeline-settings-container timeline-settings-closed" : "timeline-settings-container"}>
                    <TextBox />

                    <BtnBox />
                    
                    {
                        openMembers ?
                        <div className="timeline-settings-contributors">
                            <h2 className="timeline-settings-heading">Contributors</h2>

                            <Search />

                            <MembersList />
                        </div>
                        :
                        null
                    }

                    {
                        openMembers && addMember ?
                        <AddForm />
                        :
                        null

                    }

                    <IoCloseOutline className="timeline-settings-close" onClick={handleClose}/>                
                </div>
            </div>

        </TimelineContext.Provider>
    )
}

export default TimelineSettings