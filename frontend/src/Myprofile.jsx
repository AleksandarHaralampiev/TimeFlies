import { useState, useRef, useContext, useEffect } from "react";
import pfp from './img/pfp.jpg';
import { IoPencilOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { VscMail, VscLock } from "react-icons/vsc";
import { DataContext } from "./context/DataContext";
import axios from "axios";




const MyProfile = () => {
    const { account } = useContext(DataContext)

    useEffect(() => {
        setName(account.username)
    }, [account])



    // SENDING DATA
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(profilePicture)

        const obj = {
            userId: JSON.parse(localStorage.getItem('accData')).id,
            newUsername: name,
            newProfilePicture: profilePicture
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/authenticate/save_changes/', obj)

            console.log(response)
        } catch(err) {
            console.log(err)
        }
    }




    // const [users, setUsers] = useState(USERS);

    const [editField, setEditField] = useState(null);
    // const [value, setValue] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [visible, setVisible] = useState(true);
    const [profilePicture, setProfilePicture] = useState(null);
    const fileInputRef = useRef(null);

    function handleEdit(field) {
        setEditField(field);
        // setValue(users[field]);
    }

    // function handleChange(event) {
    //     setValue(event.target.value);
    // }

    function handleSave() {
        if (editField === 'name') {
            // setUsers(prevUsers => ({
            //     ...prevUsers,
            //     name: value
            // }));
        } else if (editField === 'password') {
            // setUsers(prevUsers => ({
            //     ...prevUsers,
            //     password: value
            // }));
        }
        setEditField(null);
    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
    }

    function handleProfilePictureClick() {
        fileInputRef.current.click();
    }

    return (
        <main className="section-main">
            <div className="profile-container">

                <div className="avatar-container">
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileSelect}
                    />
                    <div className="pfp-container">
                        {profilePicture ? (
                            <img src={profilePicture} className="avatar" alt="Avatar" />
                        ) : (
                            <img src={account.profile_picture} className="avatar" alt="Avatar" />
                        )}
                        <IoPencilOutline className="icon-hover" onClick={handleProfilePictureClick} />
                    </div>
                </div>

                <div className="username-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    {editField === 'name' ? (
                        <input className='username-input' type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                    ) : (
                        <span className="username">{name}</span>
                    )}
                    {editField !== 'name' && (
                        <IoPencilOutline className="icon-hover" onClick={() => handleEdit('name')} />
                    )}
                    {editField === 'name' && (
                        <IoCheckmarkDoneOutline className="tick-hover" onClick={handleSave} />
                    )}
                </div>

                <div className="email-container">
                    <VscMail className="email-icon" />
                    <span className="email">{account.email}</span>
                </div>

                <div className="password-container">
                    <div className={editField === 'password' ? "pas-container-1" : 'pas-container'}>
                        <VscLock className="pass-icon" />
                        {editField === 'password' ? (
                            <input className='password-input' type={visible ? 'text' : 'password'} placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        ) : (
                            <span className="password">{visible && password.length ? password : '*********'}</span>
                            // <span className="password">*********</span>
                        )}
                        <div onClick={() => setVisible(!visible)}>
                            {visible ? <FaRegEye className="eye-icon" /> : <FaRegEyeSlash className="eye-icon" />}
                        </div>
                        <button className='icon' onClick={() => editField === 'password' ? handleSave() : handleEdit('password')}>
                            {editField === 'password' ? (
                                <IoCheckmarkDoneOutline className="pencil-icon" onClick={handleSave} />
                            ) : (
                                <IoPencilOutline className="pencil-icon" />
                            )}
                        </button>
                    </div>


                </div>

                <div className="btn-container">
                    <button className="btn" onClick={(e) => handleSubmit(e)}>Save changes</button>
                </div>

            </div>



            {/* PICTURE */}
            {
                profilePicture ?
                <img src={profilePicture} className="test" />
                :
                null
                // <img src={account.profile_picture} />
            }
        </main>
    );
}


export default MyProfile;
