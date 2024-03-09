import { useContext } from 'react'
import compass from './img/hourglass1.png'
import { Link } from 'react-router-dom'
import { DataContext } from './context/DataContext'

const Home = () => {
    const { handleAlert } = useContext(DataContext)

    return (
        <section className="section-main">
            <div className="container main-container">
                <div className="main-textbox">
                    <h1 className="heading-primary">Write your own history</h1>
                    <p className="main-text">Collect and share your stories with people all over the world. Create your own exciting timeline and collaborate with your friends and family.</p>

                    <Link to='/register' className="btn">Start now</Link>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <button className="btn" onClick={() => handleAlert('success', 'testing the alerts')}>Alert</button>
                </div>

                <div className="main-imgbox">
                    <img src={compass} className='main-img' />
                </div>
            </div>
        </section>
    )
}

export default Home