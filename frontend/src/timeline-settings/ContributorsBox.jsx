import { useContext, useEffect, useState } from "react"
import { TimelineContext } from "./TimelineSettings"
import { IoCheckmarkDoneOutline, IoCloseOutline, IoPencilOutline } from "react-icons/io5"
import axios from "axios"
import { DataContext } from "../context/DataContext"
import DotSpinner from "../components/DotSpinner"
import { BarLoader } from "react-spinners"

const ContributorsBox = () => {
    const { handleAlert } = useContext(DataContext)
    const { owner, timeline, setTimeline, addMember, setAddMember } = useContext(TimelineContext)



    // // SEARCH BAR
    const [search, setSearch] = useState('')
    const [shownContributors, setShownContributors] = useState([])

    useEffect(() => {
        if (timeline) setShownContributors(timeline.contributors.filter(user => user.username.toLowerCase().includes(search.toLowerCase())))
    }, [search, timeline])




    // EDIT MEMBERS
    const [editMembers, setEditMembers] = useState(null)
    const [roleEdit, setRoleEdit] = useState(1)
    const [roleLoading, setRoleLoading] = useState(false)


    useEffect(() => {
        if (editMembers) setRoleEdit(timeline.contributors.find(contributor => contributor.id === editMembers).role)
    }, [editMembers])


    const handleEditMember = async (e, userId) => {
        e.preventDefault()

        if (roleEdit !== timeline.contributors.find(contributor => contributor.id === editMembers).role) {
            setRoleLoading(true)

            try {
                const obj = {
                    user_id_role: userId,
                    server_id: timeline.id,
                    new_role: parseInt(roleEdit)
                }

                // console.log(obj)

                const response = await axios.post('http://127.0.0.1:8000/server/changeRole/', obj)

                if (response.status == 200) {
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
            } catch (err) {
                console.log(err)
            } finally {
                setRoleLoading(false)
            }
        }
        setEditMembers(null)
    }




    // REMOVE MEMBERS
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
            setClosePopUp(true)
        }

    }





    // POP UP
    const [closePopUp, setClosePopUp] = useState(false)
    
    useEffect(() => {
        if (closePopUp) {
            setTimeout(() => {
                setRemoveUser(null)
                setClosePopUp(false)
            }, [480])
        }
    }, [closePopUp])





    return (
        <div className="timeline-settings-contributors">
            {
                removeUser &&
                <div className="timeline-settings confirm-delete-container">
                    <div className={closePopUp ? "timeline-settings-container timeline-settings-closed confirm-delete" : "timeline-settings-container confirm-delete"}>
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
                            <button className="btn save-changes cancel" onClick={() => setClosePopUp(true)}>Cancel</button>
                            <button className="btn save-changes" onClick={(e) => handleRemoveUser(e, removeUser)}>Remove</button>
                        </div>
                    </div>
                </div>
            }

            <h2 className="timeline-settings-heading">Contributors</h2>

            {/* SEARCH BOX */}
            <div className="timeline-settings-search-box">
                <input
                    type="text"
                    className="timeline-settings-search"
                    placeholder="Search members"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* ADD BUTTON */}
                {
                    owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) &&
                    <button className="btn" onClick={() => setAddMember(!addMember)}>
                        {
                            addMember ?
                                '- Add'
                                :
                                '+ Add'

                        }
                    </button>
                }
            </div>


            <div className="members-list">
                {
                    shownContributors.length &&
                    shownContributors.map(user => (
                        <>
                            <div className="members-pfp">
                                {
                                    owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) && owner.id !== user.id &&
                                    <IoCloseOutline className="remove-user" onClick={() => setRemoveUser(user.id)} />
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
                                    </select>
                                    
                                    {
                                        roleLoading ?
                                            <div class="members-role-edit">
                                                <DotSpinner />
                                            </div>
                                            :
                                            <button className="members-role-edit" type="submit">
                                                <IoCheckmarkDoneOutline />
                                            </button>
                                    }
                                </form>
                                :
                                <span className="members-role">
                                    {user.role === 1 && <p>Member</p>}
                                    {user.role === 2 && <p>Editor</p>}
                                    {user.role === 3 && <p>Owner</p>}

                                    {
                                        owner.id === parseInt(JSON.parse(localStorage.getItem('accData')).id) && owner.id !== user.id &&
                                        <IoPencilOutline className="members-role-edit" onClick={() => setEditMembers(user.id)} />
                                    }
                                </span>
                            }
                        </>

                    ))
                }
            </div>
        </div>
    )
}

export default ContributorsBox