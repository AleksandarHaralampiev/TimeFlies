import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"
import Register from "./Register"
import DataProvider from "./context/DataContext"
import Timeline from "./Timeline"

function App() {

  return (
    <>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </DataProvider>
    </>
  )
}

export default App
