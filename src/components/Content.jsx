import { Container, Box, Typography } from "@mui/material"
import image from "../assets/hero.png"

const Content = () => {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        padding={4}
        sx={{
        flexDirection: { xs: 'column', sm: 'row' } 
      }}
      >
        <Box flex={1} paddingLeft={4}>
          <Typography variant="h3" gutterBottom fontWeight="bold" sx={{ fontSize: {xs: "25px" }}}>
            Easily Manage and Track{" "}
            <Box component="span" color="#8BC441">
              Beneficiaries
            </Box>{" "}
            All in One Place
          </Typography>
          <Typography variant="body1">
            Our Beneficiary Management App helps welfare organizations register, track, and assist people with ease. Using a secure CNIC-based system, it ensures accurate records, real-time updates, and smooth communication across departments. From registration to completion, every step is organized, efficient, and transparent — making the process of helping others faster and smarter.
          </Typography>
        </Box>

        <Box flex={1} display="flex" justifyContent="center">
          <img
            src={image}
            alt="beneficiary hero"
            style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Content
