import avatar from "./img/pfp.jpg";
import { IoPencilOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

// <IoCheckmarkDoneOutline />
// <IoCreateOutline />

const MyProfile = () => {
    return (
        <main className="section-main">
            <div className="profile-container">
                <div className="avatar-container">
                    <img src={avatar} className="avatar" />
                </div>
                <div className="username-container">
                    <h3 className="username">Username</h3>
                </div>
                <div className="email-container">
                    <h3 className="email">email: example@email.com</h3>
                </div>
                <div className="password-container">
                    <h3 className="password">password: *******</h3>
                    <div className="icon">
                        <IoPencilOutline className="pencil-icon" />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MyProfile