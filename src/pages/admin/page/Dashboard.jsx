import axios from "axios"
import { useEffect, useState } from "react"
import { Box, Card, CardContent, Typography } from "@mui/material"
import config from "../../../config.js"
import Cookies from "js-cookie"

const statuses = ["In Progress", "Pending", "Completed", "Rejected"]

const Dashboard = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${config.baseURL}/admin/getallbeneficiary`,{
         headers:{
          Authorization: `Bearer ${Cookies.get("token")} `,
        }
      })
      setData(res.data.data)
    } catch (err) {
      console.error("Failed to fetch dashboard data", err)
    }
  };

  const getStatusCount = (status) =>
    data.filter((item) => item.status === status).length

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Dashboard
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {statuses.map((status) => (
          <Card key={status} sx={{ minWidth: 200, flex: "1 1 200px", backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                {status}
              </Typography>
              <Typography variant="h3">{getStatusCount(status)}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard
