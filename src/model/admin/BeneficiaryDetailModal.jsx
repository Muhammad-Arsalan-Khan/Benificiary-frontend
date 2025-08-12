// src/components/modals/BeneficiaryDetailModal.js
import React, { useRef } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const blackListKeys = ['_id', '__v', 'createdAt', 'updatedAt'];

const BeneficiaryDetailModal = ({ open, handleClose, data }) => {
  const pdfRef = useRef()

  const handleDownload = () => {
  const pdf = new jsPDF();
  const marginLeft = 15;
  let verticalOffset = 20;

  pdf.setFontSize(18);
  pdf.text('Beneficiary Details', marginLeft, verticalOffset);
  verticalOffset += 10;

  pdf.setFontSize(12);

  Object.entries(data).forEach(([key, value]) => {
    if (['_id', 'createdAt', 'updatedAt', '__v'].includes(key)) return;

    if (key === 'qrCodeURL') return; // handle image separately

    const line = `${key}: ${value}`;
    const splitText = pdf.splitTextToSize(line, 180);
    pdf.text(splitText, marginLeft, verticalOffset);
    verticalOffset += splitText.length * 7;
  });

  if (data.qrCodeURL) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      pdf.addImage(img, 'PNG', marginLeft, verticalOffset, 50, 50);
      pdf.save(`Beneficiary_${data.token}.pdf`);
    };
    img.onerror = () => {
      pdf.text('QR Code could not be loaded.', marginLeft, verticalOffset);
      pdf.save(`Beneficiary_${data.token}.pdf`);
    };
    img.src = data.qrCodeURL;
  } else {
    pdf.save(`Beneficiary_${data.token}.pdf`);
  }
};


  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} ref={pdfRef}>
        <Typography variant="h5" gutterBottom>
          Beneficiary Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {Object.entries(data).map(([key, value]) => {
          if (blackListKeys.includes(key)) return null;
          if (key === 'qrCodeURL') {
            return (
              <Box key={key} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>QR Code:</strong>
                </Typography>
                <img
                  src={value}
                  alt="QR Code"
                  style={{ width: 150, height: 150 }}
                />
              </Box>
            );
          }
          return (
            <Typography key={key} sx={{ mb: 1 }}>
              <strong>{key}:</strong> {value}
            </Typography>
          );
        })}

        <Button
          onClick={handleDownload}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Download PDF
        </Button>
      </Box>
    </Modal>
  )
}

export default BeneficiaryDetailModal;

