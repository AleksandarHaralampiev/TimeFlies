import React, { Fragment, useContext, useEffect, useState, useRef } from "react";
import TimeLineMark from "./components/TimeLineMark";
import EventCard from "./components/EventCard";
import { useParams, useSearchParams } from "react-router-dom";
import { HashLink } from 'react-router-hash-link'
import axios from "axios";
import { DataContext } from "./context/DataContext";


const Timeline = () => {
    const { handleAlert, myTimelines, publicTimelines } = useContext(DataContext)
    const [cardHeight, setCardHeight] = useState(null);
    const cardRef = useRef(null);

    const id = useParams().id

    const [events, setEvents] = useState([])
    const [timeline, setTimeline] = useState(null)

    const [circleBtn, setCircleBtn] = useState(false)

    useEffect(() => {
        const fetching = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/timeline/event/?id=${id}`)

                console.log(response)

                if (response.status == 200) {
                    const eventsArray = response.data.sort((a, b) => {
                        if (a.date_modified < b.date_modified) return -1;
                        if (a.date_modified > b.date_modified) return 1;
                        return 0;
                    })
                    setEvents(eventsArray)
                }
            } catch (err) {
                console.log(err)
            }
        }


        fetching()
    }, [id])

    useEffect(() => {
        if (publicTimelines.find(currentTimeline => currentTimeline.id == id)) setTimeline(publicTimelines.find(currentTimeline => currentTimeline.id == id))
        else if (myTimelines.find(currentTimeline => currentTimeline.id == id)) setTimeline(myTimelines.find(currentTimeline => currentTimeline.id == id))
    }, [publicTimelines, myTimelines, id])


    const handleDateFormat = (date) => {
        const day = date.slice(8, 10)
        const month = date.slice(5, 7)
        const year = date.slice(0, 4)

        return `${day}-${month}-${year}`
    }

    useEffect(() => {
        if (cardRef.current) {
            const height = cardRef.current.offsetHeight;
            setCardHeight(height);
        }
    }, [events]);

    useEffect(() => {
        if(timeline) console.log(timeline)
    }, [timeline])

    // ADD EVENT
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [day, setDay] = useState('01')
    const [month, setMonth] = useState('01')
    const [year, setYear] = useState('2024')
    const [images, setImages] = useState([])

    const fileInputRef = useRef(null)

    function handleFileSelect(event) {
        const imgs = Array.from(event.target.files);
        console.log(imgs)
        setImages(event.target.files)
    }

    const handleAdd = async (e) => {
        e.preventDefault()

        try {
            // const obj = new FormData();
            // obj.append('title', title)
            // obj.append('description', description)
            // obj.append('timeline_id', id)
            // obj.append('date', `${day}.${month}.${year}`)
            // obj.append('images', images)
            const obj = {
                title,
                description,
                timeline_id: id,
                date: `${day}.${month}.${year}`,
                images: images[0]
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
                    <div className="grid">
                        {timeline && <div className="timeline-title">{timeline.name}</div>
                        }

                        {events.map((event, key) => (
                            <Fragment key={key}>
                                {
                                    key % 2 == 0 &&
                                    <div className="card-container card-expanded card-container-left">
                                        <EventCard heading={event.title} subHeading={event.description} date={handleDateFormat(event.date_modified)} />
                                    </div>

                                }

                                <div className="circle-container">
                                    <TimeLineMark name='circle' />
                                </div>

                                {
                                    key % 2 != 0 &&
                                    <div className="card-container card-expanded card-container-right">
                                        <EventCard heading={event.title} subHeading={event.description} date={handleDateFormat(event.date_modified)} />
                                    </div>
                                }

                                {key < (events.length - 1) && <TimeLineMark name="pillar" />}
                            </Fragment>
                        ))}

                        {/* <TimeLineMark name="pillar" /> */}

                        {
                            // circleBtn ?
                            // <div className="circle-container " onMouseEnter={() => setCircleBtn(true)} onMouseLeave={() => setCircleBtn(false)}>
                            //         <button className="circle">Add event</button>
                            // </div>
                            // :
                            // <div className="circle-container" onMouseEnter={() => setCircleBtn(true)} onMouseLeave={() => setCircleBtn(false)}>
                            //         <button className="circle">Add event</button>
                            // </div>
                        }
                    </div>
                    <HashLink to={`/timeline/${id}/#add-form`} className="plus">+</HashLink>
                </div>
                {/* <div><button className="rounded-btn">+</button></div> */}


            </main>


            <section className="tertiary-section-timeline" id="add-form">
                <h1 className="heading-secondary">New event</h1>
                <form className="contact-form" onSubmit={(e) => handleAdd(e)}>
                    <label htmlFor="name">Title:</label>
                    <input
                        type="text"
                        placeholder="Title"
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
                                className="year"
                            />
                        </div>

                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        multiple
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <button type="submit" className="btn">Add Event</button>
                </form>
            </section>
        </>
    );

}

export default Timeline;
