import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import DataProvider from "./context/DataContext"
import Nav from "./Nav"
import Dashboard from "./Dashboard"

function App() {

  return (
    <>
      <DataProvider>
        <Nav/>

        <Routes>
          <Route path="/" element={<Home/>}/>

          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </DataProvider>
    </>
  )
}

export default App
