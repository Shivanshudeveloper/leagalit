import React, { useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Container,
  FormControl,
  Typography,
  Tooltip,
  IconButton,
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  AppBar,
  Toolbar,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
} from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import CloseIcon from "@mui/icons-material/Close";
import { number } from "yup";

import NumberFormat from "react-number-format";
import { borderRadius, typography } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;
});

var converter = require("number-to-words");

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});

const Profiles = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} TransitionComponent={Transition}>
        {/* <AppBar sx={{ position: "relative", backgroundColor: "#111827" }} id="serviceTopBar">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar> */}

        <Box sx={{ width: "100%" }}>
          <Container sx={{ mt: 4, mb: 4 }} maxWidth="sm">
            <Typography sx={{ mt: 1 }} variant="h5">
              Add New Profile
            </Typography>
            <TextField sx={{ mt: 1 }} fullWidth label="Profile Title" variant="outlined" />
            <TextField sx={{ mt: 2 }} fullWidth label="Landlord Name" variant="outlined" />

            <select style={{ padding: "20px", width: "100%", marginTop: "10px" }}>
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

            <TextField sx={{ mt: 2 }} fullWidth type="text" label="Pincode" variant="outlined" />

            <TextField sx={{ mt: 2 }} fullWidth label="City" variant="outlined" />

            <TextField sx={{ mt: 2 }} fullWidth label="Landlord Address 1" variant="outlined" />

            <TextField sx={{ mt: 2 }} fullWidth label="Landlord Address 2" variant="outlined" />

            <Stack sx={{ float: "right", mt: 2, mb: 2 }} direction="row" spacing={1}>
              <Button variant="outlined" color="info" onClick={handleClose} sx={{ width: "100px" }}>
                Close
              </Button>
              <Button
                color="primary"
                variant="contained"
                sx={{ width: "100px" }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save
              </Button>
            </Stack>
          </Container>
        </Box>
      </Dialog>

      <Head>
        <title>Profiles</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Typography sx={{ m: 1 }} variant="h4">
            Profiles
          </Typography>

          <Button
            color="primary"
            variant="contained"
            sx={{ float: "right", mb: 1 }}
            onClick={handleClickOpen}
          >
            Create new profile
          </Button>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl No.</TableCell>
                  <TableCell align="center">Profile Title</TableCell>
                  <TableCell align="center">Landlord Name</TableCell>
                  <TableCell align="center">City/State</TableCell>
                  <TableCell align="center">Created on</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={1} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    1
                  </TableCell>
                  <TableCell align="center">Profile Title</TableCell>
                  <TableCell align="center">Shivanshu Gupta</TableCell>
                  <TableCell align="center">CityName/StateName</TableCell>
                  <TableCell align="center">06-02-2022</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip sx={{ ml: 1 }} title="Delete">
                      <IconButton color="error" aria-label="upload picture" component="span">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow key={1} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    2
                  </TableCell>
                  <TableCell align="center">Profile Title 2</TableCell>
                  <TableCell align="center">Shivanshu Gupta</TableCell>
                  <TableCell align="center">CityName/StateName</TableCell>
                  <TableCell align="center">06-02-2022</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip sx={{ ml: 1 }} title="Delete">
                      <IconButton color="error" aria-label="upload picture" component="span">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow key={1} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    3
                  </TableCell>
                  <TableCell align="center">Profile Title 3</TableCell>
                  <TableCell align="center">Shivanshu Gupta</TableCell>
                  <TableCell align="center">CityName/StateName</TableCell>
                  <TableCell align="center">06-02-2022</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip sx={{ ml: 1 }} title="Delete">
                      <IconButton color="error" aria-label="upload picture" component="span">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>

                <TableRow key={1} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    4
                  </TableCell>
                  <TableCell align="center">Profile Title 4</TableCell>
                  <TableCell align="center">Shivanshu Gupta</TableCell>
                  <TableCell align="center">CityName/StateName</TableCell>
                  <TableCell align="center">06-02-2022</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip sx={{ ml: 1 }} title="Delete">
                      <IconButton color="error" aria-label="upload picture" component="span">
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
};

Profiles.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Profiles;
