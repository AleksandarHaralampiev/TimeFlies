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
import AddMember from "./AddMember"

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
                                openMembers && addMember &&
                                <AddMember />
                            }

                            <IoCloseOutline className="timeline-settings-close" onClick={handleClose} />

                        </div>
                    </div>
            }
        </TimelineContext.Provider>
    )
}

export default TimelineSettings