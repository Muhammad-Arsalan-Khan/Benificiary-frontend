import { Modal, Box, Typography, Button } from "@mui/material";

function HelloModal({ open, onClose }) {
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
          width: "300px",
          boxShadow: 24,
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Hello
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default HelloModal;
