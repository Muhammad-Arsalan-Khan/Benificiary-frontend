import { useState } from "react";
import { Box, Button, TextField, Snackbar, Alert, Typography, Card, CardContent, CardMedia } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config.js";
import ViewDetailModal from "../../model/Receptionist/ViewDetailModal.jsx"
import BeneficiaryRequestModal from "../../model/Receptionist/BeneficiaryRequestModel.jsx"

function ReceptionistContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([])
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [openBeneficiaryRequestModal, setOpenBeneficiaryRequestModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
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
      setSearchResults(response.data)
      setSnackbar({
        open: true,
        message: "Search successful!",
        severity: "success",
      })
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

  const handleOpenBeneficiaryRequestModal = () => {
    setOpenBeneficiaryRequestModal(true);
  };

  const handleCloseBeneficiaryRequestModal = () => {
    setOpenBeneficiaryRequestModal(false)
  }

   const handleTokenReceived = (newToken) => {
    console.log("Received Token", newToken)
    setSearchTerm(newToken)
    handleSearch()
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
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
          onClick={handleOpenBeneficiaryRequestModal}
          sx={{ mt: 4 }}
        >
          Create Beneficiary Request
        </Button>

        {searchResults.length > 0 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Search Results:
            </Typography>
            <Box container spacing={2} sx={{ display: "flex", flexDirection: "row", width: "90vw", flexWrap:"wrap", gap:"10px"}}>
              {searchResults.map((item) => (
                <Box item xs={12} sm={6} md={4} key={item._id}>
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
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{
          vertical: "top",   
          horizontal: "left"
        }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {ViewDetail && <ViewDetailModal open={openDetailModal} onClose={handleCloseDetailModal} item={selectedItem} />}
      {openBeneficiaryRequestModal && <BeneficiaryRequestModal open={openBeneficiaryRequestModal} onClose={handleCloseBeneficiaryRequestModal} onTokenReceived={handleTokenReceived} />}
    </>
  );
}

export default ReceptionistContent;
