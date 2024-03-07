import React, { Fragment } from "react";



const Timeline = () => {
    const events = [
        {
            "Heading": "Battle of Hastings",
            "subheading": "A pivotal event in English history that resulted in the Norman conquest of England.",
            "direction": "left"
        },
        {
            "Heading": "Signing of the Declaration of Independence",
            "subheading": "The founding document of the United States, declaring independence from the Kingdom of Great Britain.",
            "direction": "right"
        },
        {
            "Heading": "French Revolution",
            "subheading": "A period of radical social and political upheaval in France that had a lasting impact on the country and the world.",
            "direction": "left"
        },
        {
            "Heading": "Fall of the Berlin Wall",
            "subheading": "The symbolic end of the Cold War and the reunification of East and West Germany.",
            "direction": "right"
        },
        {
            "Heading": "The Renaissance",
            "subheading": "A period of great cultural and artistic change in Europe.",
            "direction": "left"
        },
        {
            "Heading": "Invention of the Printing Press",
            "subheading": "A technological advancement that revolutionized the spread of information and knowledge.",
            "direction": "right"
        },
        {
            "Heading": "The Industrial Revolution",
            "subheading": "A period of major industrialization and economic development that transformed society.",
            "direction": "left"
        },
        {
            "Heading": "Moon Landing",
            "subheading": "The first human landing on the moon as part of the Apollo 11 mission.",
            "direction": "right"
        },
        {
            "Heading": "World War II",
            "subheading": "A global conflict that lasted from 1939 to 1945, resulting in significant geopolitical changes.",
            "direction": "left"
        },
        {
            "Heading": "Civil Rights Movement",
            "subheading": "A social movement in the United States that aimed to end racial segregation and discrimination.",
            "direction": "right"
        }
    ];
    return (
        <main className="section-main">
            <div className="timeline">
                {events.map((event, key) => (
                    <Fragment key={key}>
                        <div className="grid">
                            {event.direction === 'left' ? (
                                <EventCard heading={event.Heading} subHeading={event.subheading} />
                            ) : (
                                <div></div>
                            )
                            }

                            <Pillar />

                            {event.direction === 'right' ? (
                                <EventCard heading={event.Heading} subHeading={event.subheading} />
                            ) : (
                                <div></div>
                            )
                            }
                        </div>
                        {key < (events.length - 1) && <Circle />}
                    </Fragment>
                ))}
            </div>
        </main>

    );
}

const Circle = () => {
    return (
        <div className="circle">

        </div>
    );
}

const Pillar = () => {
    return (
        <div className="pillar">

        </div>
    );
}

const EventCard = ({ heading, subHeading }) => {
    return (
        <div className="card">
            <div className="heading">{heading}</div>
            <div className="sub-heading">{subHeading}</div>
        </div>
    )
}

export default Timeline;
