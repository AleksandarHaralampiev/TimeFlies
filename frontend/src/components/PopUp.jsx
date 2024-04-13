import '../css/popup.css'
import ReactModal from 'react-modal'

const PopUp = ({ children, shown, closeFunc, className }) => {

    return (
        <ReactModal
            isOpen={shown}
            onRequestClose={closeFunc}
            closeTimeoutMS={490}
            preventScroll={true}
            overlayClassName="pop-up"
            className={{
                base: `pop-up-container ${className}`,
                beforeClose: "pop-up-closed"
            }}
        >

            {children}

        </ReactModal>
    )
}

export default PopUp