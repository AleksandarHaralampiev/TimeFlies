const MembersList = () => {
    return (
        <div className="members-list">
            {
                shownContributors.length ?
                shownContributors.map(user => (
                    <>
                        <img src={user.profile_picture} alt="Profile Pic" />
                        <p>{user.username}</p>
                        {
                            editMembers === user.id ?
                            <form className="members-role" onSubmit={(e) => handleEditMember(e)}>
                                <select className="members-role" value={roleEdit} onChange={(e) => setRoleEdit(e.target.value)}>
                                    <option value={2}>Editor</option>
                                    <option value={1}>Member</option>
                                    <option value={0}>Remove</option>
                                </select>
                                <button className="members-role-edit" type="submit">
                                    <IoCheckmarkDoneOutline/>
                                </button>
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
    )
}

export default MembersList