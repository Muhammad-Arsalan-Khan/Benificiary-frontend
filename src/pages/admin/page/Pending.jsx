import { useEffect, useState } from 'react';
import axios from 'axios'
import { Box, Card, CardContent, Typography, Button } from '@mui/material'
import BeneficiaryDetailModal from '../../../model/admin/BeneficiaryDetailModal'
import config from "../../../config.js"
import Cookies from "js-cookie"

const Pending = () => {
  const [data, setData] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const res = axios.get(`${config.baseURL}/admin/getbeneficiarypendding`,{
     headers: {
                 Authorization: `Bearer ${Cookies.get("token")} `,
               }
    })
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err))
  }, []);

  return (
    <Box>
      {data.map((item) => (
        <Card key={item._id} sx={{ mb: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">Name: {item.name}</Typography>
            <Typography>CNIC: {item.cnic}</Typography>
            <Typography>Phone: {item.phone}</Typography>
            <Typography>Status: {item.status}</Typography>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => setSelectedItem(item)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}

      {selectedItem && (
        <BeneficiaryDetailModal
          open={Boolean(selectedItem)}
          handleClose={() => setSelectedItem(null)}
          data={selectedItem}
        />
      )}
    </Box>
  )
}

export default Pending
