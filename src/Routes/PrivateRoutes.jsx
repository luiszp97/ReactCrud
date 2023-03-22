import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../Pages/HomePage"

export const PrivateRoutes = () => {
  return (
    <Routes>

      <Route path="/home" element ={<HomePage/>} />

      <Route path="/*" element={<Navigate to="/home"/>}/>
      
    </Routes>
  )
}
