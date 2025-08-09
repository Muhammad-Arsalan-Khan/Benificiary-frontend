import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

function CardItem({ item, handleOpenDetailModal }) {
  return (
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
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleOpenDetailModal(item)}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardItem;
