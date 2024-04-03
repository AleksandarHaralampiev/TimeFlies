const EventCard = ({ heading, subHeading, date }) => {
    return (
        <div className="card">
            <div className="heading">{heading}</div>
            <p className="sub-heading">{subHeading}</p>
            <div className="date">{date}</div>
        </div>
    )
}

export default EventCard;
