import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

const AdminRoute = () => {
  const token = Cookies.get('token')
  const isVerified = Cookies.get('isVerified')
  if(token && isVerified){
    return <Outlet />
  }else{
    return <Navigate to="/" />
  }
  // return !token ? <Navigate to="/" /> : !isVerified  ? <Navigate to="/dashboard" /> : <Outlet />
};

export default AdminRoute
