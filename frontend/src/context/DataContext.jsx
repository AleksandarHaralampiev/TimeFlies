import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext({})

const DataProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('loggedIn')) || false)
    const navigate = useNavigate()


    // FETCHING ACCOUNT INFO
    const [account, setAccount] = useState({})

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/authenticate/info/?Content-Type=application-json&id=${JSON.parse(localStorage.getItem('accData')).id}`)

                if(response.status == 200) {
                    console.log(response)
                    setAccount(response.data.data)
                }
            } catch(err) {
                console.log(err)
            }
        }

        if(loggedIn) fetchAccount()
    }, [loggedIn])



    // SETTING UP ALERTS

    const [alerts, setAlerts] = useState([])

    const handleAlert = (type, message, autoClose, closeTime) => {
        const id = alerts.length ? alerts[alerts.length - 1].id + 1 : 1

        const newAlert = {
            id,
            type,
            message,
            autoClose,
            closeTime
        }

        setAlerts([...alerts, newAlert])
    }





    //FETCHING PUBLIC TIMELINES

    const [publicTimelines, setPublicTimelines] = useState([])
    const [dashboardLoading, setDashboardLoading] = useState(false)
    const [dashboardError, setDashboardError] = useState('')

    useEffect(() => {
        const fetchPublicTimelines = async () => {
            setDashboardLoading(true)

            try {
                const response = await axios.get(`http://127.0.0.1:8000/server/public/`)

                console.log(response)
            
                setPublicTimelines(response.data.servers)

                setDashboardError('')
            } catch(err) {
                console.log(err)
                setDashboardError('Something went wrong! If the issue persists, consider reporting it to the devs.')
            } finally {
                setDashboardLoading(false)
            }
        }

        if(loggedIn) fetchPublicTimelines()
    }, [loggedIn])







    // FETCHING MY TIMELINES

    const [myTimelines, setMyTimelines] = useState([])
    const [myLoading, setMyLoading] = useState(false)
    const [myError, setMyError] = useState('')


    const fetchMyTimelines = async () => {
        setMyLoading(true)

        try {
            const response = await axios.get(`http://127.0.0.1:8000/server/list/?Content-Type=application-json&id=${JSON.parse(localStorage.getItem('accData')).id}`)

            setMyTimelines(response.data.servers)

            setMyError('')
        } catch(err) {
            console.log(err)
            setMyError('Something went wrong! If the issue persists, consider reporting it to the devs.')
        } finally {
            setMyLoading(false)
        }
    }


    useEffect(() => {
        if(loggedIn) fetchMyTimelines()
    }, [loggedIn])





    return (
        <DataContext.Provider value={{
            loggedIn, setLoggedIn, navigate, alerts, setAlerts, handleAlert,            //GENERAL 
            publicTimelines, dashboardLoading, dashboardError,                          //DASHBOARD
            myTimelines, myLoading, myError, fetchMyTimelines,                          //MY TIMELINES
            account
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider