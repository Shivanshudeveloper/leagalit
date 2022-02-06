import React from 'react';
import Head from 'next/head';
import { Box, Container, FormControl, Typography, Tooltip, IconButton, Button, Stack, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Aggrements = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [steps, setsteps] = React.useState(1);


return (
  <>
    <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Container sx={{ mt: 4, mb: 4 }} maxWidth='sm'>
            
            {
                steps === 1 ? (
                    <>
                        <Typography sx={{ mt: 1 }} variant="h5">
                            New Aggrement
                        </Typography>
                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Title"
                            variant='outlined'
                        />

                        <Typography
                            sx={{ mt: 2 }}
                            variant="h6"
                        >
                            Date
                        </Typography>
                        <TextField 
                            fullWidth
                            type="date"
                            variant='outlined'
                        />

                        <FormControl sx={{ mt: 2 }} fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Aggrement Template</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Select Aggrement Template"
                                onChange={handleChange}
                            >
                                <MenuItem value="Residential Rental Agreement">Residential Rental Agreement</MenuItem>
                                <MenuItem value="Residential Rental Agreement 1">Residential Rental Agreement 1</MenuItem>
                                <MenuItem value="Residential Rental Agreement 2">Residential Rental Agreement 2</MenuItem>
                                <MenuItem value="Residential Rental Agreement 3">Residential Rental Agreement 3</MenuItem>
                            </Select>
                        </FormControl>

                        <iframe style={{ marginTop: '20px', width: '100%', height: '600px' }} src="https://storage.googleapis.com/evencloud-26d32.appspot.com/uploads/ca625bcd-cff8-401f-ac23-ad9884c1400a/aggrement.pdf" title="testPdf" />

                    </>
                ) : steps === 2 ? (
                    <>
                        <Typography sx={{ mt: 1 }} variant="h5">
                            Landlord Information
                        </Typography>
                        <TextField 
                            focused
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Landlord Name"
                            variant='outlined'
                            value="Shivanshu Gupta"
                        />

                        <select style={{ padding: '20px', width: '100%', marginTop: '20px'}} >
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>

                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            type="text"
                            label="Pinclode"
                            variant='outlined'
                        />

                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            label="City"
                            variant='outlined'
                        />

                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Landloard Address 1"
                            variant='outlined'
                        />

                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Landloard Address 2"
                            variant='outlined'
                        />
                    </>
                ) : steps === 3 ? (
                    <>
                        <Typography sx={{ mt: 1 }} variant="h5">
                            Lease Information
                        </Typography>
                        <TextField 
                            focused
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Lease Name"
                            variant='outlined'
                        />
                        <select style={{ padding: '20px', width: '100%', marginTop: '20px'}} >
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>

                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            type="text"
                            label="Pinclode"
                            variant='outlined'
                        />

                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            label="City"
                            variant='outlined'
                        />


                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Lease Address 1"
                            variant='outlined'
                        />

                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Lease Address 2"
                            variant='outlined'
                        />

                        

                    </>
                ) : steps === 4 ? (
                    <>
                        <Typography sx={{ mt: 1 }} variant="h5">
                            Property Information
                        </Typography>
                        <select style={{ padding: '20px', width: '100%', marginTop: '20px'}} >
                            <option selected disabled>Falling Category</option>
                            <option value="Independent House">Independent House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Farm House">Farm House</option>
                            <option value="Residential Property">Residential Property</option>
                        </select>

                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Number of bedrooms"
                            variant='outlined'
                        />

                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Number of bathroom"
                            variant='outlined'
                        />

                        <TextField 
                            sx={{ mt: 2 }}
                            fullWidth
                            label="Square Feet"
                            variant='outlined'
                        />
                    </>
                ) : steps === 5 ? (
                    <>
                        <center style={{ marginTop: '20px' }}>
                            <img width="100%" src="https://www.aesyacht.com/wp-content/uploads/gif.gif" />
                        </center>
                    </>
                ) : null
            }

            

            <Stack sx={{ float: 'right', mt: 2 }} direction="row" spacing={1}>
                <Button
                    variant="outlined"
                    color="info"
                    onClick={handleClose}
                    sx={{ width: '100px' }}
                >
                    Close
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    sx={{ width: '100px' }}
                    onClick={() => setsteps(steps + 1)}
                >
                    { steps === 5 ? "Save" : "Next" }
                </Button>
            </Stack>
        </Container>
    </Dialog>



    <Head>
      <title>
        Aggrements
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Typography
            sx={{ m: 1 }}
            variant="h4"
        >
            Aggremetns
        </Typography>

        <Button
            color="primary"
            variant="contained"
            sx={{ float: 'right', mb: 1 }}
            onClick={handleClickOpen}
        >
            Create new aggrement
        </Button>

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Sl No.</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Lease</TableCell>
                <TableCell align="center">Created on</TableCell>
                <TableCell align="center">
                    
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow
                key={1}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        1
                    </TableCell>
                    <TableCell align="center">
                        Test Title
                    </TableCell>
                    <TableCell align="center">
                        RESIDENTIAL RENTAL AGREEMENT
                    </TableCell>
                    <TableCell align="center">
                        Danial Clark
                    </TableCell>
                    <TableCell align="center">06-02-2022</TableCell>
                    <TableCell align="center">
                        <Tooltip title="View">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <RemoveRedEyeIcon />
                        </IconButton>
                        </Tooltip>

                        <Tooltip sx={{ ml: 1 }} title="Delete">
                        <IconButton
                            color="error"
                            aria-label="upload picture"
                            component="span"
                        >
                            <DeleteIcon />
                        </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>

                <TableRow
                key={1}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        2
                    </TableCell>
                    <TableCell align="center">
                        Test Title 2
                    </TableCell>
                    <TableCell align="center">
                        RESIDENTIAL RENTAL AGREEMENT
                    </TableCell>
                    <TableCell align="center">
                        Danial Clark
                    </TableCell>
                    <TableCell align="center">06-02-2022</TableCell>
                    <TableCell align="center">
                        <Tooltip title="View">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <RemoveRedEyeIcon />
                        </IconButton>
                        </Tooltip>

                        <Tooltip sx={{ ml: 1 }} title="Delete">
                        <IconButton
                            color="error"
                            aria-label="upload picture"
                            component="span"
                        >
                            <DeleteIcon />
                        </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>

                <TableRow
                key={1}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        3
                    </TableCell>
                    <TableCell align="center">
                        Test Title 3
                    </TableCell>
                    <TableCell align="center">
                        RESIDENTIAL RENTAL AGREEMENT
                    </TableCell>
                    <TableCell align="center">
                        Danial Clark
                    </TableCell>
                    <TableCell align="center">06-02-2022</TableCell>
                    <TableCell align="center">
                        <Tooltip title="View">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <RemoveRedEyeIcon />
                        </IconButton>
                        </Tooltip>

                        <Tooltip sx={{ ml: 1 }} title="Delete">
                        <IconButton
                            color="error"
                            aria-label="upload picture"
                            component="span"
                        >
                            <DeleteIcon />
                        </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>

                <TableRow
                key={1}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        4
                    </TableCell>
                    <TableCell align="center">
                        Test Title 4
                    </TableCell>
                    <TableCell align="center">
                        RESIDENTIAL RENTAL AGREEMENT
                    </TableCell>
                    <TableCell align="center">
                        Danial Clark
                    </TableCell>
                    <TableCell align="center">06-02-2022</TableCell>
                    <TableCell align="center">
                        <Tooltip title="View">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <RemoveRedEyeIcon />
                        </IconButton>
                        </Tooltip>

                        <Tooltip sx={{ ml: 1 }} title="Delete">
                        <IconButton
                            color="error"
                            aria-label="upload picture"
                            component="span"
                        >
                            <DeleteIcon />
                        </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
        
      </Container>
    </Box>
  </>
);
}

Aggrements.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Aggrements;
