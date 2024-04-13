import { memo, useContext, useEffect, useState } from "react"
import { IoCheckmarkCircle, IoCloseCircle, IoCloseOutline, IoInformationCircle, IoInformationCircleOutline } from "react-icons/io5"
import { DataContext } from "./context/DataContext"


const Toast = ({ id = 1, type, message = 'Alert', autoClose = true, closeTime = 5000 }) => {
    const [closed, setClosed] = useState(0)

    const closeAlert = () => {
        setClosed(id)
        console.log(`Closed alert ${id}`)
    }

    useEffect(() => {
        if(autoClose) {
            setTimeout(() => {
                closeAlert()
            }, closeTime)
        }
    }, [])

    return (
        <div className={closed === id ? "toast-alert toast-closed" : "toast-alert"}>
            <div className="toast-text-box">
                {
                    type === 'success' ?
                    <IoCheckmarkCircle className="toast-icon" />
                    :
                    type === 'error' ?
                    <IoCloseCircle className="toast-icon" />
                    :
                    <IoInformationCircle className="toast-icon" />
                }

                <p className="toast-text">{message}</p>

                {
                    autoClose ?
                    <div
                        className="toast-timer"
                        style={{ animation: `toast-timer ${closeTime / 1000}s linear 1 forwards` }}
                    >
                    </div>
                    :
                    null
                }
            </div>


            <IoCloseOutline className="toast-close" onClick={closeAlert}/>
        </div>
    )
}

export default Toast