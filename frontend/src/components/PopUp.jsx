import { IoCloseOutline } from 'react-icons/io5'
import '../css/popup.css'
import { useState } from 'react'

const PopUp = ({ children, closeFunc }) => {
    const [closed, setClosed] = useState(false)

    const handleClose = () => {
        setClosed(true)

        setTimeout(() => {
            closeFunc()
        }, 400)
    }

    return (
        <div className='pop-up'>
            <div className={closed ? "pop-up-container pop-up-closed" : "pop-up-container"}>
                
                {children}

                <IoCloseOutline className="pop-up-close" onClick={handleClose} />
                
            </div>
        </div>
    )
}

export default PopUp