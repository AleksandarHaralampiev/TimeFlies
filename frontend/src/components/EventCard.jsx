const EventCard = ({ event, date }) => {
    return (
        <div className="card">
            <div className="heading">{event.title}</div>
            <p className="sub-heading">{
                event.description.length < 100 ?
                event.description
                :
                `${event.description.slice(0, 100)}...`
            }</p>
            <div className="date">{date}</div>
            {
                // event.event_pictures.map((img, index) => (
                //     <img src={img} key={index}/>
                // ))
            }
            
        </div>
    )
}

export default EventCard;
