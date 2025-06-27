import Home from "./Home"
import { Routes, Route } from "react-router-dom"
import Login from "./routes/Login"
import SignIn from "./routes/SignIn"

function App() {


  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
       <Route path="/sigin" element={<SignIn/>} />
    </Routes>
    </>
  )
}

export default App
