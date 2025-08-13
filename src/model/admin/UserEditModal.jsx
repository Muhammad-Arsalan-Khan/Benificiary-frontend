import { useState } from 'react'
import axios from 'axios'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Cookies from 'js-cookie'
import config from "../../config.js"

const UserEditModal = ({ open, onClose, user, fetchVerifiedUsers, fetchNonVerifiedUsers }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    cnic: user.cnic,
    type: user.type,
    verification: user.isVerified,
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

   const { email, cnic, ...restOfFormData } = formData
    const dataToSend = {
      ...(formData.email !== user.email ? { email: formData.email } : {}),
      ...(formData.cnic !== user.cnic ? { cnic: formData.cnic } : {}),
      ...restOfFormData,
    };
  const handleSubmit = async () => {
    try {
     const res =  await axios.put(
        `${config.baseURL}/admin/updateuser/${user._id}`,
        {
          ...dataToSend,
          password: formData.password || user.password, 
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )
      fetchVerifiedUsers()
      fetchNonVerifiedUsers()
      onClose()
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="CNIC"
          name="cnic"
          value={formData.cnic}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            label="Type"
          >
            <MenuItem value="Receptionist">Receptionist</MenuItem>
            <MenuItem value="Deparment">Department</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Verification</InputLabel>
          <Select
            name="isVerified"
            value={formData.verification}
            onChange={handleChange}
            label="Verification"
          >
            <MenuItem value={true} >true</MenuItem>
            <MenuItem value={false}>false</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserEditModal
