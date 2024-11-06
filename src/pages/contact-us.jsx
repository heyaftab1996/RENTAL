import React from 'react';
import { Typography, Grid, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ContactUsPage = () => {
  return (
    <div>
      {/* Title Section */}
      <Typography variant="h3" align="center" gutterBottom>
        CONTACT US
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        West Bengal Housing Infrastructure Development Corporation Limited (Govt. of West Bengal Undertaking)
      </Typography>

      {/* Quick Access Information Section */}
      <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Head Office</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Email Support</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add other cards for quick access like Key Personalities, Working Hours, etc. */}
      </Grid>

      {/* Map Section */}
      <Grid container spacing={3} justifyContent="center" style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <iframe
            src="https://www.google.com/maps/embed?..." // Replace with actual map link
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">Location Map</Typography>
              {/* Replace with an actual image if available */}
              <img src="path_to_location_map_image" alt="Location Map" style={{ width: '100%' }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Contact Section */}
      <Typography variant="h5" align="center" style={{ marginTop: '40px' }}>
        Detailed Contact
      </Typography>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table aria-label="contact table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>+123456789</TableCell>
              <TableCell>johndoe@example.com</TableCell>
            </TableRow>
            {/* Add more rows dynamically for each contact */}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Repeat Table for each section like Admin, Finance, Marketing */}
    </div>
  );
};

export default ContactUsPage;
