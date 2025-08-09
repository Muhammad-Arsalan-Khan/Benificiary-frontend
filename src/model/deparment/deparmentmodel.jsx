import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField
} from "@mui/material";
import { jsPDF } from "jspdf";
import axios from "axios";
import config from "../../config.js";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

function ViewDetailsModal({ open, onClose, application}) {
  const [status, setStatus] = useState(application.status || "Pending")
  const [remarks, setremarks] = useState(application.remarks || "")

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = margin + 30;

    doc.setTextColor("#005EB8");
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("BENEFICIARY", pageWidth / 2, margin + 10, { align: "center" });

    doc.setDrawColor("#8BC441");
    doc.setLineWidth(1.5);
    doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);

    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const lineHeight = 8;
    const labelX = margin + 5;
    const valueX = margin + 60;

    const addLine = (label, value) => {
      if (y > pageHeight - margin - 50) {
        doc.addPage();
        y = margin;
      }
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, labelX, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${value}`, valueX, y);
      y += lineHeight;
    };

    addLine("User Name", application.name);
    addLine("Email", application.cnic);
    addLine("CNIC", application.phone);
    addLine("Address", application.address);
    addLine("ID", application.token);
    addLine("Status", application.status);
    addLine("Purpose", application.purpose);
    addLine("Remarks", application.remarks);

    doc.save("loan-details.pdf");
  };

  const handleApply = async () => {
    try {
      if(!remarks || !status){
        toast.error("fill the field status or remarks", {
        position: "top-right",
        autoClose: 3000,
      })
      return
      }
      const response = await axios.post(
        `${config.baseURL}/department/${application._id}`,
        { status, remarks },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      onClose()
      Swal.fire({
        title: "Application submitted!",
        icon: "success",
        draggable: true,
      })
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          View Details
        </Typography>
        <Typography>
          <strong>Name:</strong> {application.name}
        </Typography>
        <Typography>
          <strong>Email:</strong> {application.cnic}
        </Typography>
        <Typography>
          <strong>Phone:</strong> {application.phone}
        </Typography>
        <Typography>
          <strong>CNIC:</strong> {application.address}
        </Typography>
        <Typography>
          <strong>Status:</strong> {application.status}
        </Typography>
        <Typography>
          <strong>ID:</strong> {application.token}
        </Typography>
        <Typography>
          <strong>Purpose:</strong> {application.purpose}
        </Typography>
        <Typography>
          <strong>Remarks:</strong> {application.remarks}
        </Typography>

        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
          <TextField
            label="Remark*"
            value={remarks}
            onChange={(e) => setremarks(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </FormControl>

        <Box display="flex" justifyContent="space-between" mt={3} gap={2}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleApply}>
            Apply
          </Button>
          <Button variant="contained" onClick={handleDownload}>
            Download PDF
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ViewDetailsModal;
