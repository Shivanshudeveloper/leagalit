import React, { useEffect, useState } from "react";
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
  Divider,
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

import useSessionStorage from "src/hooks/useSessionStorage";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

var converter = require("number-to-words");

const stepsList = [
  "Agreement Details",
  "Landlord Details",
  "Property Details",
  "Lease Details",
  "Create Document",
];

const dates = [
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5" },
  { value: "6" },
  { value: "7" },
  { value: "8" },
  { value: "9" },
  { value: "10" },
  { value: "11" },
  { value: "12" },
  { value: "13" },
  { value: "14" },
  { value: "15" },
  { value: "16" },
  { value: "17" },
  { value: "18" },
  { value: "19" },
  { value: "20" },
  { value: "21" },
  { value: "22" },
  { value: "23" },
  { value: "24" },
  { value: "25" },
  { value: "26" },
  { value: "27" },
  { value: "28" },
  { value: "29" },
  { value: "30" },
  { value: "31" },
];

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

const Aggrements = () => {
  const userId = useSessionStorage('userId')
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

  const [steps, setSteps] = React.useState(1);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    setSteps(steps + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleSubmit = () => {
    setActiveStep(0);
    setSteps(1);
    handleClose();
  };

  const handleChangeToWords = () => {
    const monthlyRent = document.getElementById("monthlyRent");
    const monthlyRentWords = document.getElementById("monthlyRentWords");

    const deposit = document.getElementById("deposit");
    const depositWords = document.getElementById("depositWords");

    const chars1 = monthlyRent.value.split(",");
    const monthlyRentChars = String(chars1.join(""));

    const chars2 = deposit.value.split(",");
    const depositChars = String(chars2.join(""));

    const monthlyRentToWords =
      monthlyRentChars &&
      converter
        .toWords(monthlyRentChars)
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" ");
    const depositToWords =
      depositChars &&
      converter
        .toWords(depositChars)
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" ");

    monthlyRent.value &&
      Number(monthlyRent.value) != 0 &&
      (monthlyRentWords.value = monthlyRentToWords);

    (monthlyRent.value && monthlyRent.value === "") ||
      (Number(monthlyRent.value) === 0 && (monthlyRentWords.value = ""));

    deposit.value && Number(deposit.value) != 0 && (depositWords.value = depositToWords);

    (deposit.value && deposit.value === "") ||
      (Number(deposit.value) === 0 && (depositWords.value = ""));
  };

  const [values, setValues] = React.useState({
    textmask: "(100) 000-0000",
    numberformat: "1320",
  });

  const handleChangeOk = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const [profiles, setProfiles] = useState()
  useEffect(async () => {
    if (!userId)
      return

    let baseURL = `http://localhost:5000/api/v1/main/profiles/${userId}`;

    await axios.get(baseURL)
      .then((res) => {
        setProfiles(res.data)
      })
      .catch((err) => { throw err })

  }, [userId])

  let [selectedProfile, setSelectedProfile] = useState()
  let [title, setTitle] = useState("")
  let [landlordName, setLandlordName] = useState("")
  let [city, setCity] = useState("")
  let [state, setState] = useState("Andhra Pradesh")
  let [pincode, setPincode] = useState("")
  let [address1, setAddress1] = useState("")
  let [address2, setAddress2] = useState("")

  useEffect(async () => {

    if (!selectedProfile)
      return

    let baseURL = `http://localhost:5000/api/v1/main/getProfile/${selectedProfile}`;

    await axios.get(baseURL)
      .then((res) => {
        let data = res.data

        setTitle(data.title)
        setLandlordName(data.landlordName)
        setCity(data.city)
        setState(data.state)
        setAddress1(data.address1)
        setAddress2(data.address2)
        setPincode(data.pincode)
      })
      .catch((err) => { throw err })


  }, [selectedProfile])


  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative", backgroundColor: "#111827" }} id="serviceTopBar">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} sx={{ margin: "20px 15%" }}>
            {stepsList.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <Container sx={{ mt: 4, mb: 4 }} maxWidth="sm">
            {steps === 1 ? (
              <>
                <Typography sx={{ mt: 1 }} variant="h5">
                  New Aggrement
                </Typography>
                <TextField sx={{ mt: 2 }} fullWidth label="Title" variant="outlined" />

                <Typography sx={{ mt: 2 }} variant="h6">
                  Date
                </Typography>
                <TextField fullWidth type="date" variant="outlined" />

                <FormControl sx={{ mt: 2 }} fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Aggrement Template</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Select Aggrement Template"
                    onChange={handleChange}
                  >
                    <MenuItem value="Residential Rental Agreement">
                      Residential Rental Agreement
                    </MenuItem>
                    <MenuItem value="Residential Rental Agreement 1">
                      Residential Rental Agreement 1
                    </MenuItem>
                    <MenuItem value="Residential Rental Agreement 2">
                      Residential Rental Agreement 2
                    </MenuItem>
                    <MenuItem value="Residential Rental Agreement 3">
                      Residential Rental Agreement 3
                    </MenuItem>
                  </Select>
                </FormControl>

                <iframe
                  style={{ marginTop: "20px", width: "100%", height: "600px" }}
                  src="https://storage.googleapis.com/evencloud-26d32.appspot.com/uploads/ca625bcd-cff8-401f-ac23-ad9884c1400a/aggrement.pdf"
                  title="testPdf"
                />
              </>
            ) : steps === 2 ? (
              <>
                <Typography sx={{ mt: 1 }} variant="h5">
                  Landlord Information
                </Typography>

                <TextField
                  sx={{ my: 3 }}
                  fullWidth
                  label="Select Profile"
                  select
                  variant="outlined"
                  value={selectedProfile}
                  onChange={(e) => {
                    setSelectedProfile(e.target.value)
                  }}
                >
                  {/* Map all the profiles to the menu */}
                  {profiles?.map((profile, i) => {
                    console.log(profile._id)
                    return <MenuItem key={profile._id} value={profile._id}>{profile.title}</MenuItem>
                  })}
                </TextField>
                <Divider sx={{ color: "#6B7280", fontSize: "1.25rem", my: 2 }}>OR</Divider>

                <TextField value={landlordName} onChange={(e) => setLandlordName(e.target.value)} sx={{ mt: 2 }} fullWidth label="Landlord Name" variant="outlined" />

                <select value={state} onChange={(e) => setState(e.target.value)} style={{ padding: "20px", width: "100%", marginTop: "20px" }}>
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
                  value={pincode} onChange={(e) => setPincode(e.target.value)}
                  sx={{ mt: 2 }}
                  fullWidth
                  type="text"
                  label="Pinclode"
                  variant="outlined"
                />

                <TextField value={city} onChange={(e) => setCity(e.target.value)} sx={{ mt: 2 }} fullWidth label="City" variant="outlined" />

                <TextField value={address1} onChange={(e) => setAddress1(e.target.value)} sx={{ mt: 2 }} fullWidth label="Landlord Address 1" variant="outlined" />

                <TextField value={address2} onChange={(e) => setAddress2(e.target.value)} sx={{ mt: 2 }} fullWidth label="Landlord Address 2" variant="outlined" />
              </>
            ) : steps === 3 ? (
              <>
                <Typography sx={{ mt: 1 }} variant="h5">
                  Property Address
                </Typography>
                <TextField focused sx={{ mt: 2 }} fullWidth label="Lease Name" variant="outlined" />
                <select style={{ padding: "20px", width: "100%", marginTop: "20px" }}>
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
                  variant="outlined"
                />

                <TextField sx={{ mt: 2 }} fullWidth label="City" variant="outlined" />

                <TextField sx={{ mt: 2 }} fullWidth label="Lease Address 1" variant="outlined" />

                <TextField sx={{ mt: 2 }} fullWidth label="Lease Address 2" variant="outlined" />

                <Typography sx={{ mt: 1 }} variant="h5">
                  Property Information
                </Typography>
                <select style={{ padding: "20px", width: "100%", marginTop: "20px" }}>
                  <option selected disabled>
                    Falling Category
                  </option>
                  <option value="Independent House">Independent House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Farm House">Farm House</option>
                  <option value="Residential Property">Residential Property</option>
                </select>

                <TextField sx={{ mt: 2 }} fullWidth label="Number of bedrooms" variant="outlined" />

                <TextField sx={{ mt: 2 }} fullWidth label="Number of bathroom" variant="outlined" />

                <TextField sx={{ mt: 2 }} fullWidth label="Square Feet" variant="outlined" />
              </>
            ) : steps === 4 ? (
              <>
                <Typography sx={{ mt: 1 }} variant="h5">
                  Lease Duration Information
                </Typography>
                <Typography sx={{ mt: 2 }} variant="h6">
                  Lease Start Date
                </Typography>
                <TextField fullWidth type="date" variant="outlined" />
                <Typography sx={{ mt: 2 }} variant="h6">
                  Lease Term
                </Typography>
                <Box>
                  <TextField
                    sx={{ mr: 1, width: "40%" }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField select sx={{ width: "58.5%" }}>
                    <MenuItem value="Days">Days</MenuItem>
                    <MenuItem value="Months">Months</MenuItem>
                    <MenuItem value="Years">Years</MenuItem>
                  </TextField>
                </Box>
                <Typography sx={{ mt: 2 }} variant="h6">
                  Notice Duration
                </Typography>
                <Box>
                  <TextField
                    sx={{ mr: 1, width: "40%" }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField select sx={{ width: "58.5%" }}>
                    <MenuItem value="Days">Days</MenuItem>
                    <MenuItem value="Months">Months</MenuItem>
                    <MenuItem value="Years">Years</MenuItem>
                  </TextField>
                </Box>
                <TextField
                  sx={{ my: 2 }}
                  fullWidth
                  label="Starting Meter Reading"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">kWh</InputAdornment>,
                    inputComponent: NumberFormatCustom,
                  }}
                />
                <Typography sx={{ mt: 2 }} variant="h5">
                  Lease Amount Information
                </Typography>
                <Typography sx={{ mt: 1 }} variant="h6">
                  Monthly Rental
                </Typography>{" "}
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  label="In Numbers"
                  onChange={handleChangeOk}
                  name="numberformat"
                  id="monthlyRent"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Rs</InputAdornment>,
                    inputComponent: NumberFormatCustom,
                  }}
                  variant="outlined"
                  onBlur={handleChangeToWords}
                />
                <TextField
                  id="monthlyRentWords"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">In Words: </InputAdornment>,
                    endAdornment: <InputAdornment position="end">Rupees Only</InputAdornment>,
                    readOnly: true,
                  }}
                  sx={{ mt: 2 }}
                  fullWidth
                  variant="outlined"
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 2,
                    px: "14px",
                    border: "0.3px solid #E5E7EB",
                    borderRadius: "10px",
                  }}
                >
                  <Typography color="#6B7280">Amount to be paid on</Typography>
                  <TextField sx={{ mx: 1, py: 1.4, minWidth: "50px" }} select variant="standard">
                    {dates.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {converter.toOrdinal(option.value)}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Typography color="#6B7280">of every month</Typography>
                </Box>
                <Typography sx={{ mt: 1 }} variant="h6">
                  Deposit
                </Typography>
                <TextField
                  sx={{ mt: 1 }}
                  fullWidth
                  label="In Numbers"
                  onChange={handleChangeOk}
                  name="numberformat"
                  id="deposit"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Rs</InputAdornment>,
                    inputComponent: NumberFormatCustom,
                  }}
                  variant="outlined"
                  onBlur={handleChangeToWords}
                />
                <TextField
                  id="depositWords"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">In Words: </InputAdornment>,
                    endAdornment: <InputAdornment position="end">Rupees Only</InputAdornment>,
                    readOnly: true,
                  }}
                  sx={{ mt: 2 }}
                  fullWidth
                  variant="outlined"
                />
              </>
            ) : steps === 5 ? (
              <>
                <center style={{ marginTop: "20px" }}>
                  <img width="100%" src="https://www.aesyacht.com/wp-content/uploads/gif.gif" />
                </center>
              </>
            ) : null}

            <Stack sx={{ float: "right", mt: 2, mb: 2 }} direction="row" spacing={1}>
              <Button variant="outlined" color="info" onClick={handleClose} sx={{ width: "100px" }}>
                Close
              </Button>
              <Button
                disabled={steps === 1}
                variant="outlined"
                color="info"
                onClick={() => {
                  setSteps(steps - 1);
                  handleBack();
                }}
                sx={{ width: "100px" }}
              >
                Back
              </Button>
              <Button
                color="primary"
                variant="contained"
                sx={{ width: "100px" }}
                onClick={() => {
                  steps === 5 ? handleSubmit() : handleNext();
                }}
              >
                {steps === 5 ? "Save" : "Next"}
              </Button>
            </Stack>
          </Container>
        </Box>
      </Dialog>

      <Head>
        <title>Aggrements</title>
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
            Aggrements
          </Typography>

          <Button
            color="primary"
            variant="contained"
            sx={{ float: "right", mb: 1 }}
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
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={1} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    1
                  </TableCell>
                  <TableCell align="center">Test Title</TableCell>
                  <TableCell align="center">RESIDENTIAL RENTAL AGREEMENT</TableCell>
                  <TableCell align="center">Danial Clark</TableCell>
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
                  <TableCell align="center">Test Title 2</TableCell>
                  <TableCell align="center">RESIDENTIAL RENTAL AGREEMENT</TableCell>
                  <TableCell align="center">Danial Clark</TableCell>
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
                  <TableCell align="center">Test Title 3</TableCell>
                  <TableCell align="center">RESIDENTIAL RENTAL AGREEMENT</TableCell>
                  <TableCell align="center">Danial Clark</TableCell>
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
                  <TableCell align="center">Test Title 4</TableCell>
                  <TableCell align="center">RESIDENTIAL RENTAL AGREEMENT</TableCell>
                  <TableCell align="center">Danial Clark</TableCell>
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

Aggrements.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Aggrements;
