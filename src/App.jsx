import { Navigate, Route, Routes } from "react-router-dom"
import { checkStatus } from "./helpers";
import { LoadingPage } from "./Pages";
import { PrivateRoutes, PublicRoutes } from "./Routes";



export const App = () => {

    const status = checkStatus();

     if(status  === "checking" ){
        return <LoadingPage/>
     }

  return (
    <Routes>

        {
            status === 'authenticated'
            ? <Route path= "/*" element = {<PrivateRoutes />} />
            : <Route path="/auth/*" element = {<PublicRoutes />} />
        }
        <Route path="/*" element ={<Navigate to='/auth/login'/>} />

    </Routes> 
   
  )
}