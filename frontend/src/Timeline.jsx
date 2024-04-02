import React, { Fragment, useContext, useEffect, useState, useRef } from "react";
import TimeLineMark from "./components/TimeLineMark";
import EventCard from "./components/EventCard";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "./context/DataContext";


const Timeline = () => {
    const { handleAlert } = useContext(DataContext)
    const [cardHeight, setCardHeight] = useState(null);
    const cardRef = useRef(null);



    const id = useParams().id

    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetching = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/timeline/event/?id=${id}`)

                console.log(response)

                if (response.status == 200) {
                    setEvents(response.data)
                }
            } catch (err) {
                console.log(err)
            }
        }

        fetching()
    }, [id])


    useEffect(() => {
        if (cardRef.current) {
            const height = cardRef.current.offsetHeight;
            setCardHeight(height);
        }
    }, [events]);


    // ADD EVENT
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [day, setDay] = useState('01')
    const [month, setMonth] = useState('01')
    const [year, setYear] = useState('2024')

    const handleAdd = async (e) => {
        e.preventDefault()

        try {
            const obj = {
                title,
                description,
                timeline_id: id,
                date: `${day}.${month}.${year}`
            }

            console.log(obj)

            const response = await axios.post('http://127.0.0.1:8000/timeline/addEvent/', obj)

            console.log(response)

            if (response.status == 200) {
                handleAlert('success', 'Event added successfully.')
            }
        } catch (err) {
            console.log(err)
        } finally {

        }
    }



    return (
        <>
            <main className="section-main">
                <div className="timeline">
                    {events.map((event, key) => (
                        <Fragment key={key}>
                            <div className="grid">
                                {key % 2 == 0 ? (
                                    <div className="card-container-left"><EventCard heading={event.title} subHeading={event.description} /></div>
                                ) : (
                                    <div className="circle-container">
                                        <TimeLineMark name='circle' />
                                    </div>
                                )
                                }


                                {key % 2 != 0 ? (
                                    <div className="card-container-right"><EventCard heading={event.title} subHeading={event.description} /></div>
                                ) : (
                                    <div className="circle-container">
                                        <TimeLineMark name='circle' />
                                    </div>
                                )
                                }


                            </div>
                            {key < (events.length - 1) && <TimeLineMark name="pillar" /*height={cardHeight ? cardHeight * 0.5 + 80 : null} */ />}
                        </Fragment>
                    ))}
                </div>
                {/* <div><button className="rounded-btn">+</button></div> */}
            </main>

            <section className="tertiary-section-timeline">
                <h1 className="heading-secondary">New event</h1>
                <form className="contact-form" onSubmit={(e) => handleAdd(e)}>
                    <label htmlFor="name">Title:</label>
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="date">
                        <label htmlFor="date">Date:</label>
                        <div className="date-inputs">
                            <select

                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                            >
                                {Array.from({ length: 31 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                                ))}

                            </select>
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            >
                                {Array.from({ length: 12 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </div>

                    </div>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="description"
                    />
                    <button type="submit" className="btn">Add Event</button>
                </form>
            </section>


        </>
    );

}

export default Timeline;
