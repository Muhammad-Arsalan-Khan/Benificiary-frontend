import  { useState } from 'react'
import Sidebar from './Sidebar'

import Dashboard from '../../pages/admin/page/Dashboard'
import CreateUser from '../../pages/admin/page/CreateUser'
import Users from '../../pages/admin/page/Users'
import Progress from '../../pages/admin/page/Progress'
import Pending from '../../pages/admin/page/Pending'
import Reject from '../../pages/admin/page/Reject'
import Complete from '../../pages/admin/page/Complete'
import { Box, Toolbar } from '@mui/material';

const AdminContent = () => {
  const [page, setPage] = useState('Dashboard')

  const renderPage = () => {
    switch (page) {
      case 'Dashboard':
        return <Dashboard />
      case 'CreateUser':
        return <CreateUser />
      case 'Users':
        return <Users />
      case 'Progress':
        return <Progress />
      case 'Pending':
        return <Pending />
      case 'Reject':
        return <Reject />
      case 'Complete':
        return <Complete />
      default:
        return <Dashboard />
    }
  };

  return (
    <>
     <Box sx={{ display: 'flex' }}>
      <Sidebar setPage={setPage} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderPage()}
      </Box>
    </Box>
    </>
  )
}

export default AdminContent

