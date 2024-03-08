import { useState, useRef } from "react";
import pfp from './img/pfp.jpg';
import { IoPencilOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

{/* <FaRegEye />     */ }
{/* <FaRegEyeSlash /> */ }

const USERS = {
    name: 'Username',
    password: '567860',
    email: 'example@email.com',
}


const MyProfile = () => {
    const [users, setUsers] = useState(USERS);
    const [editField, setEditField] = useState(null);
    const [value, setValue] = useState('');
    const [visible, setVisible] = useState(true);
    const [profilePicture, setProfilePicture] = useState(null);
    const fileInputRef = useRef(null);

    function handleEdit(field) {
        setEditField(field);
        setValue(users[field]);
    }

    function handleChange(event) {
        setValue(event.target.value);
    }

    function handleSave() {
        if (editField === 'name') {
            setUsers(prevUsers => ({
                ...prevUsers,
                name: value
            }));
        } else if (editField === 'password') {
            setUsers(prevUsers => ({
                ...prevUsers,
                password: value
            }));
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
                            <img src={pfp} className="avatar" alt="Avatar" />
                        )}
                        <IoPencilOutline className="icon-hover" onClick={handleProfilePictureClick} />
                    </div>
                </div>
                <div className="username-container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    {editField === 'name' ? (
                        <input className='username-input' type="text" required value={value} onChange={handleChange} />
                    ) : (
                        <span className="username">{users.name}</span>
                    )}
                    {editField !== 'name' && (
                        <IoPencilOutline className="icon-hover" onClick={() => handleEdit('name')} />
                    )}
                    {editField === 'name' && (
                        <IoCheckmarkDoneOutline className="tick-hover" onClick={handleSave} />
                    )}
                </div>
                <div className="email-container">
                    <span className="email">email: {users.email}</span>
                </div>
                <div className="password-container">
                    <div className={editField === 'password' ? "pas-container-1" : 'pas-container'}>
                        {editField === 'password' ? (
                            <input className='password-input' type={visible ? 'text' : 'password'} placeholder="password" required value={value} onChange={handleChange} />
                        ) : (
                            <span className="password">password: {visible ? users.password : '*********'}</span>
                        )}
                        <div onClick={() => setVisible(!visible)}>
                            {visible ? <FaRegEye className="eye-icon" /> : <FaRegEyeSlash className="eye-icon" />}
                        </div>
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
        </main>
    );
}


export default MyProfile;
