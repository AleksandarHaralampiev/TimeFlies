const DotSpinner = () => {
    return (
        <div className="dot-spinner">
            {
                Array.from({ length: 8 }, _ => null).map((_, index) => (
                    <div class="dot-spinner__dot" key={index}></div>
                ))
            }
        </div>
    )
}

export default DotSpinner