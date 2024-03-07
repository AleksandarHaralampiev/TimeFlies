import { createContext, useState } from "react";

export const DataContext = createContext({})

const DataProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(true)
    
    return (
        <DataContext.Provider value={{
            loggedIn
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider