import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  Modal,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import config from "../../config.js";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2"

const BeneficiaryRequestModal = ({ open, onClose, onTokenReceived }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const res = await axios.post(`${config.baseURL}/receptionist`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      setSnackbar({
        open: true,
        message: "Application Submitted successfully",
        severity: "success",
      });
      reset()
      onClose()
      const token = res.data.token
      Swal.fire({
        title: "Application submitted!",
        icon: "success",
        draggable: true,
      })
      onTokenReceived(token)
    } catch (error) {
        console.log(error)
      setSnackbar({
        open: true,
        message: "Error submitting form!",
        severity: "error",
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            padding: 4,
            maxWidth: 400,
            margin: "auto",
            backgroundColor: "white",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Enter Beneficiary Details</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 10,
              color: "black",
            }}
          >
            <CloseIcon />
          </IconButton>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="cnic"
              control={control}
              rules={{
                required: "CNIC is required",
                minLength: { value: 13, message: "CNIC must be 13 digits" },
                maxLength: { value: 13, message: "CNIC must be 13 digits" },
                pattern: { value: /^[0-9]*$/, message: "CNIC must be numeric" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="CNIC"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.cnic}
                  helperText={errors.cnic?.message}
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />

            <Controller
              name="purpose"
              control={control}
              rules={{ required: "Purpose is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Purpose"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.purpose}
                  helperText={errors.purpose?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading || Object.keys(errors).length > 0} // Disable if there are errors
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Box>
      </Modal>

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
    </>
  );
};

export default BeneficiaryRequestModal;
