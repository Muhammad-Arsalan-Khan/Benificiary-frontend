import { Modal, Box, Typography, Button } from "@mui/material";
import jsPDF from "jspdf";

function ViewDetailModal({ open, onClose, item }) {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(item.name, 20, 20);
    doc.setFontSize(12);
    doc.text(`CNIC: ${item.cnic}`, 20, 40);
    doc.text(`Phone: ${item.phone}`, 20, 50);
    doc.text(`Address: ${item.address}`, 20, 60);
    doc.text(`Purpose: ${item.purpose}`, 20, 70);
    doc.text(`Token: ${item.token}`, 20, 80);
    doc.text(`Status: ${item.status || "Not available"}`, 20, 90);
    doc.text(`Remarks: ${item.remarks || "Not available"}`, 20, 100);
    doc.save(`${item.name}_Details.pdf`);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: 4,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          boxShadow: 24,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          {item.name} - Details
        </Typography>
        <Typography variant="body2"><strong>CNIC:</strong> {item.cnic}</Typography>
        <Typography variant="body2"><strong>Phone:</strong> {item.phone}</Typography>
        <Typography variant="body2"><strong>Address:</strong> {item.address}</Typography>
        <Typography variant="body2"><strong>Purpose:</strong> {item.purpose}</Typography>
        <Typography variant="body2" color="primary"><strong>Token:</strong> {item.token}</Typography>
        <Typography variant="body2" color="textSecondary"><strong>Status:</strong> {item.status}</Typography>
        <Typography variant="body2" color="textSecondary"><strong>Remarks:</strong> {item.remarks}</Typography>

        <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={generatePDF}>
          Download PDF
        </Button>

        <Button variant="outlined" sx={{ mt: 2 }} onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default ViewDetailModal;
