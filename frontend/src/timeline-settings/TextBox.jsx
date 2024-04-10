const TextBox = () => {
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

            if (response.status == 200) {
                setTimeline({ ...timeline, name: name, description: description })
                handleAlert('success', 'Changes saved successfully!')
                setChanges(false)
            }
        } catch (err) {
            console.log(err)
            handleAlert('error', "Couldn't save the changes!")
        } finally {
            setLoadingTimeline(false)
        }
    }

    return (
        <div className="timeline-settings-text-box">
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