const AddForm = () => {
    return (
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
    )
}

export default AddForm