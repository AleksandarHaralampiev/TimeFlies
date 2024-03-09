import { useContext, useEffect, useState } from "react"
import { IoCheckmarkCircle, IoCloseCircle, IoCloseOutline, IoInformationCircle, IoInformationCircleOutline } from "react-icons/io5"
import { DataContext } from "./context/DataContext"

const Toast = () => {
    const { alerts } = useContext(DataContext)

    return (
        alerts.length ?
        <div className="toast-container">
            {
                alerts.map(alert => (
                    <ToastAlert
                        key={alert.id}
                        id={alert.id}
                        type={alert.type}
                        message={alert.message}
                    />
                ))
            }
        </div>
        :
        null

    )
}

const ToastAlert = ({ id = 0, type, message = 'Alert', autoClose = true, closeTime = 5000 }) => {
    const { alerts, setAlerts } = useContext(DataContext)

    // const closeAlert = () => {
    //     const toast = document.getElementById(`toast-${id}`)
    //     console.log(toast)
    //     // toast.classList.add('toast-closed')

    //     setTimeout(() => {
    //         setAlerts(alerts.filter(alert => alert.id !== id))
    //     }, 500)
    // }


    // // const [time, setTime] = useState(closeTime)
    // // const [percent, setPercent] = useState(100)
    
    // // useEffect(() => {
    // //     if(autoClose) {
    // //         setTimeout(() => {

    // //             if(time > 0) {
    // //                 setPercent((time / closeTime) * 100)
    // //                 setTime(time - 10)
    // //             }

    // //         }, 10)
    // //     }
    // // }, [time])

    // useEffect(() => {
    //     if(autoClose) {
    //         setTimeout(() => {
    //             closeAlert()
    //         }, closeTime)
    //     }
    // }, [])

    return (
        <div className={"toast-alert"} id={`toast-${id}`}>
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

                <p className="toast-text">{id} {message}</p>

                {
                    autoClose ?
                    <div
                        className="toast-timer"
                        // style={{ width: `${(time / closeTime) * 100}%` }}
                    >
                    </div>
                    :
                    null
                }
            </div>


            <IoCloseOutline className="toast-close"/>
        </div>
    )
}

export default Toast