import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext({})

const DataProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)

    const navigate = useNavigate()

    return (
        <DataContext.Provider value={{
            loggedIn, navigate
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider