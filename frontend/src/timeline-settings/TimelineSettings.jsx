import { createContext, useContext, useEffect, useState } from "react"
import { IoCheckmarkDoneOutline, IoCloseOutline, IoPencilOutline } from "react-icons/io5"
import { DataContext } from "../context/DataContext"
import { Link } from "react-router-dom"
import axios from "axios"
import pfp from '../img/pfp.jpg'
import { BarLoader, FadeLoader } from "react-spinners";
import PopUp from "../components/PopUp"
import TextBox from "./TextBox"
import ButtonBox from "./ButtonBox"
import ContributorsBox from "./ContributorsBox"

export const TimelineContext = createContext({})

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



    // // EDIT MEMBERS
    const [removeUser, setRemoveUser] = useState(false)
    const [removeLoading, setRemoveLoading] = useState(false)



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

            if (response.status == 200) {
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
        } catch (err) {
            console.log(err)
        } finally {
            setRemoveLoading(false)
            setCloseDelete(true)
        }

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





    // // ADDING NEW MEMBERS
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('1')
    const [addLoading, setAddLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setAddLoading(true)

        const obj = {
            email,
            server_id: id,
            role
        }

        console.log(obj)

        try {
            const response = await axios.post('http://127.0.0.1:8000/server/addUserToServer/', obj)

            console.log(response)

            if (response.status == 200) {
                handleAlert('success', 'User added successfully! Refresh to see them in the list.')
            }
        } catch (err) {
            console.log(err)
            handleAlert('error', "Couldn't add user.")
        } finally {
            setEmail('')
            setRole('1')
            setAddLoading(false)
        }
    }




    // SETTING THE VARIABLES
    useEffect(() => {
        const fetchData = async () => {
            const foundTimeline = list === 'my-timelines' ? myTimelines.find(currentTimeline => currentTimeline.id === id) : publicTimelines.find(currentTimeline => currentTimeline.id === id)

            const sortedContributors = foundTimeline.contributors.sort((user1, user2) => {
                if (user1.role > user2.role) return -1
                else if (user1.role < user2.role) return 1
                else return 0
            })

            // console.log('Sorted Contributors')
            // console.log(sortedContributors)

            const sortedTimeline = { ...foundTimeline, contributors: sortedContributors }

            // console.log('Sorted Timeline')
            // console.log(sortedTimeline)

            setTimeline(sortedTimeline)

            if (sortedTimeline) {
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
        if (closeDelete) {
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
        <TimelineContext.Provider value={{
            id, owner, timeline, setTimeline, setConfirmDelete,
            openMembers, setOpenMembers,
            addMember, setAddMember, setRemoveUser
        }}>
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
                            // <PopUp closeFunc={() => setCloseDelete(true)}>
                            //     <p className="confirm-delete-title">Are you sure you want to delete this timeline?</p>
                            //     <div className="confirm-delete-btn-box">
                            //         <button className="btn save-changes cancel" /*onClick={() => setCloseDelete(true)}*/>Cancel</button>
                            //         <button className="btn save-changes" onClick={handleDelete}>Delete</button>
                            //     </div>
                            // </PopUp>
                        }
                        {
                            removeUser &&
                            <div className="timeline-settings confirm-delete-container">
                                <div className={closeDelete ? "timeline-settings-container timeline-settings-closed confirm-delete" : "timeline-settings-container confirm-delete"}>
                                    <p className="confirm-delete-title">Are you sure you want to remove {
                                        ` ${timeline.contributors.find(contributor => contributor.id === removeUser) ?
                                            timeline.contributors.find(contributor => contributor.id === removeUser).username
                                            :
                                            'user'
                                        } `
                                    } from your timeline?</p>
                                    {
                                        removeLoading &&
                                        <BarLoader color="#625149" width={300} className="timeline-settings-loading" />
                                    }
                                    <div className="confirm-delete-btn-box">
                                        <button className="btn save-changes cancel" onClick={() => setCloseDelete(true)}>Cancel</button>
                                        <button className="btn save-changes" onClick={(e) => handleRemoveUser(e, removeUser)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className={closed ? "timeline-settings-container timeline-settings-closed" : "timeline-settings-container"}>
                            <TextBox />

                            <ButtonBox />

                            {
                                openMembers &&
                                <ContributorsBox />
                            }

                            {
                                openMembers && addMember ?
                                    <>
                                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="icon-new" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M145.61 464h220.78c19.8 0 35.55-16.29 33.42-35.06C386.06 308 304 310 304 256s83.11-51 95.8-172.94c2-18.78-13.61-35.06-33.41-35.06H145.61c-19.8 0-35.37 16.28-33.41 35.06C124.89 205 208 201 208 256s-82.06 52-95.8 172.94c-2.14 18.77 13.61 35.06 33.41 35.06z"></path><path d="M343.3 432H169.13c-15.6 0-20-18-9.06-29.16C186.55 376 240 356.78 240 326V224c0-19.85-38-35-61.51-67.2-3.88-5.31-3.49-12.8 6.37-12.8h142.73c8.41 0 10.23 7.43 6.4 12.75C310.82 189 272 204.05 272 224v102c0 30.53 55.71 47 80.4 76.87 9.95 12.04 6.47 29.13-9.1 29.13z"></path>
                                        </svg>
                                        <h2 className="timeline-settings-heading">Add user to your timeline</h2>
                                        {
                                            addLoading &&
                                            <BarLoader color="#625149" width={400} className="timeline-settings-loading" />
                                        }
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
                                    </>
                                    :
                                    null

                            }

                            <IoCloseOutline className="timeline-settings-close" onClick={handleClose} />

                        </div>
                    </div>
            }
        </TimelineContext.Provider>
    )
}

export default TimelineSettings