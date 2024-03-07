import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext({})

const DataProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem('loggedIn')) || false)

    const navigate = useNavigate()

    return (
        <DataContext.Provider value={{
            loggedIn, setLoggedIn, navigate
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider