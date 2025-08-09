import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const ReceptionistRoutes = () => {
  const token = Cookies.get("token")
  const Receptionist = Cookies.get("Receptionist")
  if(token && Receptionist){
    return <Outlet />
  }else{
    return <Navigate to="/" />
  }
  //return token ? <Outlet /> : <Navigate to="/" />
};

export default ReceptionistRoutes
