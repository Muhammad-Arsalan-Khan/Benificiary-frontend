import { Routes, Route } from 'react-router-dom'
import AdminRoute from '../routes/AdminRoutes'
import AuthRoutes from '../routes/authRoutes'
import DeparmentRoutes from '../routes/DeparmentRoutes'
import ReceptionistRoutes from '../routes/ReceptionistRoutes'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import LandingPage from './LandingPage'
import DeparmentDashboard from './Deparment/DeparmentDashboard'
import ReceptionistDashboard from './Receptionist/ReceptionistDashboard'
import AdminDashboard from './admin/Dashboard'
import NotFound from "./NotFound"

function Home() {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route index element={<LandingPage />} />
  
         <Route element={<DeparmentRoutes />}>
          <Route path="/deparment/dashboard/:id" element={<DeparmentDashboard />} />
        </Route>

        <Route element={<ReceptionistRoutes />}>
          <Route path="/receptionist/dashboard/:id" element={<ReceptionistDashboard />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard/:id" element={<AdminDashboard/>} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<AuthRoutes />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>{/* </Route> */}
      </Routes>
    </>
  )
}

export default Home