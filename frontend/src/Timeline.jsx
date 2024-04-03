import React, { Fragment, useContext, useEffect, useState } from "react";
import TimeLineMark from "./components/TimeLineMark";
import EventCard from "./components/EventCard";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "./context/DataContext";


const Timeline = () => {
    const { handleAlert } = useContext(DataContext)

    const id = useParams().id

    const [events, setEvents] = useState([])

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




    const handleDateFormat = (date) => {
        const day = date.slice(8, 10)
        const month = date.slice(5, 7)
        const year = date.slice(0, 4)

        return `${day}-${month}-${year}`
    }



    // const events = [
    //     {
    //         "Heading": "Battle of Hastings",
    //         "subheading": "A pivotal event in English history that resulted in the Norman conquest of England.",
    //         "direction": "left"
    //     },
    //     {
    //         "Heading": "Signing of the Declaration of Independence",
    //         "subheading": "The founding document of the United States, declaring independence from the Kingdom of Great Britain.",
    //         "direction": "right"
    //     },
    //     {
    //         "Heading": "French Revolution",
    //         "subheading": "A period of radical social and political upheaval in France that had a lasting impact on the country and the world.",
    //         "direction": "left"
    //     },
    //     {
    //         "Heading": "Fall of the Berlin Wall",
    //         "subheading": "The symbolic end of the Cold War and the reunification of East and West Germany.",
    //         "direction": "right"
    //     },
    //     {
    //         "Heading": "The Renaissance",
    //         "subheading": "A period of great cultural and artistic change in Europe.",
    //         "direction": "left"
    //     },
    //     {
    //         "Heading": "Invention of the Printing Press",
    //         "subheading": "A technological advancement that revolutionized the spread of information and knowledge.",
    //         "direction": "right"
    //     },
    //     {
    //         "Heading": "The Industrial Revolution",
    //         "subheading": "A period of major industrialization and economic development that transformed society.",
    //         "direction": "left"
    //     },
    //     {
    //         "Heading": "Moon Landing",
    //         "subheading": "The first human landing on the moon as part of the Apollo 11 mission.",
    //         "direction": "right"
    //     },
    //     {
    //         "Heading": "World War II",
    //         "subheading": "A global conflict that lasted from 1939 to 1945, resulting in significant geopolitical changes.",
    //         "direction": "left"
    //     },
    //     {
    //         "Heading": "Civil Rights Movement",
    //         "subheading": "A social movement in the United States that aimed to end racial segregation and discrimination.",
    //         "direction": "right"
    //     }
    // ];

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

            if(response.status == 200) {
                handleAlert('success', 'Event added successfully.')
            }
        } catch(err) {
            console.log(err)
        } finally {

        }
    }



    return (
        <main className="section-main">
            <div className="timeline">
                <div className="grid">
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

                    <TimeLineMark name="pillar" />

                    {
                        circleBtn ?
                        <div className="circle-container " onMouseEnter={() => setCircleBtn(true)} onMouseLeave={() => setCircleBtn(false)}>
                                <button className="circle">Add event</button>
                        </div>
                        :
                        <div className="circle-container" onMouseEnter={() => setCircleBtn(true)} onMouseLeave={() => setCircleBtn(false)}>
                                <button className="circle">Add event</button>
                        </div>
                    }
                </div>
            </div>
            {/* <div><button className="rounded-btn">+</button></div> */}
            
            <form onSubmit={(e) => handleAdd(e)}>
                <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
                <input
                    type="text"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="description"
                />
                <button type="submit" className="btn">Add Event</button>
            </form>

        </main>

    );

}

export default Timeline;
