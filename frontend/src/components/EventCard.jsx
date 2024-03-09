const EventCard = ({ heading, subHeading }) => {
    return (
        <div className="card">
            <div className="heading">{heading}</div>
            <div className="sub-heading">{subHeading}</div>
        </div>
    )
}

export default EventCard;
