import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signupSchema from "../../../validation/signupSchema.jsx";
import Cookies from "js-cookie";
//import OtpModal from "../../../model/otp.jsx";
import config from "../../../config.js";

const CreateUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      cnic: "",
      address: "",
      city: "",
      country: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`${config.baseURL}/admin/createUser`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")} `,
        },
      })
      const userId = response.data.data
      const useremail = response.data.email
      // localStorage.setItem("user_email", useremail)
      setUserId(userId);
      setSnackbar({
        open: true,
        message: "Signup successful! Please verify OTP",
        severity: "success",
      });
      setShowModal(true)
      reset()
      setLoading(false)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Created",
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (err) {
      console.log(err);
      setLoading(false);
      const errorMessage =
        err.response?.data?.message || "Signup failed. Please try again";
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: { xs: "90%", sm: 450 },
        mx: "auto",
        mt: { xs: 3, sm: 5 },
      }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        Create User
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        {[
          { name: "name", label: "Name" },
          { name: "email", label: "Email" },
          { name: "cnic", label: "CNIC", type: "number" },
          { name: "type", label: "Type" },
          { name: "password", label: "Password", type: "password" },
        ].map((field) => (
          <Box key={field.name} mb={2}>
            <Controller
              name={field.name}
              control={control}
              render={({ field: controllerField }) =>
                field.name === "type" ? (
                  <FormControl fullWidth error={!!errors[field.name]}>
                    <InputLabel id="type-label">{field.label}</InputLabel>
                    <Select
                      labelId="type-label"
                      label={field.label}
                      {...controllerField}
                    >
                      <MenuItem value="Deparment">Deparment</MenuItem>
                      <MenuItem value="Receptionist">Receptionist</MenuItem>
                    </Select>
                    {errors[field.name] && <p>{errors[field.name]?.message}</p>}
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    label={field.label}
                    type={field.type || "text"}
                    {...controllerField}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]?.message}
                  />
                )
              }
            />
          </Box>
          // <Box key={field.name} mb={2}>
          //   <Controller
          //     name={field.name}
          //     control={control}
          //     render={({ field: controllerField }) => (
          //       <TextField
          //         fullWidth
          //         label={field.label}
          //         type={field.type || "text"}
          //         {...controllerField}
          //         error={!!errors[field.name]}
          //         helperText={errors[field.name]?.message}
          //       />
          //     )}
          //   />
          // </Box>
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Create..." : "Create"}
        </Button>
        {/* <Box sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary" align="center">
            I have Already Account{" "}
            <Link href="/login" underline="hover" color="primary">
              Login
            </Link>
          </Typography>
        </Box> */}
      </Box>

      {/* {showModal && (
        <OtpModal
          onClose={() => setShowModal(false)}
          userId={userId}
          page={"signup"}
        />
      )} */}

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
    </Paper>
  );
};

export default CreateUser;
