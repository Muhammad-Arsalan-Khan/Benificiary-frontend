// import { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Snackbar,
//   Alert,
//   Modal,
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Grid,
// } from "@mui/material";
// import axios from "axios";
// import config from "../../config.js";
// import Cookies from "js-cookie";

// function ReceptionistContent() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [openModal, setOpenModal] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.post(
//         `${config.baseURL}/receptionist/getdata`,
//         { input: searchTerm },
//         {
//           headers: {
//             Authorization: `Bearer ${Cookies.get("token")} `,
//           },
//         }
//       );
//       setSearchResults(response.data);
//       setSnackbar({
//         open: true,
//         message: "Search successful!",
//         severity: "success",
//       });
//     } catch (error) {
//       console.log(error);
//       setSnackbar({
//         open: true,
//         message: "Error while searching!",
//         severity: "error",
//       });
//     }
//   };

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           mt: 4,
//         }}
//       >
//         <h1>Receptionist Content</h1>

//         <Box sx={{ display: "flex", mb: 2 }}>
//           <TextField
//             label="Search"
//             variant="outlined"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             sx={{ mr: 2 }}
//           />
//           <Button variant="contained" color="primary" onClick={handleSearch}>
//             Search
//           </Button>
//         </Box>

//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleOpenModal}
//           sx={{ mt: 4 }}
//         >
//           Create Beneficiary Request
//         </Button>

//         {searchResults.length > 0 && (
//           <Box>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Search Results:
//             </Typography>
//             <Grid container spacing={2}>
//               {searchResults.map((item) => (
//                 <Grid item xs={12} sm={6} md={4} key={item._id}>
//                   <Card sx={{ width:300}}>
//                     {/* <CardMedia
//                       component="img"
//                       height="140"
//                       image={item.qrCodeURL}
//                       alt="QR Code"
//                     /> */}
//                     <img
//                       src={item.qrCodeURL}
//                       alt="QR Code"
//                       style={{ width: 295, height: 295, objectFit: "contain" }}
//                     />
//                     <CardContent>
//                       <Typography variant="h6"><strong>Name:</strong>{item.name}</Typography>
//                       <Typography variant="body2" color="textSecondary">
//                         <strong>CNIC:</strong> {item.cnic}
//                       </Typography>
//                       <Typography variant="body2"><strong>Phone:</strong>{item.phone}</Typography>
//                       <Typography variant="body2"><strong>Address:</strong>{item.address}</Typography>
//                       <Typography variant="body2"><strong>Purpose:</strong>{item.purpose}</Typography>
//                       <Typography variant="body2" color="primary">
//                         <strong>Token:</strong>{item.token}
//                       </Typography>
//                       {item.status && (
//                         <Typography variant="body2" color="textSecondary">
//                           <strong>Status:</strong> {item.status}
//                         </Typography>
//                       )}
//                       {item.remarks && (
//                         <Typography variant="body2" color="textSecondary">
//                           <strong>Remarks:</strong>{item.remarks}
//                         </Typography>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         )}
//       </Box>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       <Modal open={openModal} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "white",
//             padding: 4,
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: "300px",
//             boxShadow: 24,
//             borderRadius: "8px",
//           }}
//         >
//           <Typography variant="h6">Hello</Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ mt: 2 }}
//             onClick={handleCloseModal}
//           >
//             Close
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// }

// export default ReceptionistContent;


import { useState } from "react";
import { Box, Button, TextField, Snackbar, Alert, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config.js";
// import CardItem from "../../components/Receptionist/CardItem.jsx";
import ViewDetailModal from "../../model/Receptionist/ViewDetailModal.jsx"
import HelloModal from "../../model/Receptionist/BeneficiaryRequestModel.jsx"

function ReceptionistContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openHelloModal, setOpenHelloModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ViewDetail , setViewDetail] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `${config.baseURL}/receptionist/getdata`,
        { input: searchTerm },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")} `,
          },
        }
      );
      setSearchResults(response.data);
      setSnackbar({
        open: true,
        message: "Search successful!",
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: "Error while searching!",
        severity: "error",
      });
    }
  };

  const handleOpenDetailModal = (item) => {
    setSelectedItem(item);
    setOpenDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
  };

  const handleOpenHelloModal = () => {
    setOpenHelloModal(true);
  };

  const handleCloseHelloModal = () => {
    setOpenHelloModal(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
        <h1>Receptionist Content</h1>

        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenHelloModal}
          sx={{ mt: 4 }}
        >
          Create Beneficiary Request
        </Button>

        {searchResults.length > 0 && (
          <Box border={"1px solid black"}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Search Results:
            </Typography>
            <Grid container spacing={2}>
              {searchResults.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card sx={{ maxWidth: 300, boxShadow: 3 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.qrCodeURL}
                          alt="QR Code"
                          sx={{ objectFit: "contain" }}
                        />
                        <CardContent>
                          <Typography variant="h6"><strong>Name:</strong> {item.name}</Typography>
                          <Typography variant="body2" color="textSecondary"><strong>CNIC:</strong> {item.cnic}</Typography>
                          <Typography variant="body2"><strong>Phone:</strong> {item.phone}</Typography>
                          <Typography variant="body2"><strong>Address:</strong> {item.address}</Typography>
                          <Typography variant="body2"><strong>Purpose:</strong> {item.purpose}</Typography>
                          <Typography variant="body2" color="primary"><strong>Token:</strong> {item.token}</Typography>
                          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => {handleOpenDetailModal(item); setViewDetail(true)}}>
                            View Details
                          </Button>
                        </CardContent>
                      </Card>
                  {/* <CardItem item={item} handleOpenDetailModal={handleOpenDetailModal} /> */}
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {ViewDetail && <ViewDetailModal open={openDetailModal} onClose={handleCloseDetailModal} item={selectedItem} />}
      <HelloModal open={openHelloModal} onClose={handleCloseHelloModal} />
    </>
  );
}

export default ReceptionistContent;
