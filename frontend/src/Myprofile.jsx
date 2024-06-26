import { useState, useRef, useContext, useEffect } from "react";
import { IoPencilOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { VscMail, VscLock } from "react-icons/vsc";
import { DataContext } from "./context/DataContext";
import axios from "axios";

const MyProfile = () => {
    const { account, handleAlert, fetchAccount, fetchPublicTimelines, fetchMyTimelines, loggedIn, navigate } = useContext(DataContext);

    useEffect(() => {
        setName(account.username);
    }, [account]);

    const [editField, setEditField] = useState(null);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [newPass, setNewPass] = useState(false);
    // const [visible, setVisible] = useState(true);
    const [profilePicture, setProfilePicture] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!loggedIn) navigate('/login')
    }, [loggedIn])

    function handleEdit(field) {
        setEditField(field);
    }

    function handleSave() {
        if (editField === 'name') {
            // handle name change
        } else if (editField === 'password') {
            // handle password change
        }
        setEditField(null);
    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            setProfilePicture(file);
        }
    }

    async function handleSubmit(e) {
        setNewPass(false);
        e.preventDefault();

        const formData = new FormData();
        formData.append('userId', JSON.parse(localStorage.getItem('accData')).id);
        formData.append('newUsername', name);
        formData.append('newProfilePicture', profilePicture);

        try {
            const response = await axios.post('http://127.0.0.1:8000/authenticate/save_changes/', formData);

            console.log(response);

            if (response.status == 201) {
                handleAlert('success', 'Changes saved successfully.')
                fetchAccount()
                fetchMyTimelines()
                fetchPublicTimelines()
            }
        } catch (err) {
            console.log(err);
        }
    }

    function handleProfilePictureClick() {
        fileInputRef.current.click();
    }




    return (
        <main className="tertiary-section">
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
                            <img src={URL.createObjectURL(profilePicture)} className="avatar" alt="Avatar" />
                        ) : (
                            <img src={account.profile_picture} className="avatar" alt="Avatar" />
                        )}
                        <IoPencilOutline className="icon-pfp" onClick={handleProfilePictureClick} />
                    </div>
                </div>
                <div className="username-container">
                    {editField === 'name' ? (
                        <input
                            className='username-input'
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    ) : (
                        <span className="username">{name}</span>
                    )}
                    {editField !== 'name' && (
                        <IoPencilOutline
                            className="icon-hover"
                            onClick={() => handleEdit('name')}
                        />
                    )}
                    {editField === 'name' && (
                        <IoCheckmarkDoneOutline
                            className="icon-hover"
                            onClick={handleSave}
                        />
                    )}
                </div>
                <div className="email-container">
                    <VscMail className="email-icon" />
                    <span className="email">{account.email}</span>
                </div>
                <div className="password-container">
                    <div className="name">
                        <VscLock className="pass-icon" />
                        <span className="password" onClick={() => setNewPass(!newPass)}>Change password</span>
                    </div>

                    {newPass ?
                        (
                            <div className={newPass ? "new-pass" : "new-pass hidden"}>
                                <input type="password" className="password-input" placeholder="old password" />
                                <input type="password" className="password-input" placeholder="new password" />
                                <input type="password" className="password-input" placeholder="confirm password" />
                            </div>

                        ) :
                        (
                            null
                        )
                    }

                    {/* {editField === 'password' ? (
                            <input className='password-input' type={visible ? 'text' : 'password'} placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        ) : (
                            <span className="password">Change password</span>
                        )} */}
                    {/* <div onClick={() => setVisible(!visible)}>
                            {visible ? <FaRegEye className="eye-icon" /> : <FaRegEyeSlash className="eye-icon" />}
                        </div> */}
                    {/* <button className='icon' onClick={() => editField === 'password' ? handleSave() : handleEdit('password')}>
                            {editField === 'password' ? (
                                <IoCheckmarkDoneOutline className="pencil-icon" onClick={handleSave} />
                            ) : (
                                <IoPencilOutline className="pencil-icon" />
                            )}
                        </button> */}

                </div>
                <div className="btn-container">
                    <button className="btn" onClick={(e) => handleSubmit(e)}>Save changes</button>
                </div>
            </div>
        </main>
    );
}

export default MyProfile;
