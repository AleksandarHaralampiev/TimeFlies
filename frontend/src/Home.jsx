import compass from './img/compass.png'

const Home = () => {
    return (
        <main className="section-main">
            <div className="container main-container">
                <div className="main-textbox">
                    <h1 className="heading-primary">Write your own history</h1>
                    <p className="main-text">Collect and share your stories with people all over the world. Create your own exciting timeline and collaborate with your friends and family.</p>

                    <button className="btn">Start now</button>
                </div>

                <div className="main-imgbox">
                    <img src={compass} className='main-img'/>
                </div>
            </div>
        </main>
    )
}

export default Home