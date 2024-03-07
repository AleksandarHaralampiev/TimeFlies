import { useContext, useEffect } from "react"
import { DataContext } from "./context/DataContext"

const Dashboard = () => {
    const { loggedIn, navigate } = useContext(DataContext)

    useEffect(() => {
        if(!loggedIn) navigate('/login')
    }, [])
    
    return (
        <section>
            Dashboard
        </section>
    )
}

export default Dashboard