import { IoCloseOutline } from 'react-icons/io5'
import '../css/popup.css'
import { useState } from 'react'
import ReactModal from 'react-modal'

const PopUp = ({ children, shown, closeFunc }) => {
    const [closed, setClosed] = useState(false)

    const handleClose = () => {
        setClosed(true)

        setTimeout(() => {
            closeFunc()
        }, 400)
    }

    return (
        <ReactModal
            isOpen={shown}
            onRequestClose={closeFunc}
            closeTimeoutMS={500}
            overlayClassName="pop-up"
            className={{
                base: "pop-up-container",
                beforeClose: "pop-up-closed"
            }}
        >

            {children}

        </ReactModal>
    )
}

export default PopUp