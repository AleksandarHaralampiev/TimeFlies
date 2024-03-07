import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import DataProvider from "./context/DataContext"
import Timeline from "./Timeline"
import Nav from "./Nav"
import Dashboard from "./Dashboard"
import MyProfile from "./Myprofile"

function App() {

  return (
    <>
      <DataProvider>
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </DataProvider>
    </>
  )
}

export default App
