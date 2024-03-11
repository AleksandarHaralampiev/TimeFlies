import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import DataProvider from "./context/DataContext"
import Timeline from "./Timeline"
import Nav from "./Nav"
import Dashboard from "./Dashboard"
import MyProfile from "./Myprofile"
import MyTimelines from "./MyTimelines"
import NewTimeline from "./NewTimeline"
import Toast from "./Toast"
import { SkeletonTheme } from "react-loading-skeleton"

function App() {

  return (
    <>
      <SkeletonTheme baseColor="#baa886" highlightColor="#ebd7b1">
        <DataProvider>
          <Nav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline/:id" element={<Timeline />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mytimelines" element={<MyTimelines />} />
            <Route path="/newtimeline" element={<NewTimeline />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myprofile" element={<MyProfile />} />
          </Routes>

          <Toast />
        </DataProvider>
      </SkeletonTheme>
    </>
  )
}

export default App
