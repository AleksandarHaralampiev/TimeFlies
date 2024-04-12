const DotSpinner = () => {
    return (
        <div className="dot-spinner">
            {
                Array.from({ length: 8 }, _ => null).map(_ => (
                    <div class="dot-spinner__dot"></div>
                ))
            }
        </div>
    )
}

export default DotSpinner