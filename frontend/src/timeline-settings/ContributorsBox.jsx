import { useContext, useEffect, useState } from "react"
import { TimelineContext } from "./TimelineSettings"
import { IoCheckmarkDoneOutline, IoCloseOutline, IoPencilOutline } from "react-icons/io5"
import axios from "axios"
import { DataContext } from "../context/DataContext"

const ContributorsBox = () => {
    const { handleAlert } = useContext(DataContext)
    const { owner, timeline, setTimeline, addMember, setAddMember, setRemoveUser } = useContext(TimelineContext)



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





    return (
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
                                                <option value={0}>Remove</option>
                                            </select>
                                            {
                                                roleLoading ?
                                                    <div class="members-role-edit">
                                                        <div className="dot-spinner">
                                                            {
                                                                Array.from({ length: 8 }, _ => null).map(_ => (
                                                                    <div class="dot-spinner__dot"></div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    :
                                                    <button className="members-role-edit" type="submit">
                                                        <IoCheckmarkDoneOutline />
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
                                                    <IoPencilOutline className="members-role-edit" onClick={() => setEditMembers(user.id)} />
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
    )
}

export default ContributorsBox