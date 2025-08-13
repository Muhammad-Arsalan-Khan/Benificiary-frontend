import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import UserEditModal from "../../../model/admin/UserEditModal"
import config from "../../../config.js"
import swal from "sweetalert2"

const Users = () => {
  const [verifiedUsers, setVerifiedUsers] = useState([])
  const [nonVerifiedUsers, setNonVerifiedUsers] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const fetchVerifiedUsers = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/getverifieduser`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setVerifiedUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching verified users', error)
    }
  }

  const fetchNonVerifiedUsers = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/admin/getnonverifieduser`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      setNonVerifiedUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching non-verified users', error)
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user)
    setOpenModal(true)
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.baseURL}/admin/deleteuser/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      fetchVerifiedUsers()
      fetchNonVerifiedUsers()
      Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User deleted",
              showConfirmButton: false,
              timer: 1500,
            })
    } catch (error) {
      console.error('Error deleting user', error)
    }
  }

  useEffect(() => {
    fetchVerifiedUsers()
    fetchNonVerifiedUsers()
  }, []);

  return (
    <div>
      <h1>Verified User</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>CNIC</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verifiedUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.cnic}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>{user.isVerified ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                  <Button onClick={() => handleDelete(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h1 style={{ marginTop: '30px' }} >NonVerified User</h1>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>CNIC</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nonVerifiedUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.cnic}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>{user.isVerified ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                  <Button onClick={() => handleDelete(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <UserEditModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          user={selectedUser}
          fetchVerifiedUsers={fetchVerifiedUsers}
          fetchNonVerifiedUsers={fetchNonVerifiedUsers}
        />
      )}
    </div>
  )
}

export default Users
