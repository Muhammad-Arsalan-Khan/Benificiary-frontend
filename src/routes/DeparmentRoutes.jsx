import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const DeparmentRoutes = () => {
  const token = Cookies.get("token")
  const Deparment = Cookies.get("Deparment")
  if(token && Deparment){
    return <Outlet />
  }else{
    return <Navigate to="/" />
  }
  //return token ? <Outlet /> : <Navigate to="/" />
};

export default DeparmentRoutes
