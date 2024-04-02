import { useContext, useState } from 'react'
import compass from './img/hourglass1.png'
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


const data = [
    {
        'heading': 'About Us: TimeFlies',
        'text': "At TimeFlies, we believe in the power of storytelling and preserving memories. Our platform offers users the opportunity to create personalized timelines, weaving together their life's moments into a beautiful narrative. Whether it's documenting personal milestones, historical events, or cherished memories, TimeFlies provides the canvas for your stories to unfold."
    },
    {
        "heading": "Our Mission",
        "text": "Our mission is to empower individuals to curate and share their life's journey in a visually compelling and interactive way. We understand the significance of preserving memories and aim to provide a user-friendly platform where users can effortlessly create timelines that reflect their unique experiences."
    },
    {
        "heading": "What We Offer",
        "text": "Customizable Timelines: Our intuitive timeline creator allows users to customize every aspect of their timeline, from choosing the layout and design to adding text, images, videos, and more. Privacy and Sharing: Users have full control over the privacy settings of their timelines. Whether you want to keep your timeline private, share it with select individuals, or make it public, the choice is yours. Collaboration: Collaborate with friends, family, or colleagues to create collective timelines that capture shared experiences and memories. Memory Preservation: TimeFlies serves as a digital archive for your memories, ensuring that your stories are preserved for future generations to cherish and enjoy."
    }
];
import { DataContext } from './context/DataContext'
import axios from 'axios';


const Home = () => {
    const { handleAlert } = useContext(DataContext)



    // CONTACT US
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleContact = async (e) => {
        e.preventDefault()

        try {
            const obj = {
                name,
                email,
                message
            }

            const response = await axios.post('http://127.0.0.1:8000/contact/sendEmail/', obj)

            console.log(response)

            if(response.status == 200) {
                handleAlert('success', 'Email sent successfully!')

                setEmail('')
                setMessage('')
                setName('')
            }
        } catch(err) {
            console.log(err)
            handleAlert('error', "Couldn't send email.")
        }
    }

    return (
        <>
            <section id='home' className="section-main">
                <div className="container main-container">
                    <div className="main-textbox">
                        <h1 className="heading-primary">Write your own history</h1>
                        <p className="main-text">Collect and share your stories with people all over the world. Create your own exciting timeline and collaborate with your friends and family.</p>

                        <Link to='/register' className="btn">Start now</Link>
                    </div>
                    {/* <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <button className="btn" onClick={() => handleAlert('success', 'testing the alerts')}>Alert</button> */}

                    <div className="main-imgbox">
                        <img src={compass} className='main-img' />
                    </div>
                </div>
            </section>
            <section id='about-us' className='secondary-section'>

                <VerticalTimeline>
                    {data.map((e, i) => {
                        return (
                            <VerticalTimelineElement

                                contentStyle={{ background: '#f0f0f0', color: '#625149', height: '100%', padding: '1rem', fontSize: '4rem' }}
                                contentArrowStyle={{ borderRight: '7px solid  #f0f0f0' }}
                                iconStyle={{ background: '#f2e4cb', color: '#625149', height: '3rem', width: '3rem', margin: '0 0 0 -15px' }}

                            >
                                <h3 className="vertical-timeline-element-title">{e.heading}</h3>
                                <p style={{ fontSize: '2rem' }}>
                                    {e.text}
                                </p>
                            </VerticalTimelineElement>
                        )
                    })}

                </VerticalTimeline>

            </section >
            <section id='contact-us' className='tertiary-section'>
                <div className="contact-us-container">
                    <h1 className='heading-secondary'>Contact Us</h1>
                    <form className="contact-form" onSubmit={(e) => handleContact(e)}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={message}
                            required
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>

                        <button type="submit" className='btn'>Submit</button>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Home