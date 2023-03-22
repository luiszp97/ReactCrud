import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../Pages"

export const PublicRoutes = () => {
  return (

    <Routes>
      <Route path="login" element = { <LoginPage/> } />
      <Route path="register" element = { <RegisterPage/> } />

      <Route path="*" element={<Navigate to="login"/>}/>
    </Routes>
    
  )
}
