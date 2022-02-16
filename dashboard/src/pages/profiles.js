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

// Get access to the sessionStorage object for userId and userEmail
import useSessionStorage from "src/hooks/useSessionStorage";
import axios from "axios"

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

  // For the dialog box for editing a profile
  const [openEditor, setOpenEditor] = React.useState(false);
  const handleClickOpenEditor = () => {
    setOpenEditor(true);
  };
  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  // When the editor is open fetch data of the profile to be viewed
  // States corresponding to the values entered in the form
  let [titleEditor, setTitleEditor] = useState("")
  let [landlordNameEditor, setLandlordNameEditor] = useState("")
  let [cityEditor, setCityEditor] = useState("")
  let [stateEditor, setStateEditor] = useState("Andhra Pradesh")
  let [pincodeEditor, setPincodeEditor] = useState("")
  let [address1Editor, setAddress1Editor] = useState("")
  let [address2Editor, setAddress2Editor] = useState("")
  let [profileToEdit, setProfileToEdit] = useState()

  useEffect(async () => {
    if (!profileToEdit)
      return

    let baseURL = `http://localhost:5000/api/v1/main/getProfile/${profileToEdit}`;

    await axios.get(baseURL)
      .then((res) => {
        let data = res.data

        setTitleEditor(data.title)
        setLandlordNameEditor(data.landlordName)
        setCityEditor(data.city)
        setStateEditor(data.state)
        setAddress1Editor(data.address1)
        setAddress2Editor(data.address2)
        setPincodeEditor(data.pincode)
      })
      .catch((err) => { throw err })

  }, [openEditor])


  let [toggler, setToggler] = useState(false)
  const userId = useSessionStorage('userId')
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  async function handleEdit() {

    if (titleEditor === "" || cityEditor === "" || landlordNameEditor === "" || address1Editor === "" || pincodeEditor === "")
      return

    const profile = {
      title: titleEditor,
      landlordName: landlordNameEditor,
      pincode: pincodeEditor,
      city: cityEditor,
      state: stateEditor,
      address1: address1Editor,
      address2: address2Editor
    }

    let baseURL = `http://localhost:5000/api/v1/main/profiles/${profileToEdit}`;

    axios.patch(baseURL, profile)
      .then((res) => {
        setToggler(!toggler)
        handleCloseEditor()
      })
      .catch((err) => { throw err })
  }

  const handleSubmit = async () => {

    if (title === "" || city === "" || landlordName === "" || address1 === "" || pincode === "" || userId === "")
      return

    const createdOn = new Date()

    const newProfile = {
      title,
      landlordName,
      pincode,
      city,
      state,
      address1,
      address2,
      userId,
      createdOn
    }

    setTitle("")
    setLandlordName("")
    setPincode("")
    setCity("")
    setAddress1("")
    setAddress2("")
    setState("Andhra Pradesh")

    let baseURL = `http://localhost:5000/api/v1/main/profiles/`;
    await axios.post(baseURL, newProfile)
      .then(res => {
        console.log(res.data)
        setToggler(!toggler)
        handleClose();
      })
      .catch(err => {
        console.log(err)
      })


  };

  function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + ' / ' + month + ' / ' + year;
  }

  async function deleteProfile(profileId) {

    let baseURL = `http://localhost:5000/api/v1/main/profiles/${profileId}`;

    axios.delete(baseURL)
      .then(result => {
        console.log(result.data)
        setToggler(!toggler)
      })
      .catch(err => {
        console.log(err)
      })

  }

  const [profiles, setProfiles] = useState([])
  useEffect(async () => {

    // When the component first loads the userId takes a bit of time to set
    // If userId is not set we can not fetch data from our API so return 
    if (!userId)
      return

    let baseURL = `http://localhost:5000/api/v1/main/profiles/${userId}`;

    await axios.get(baseURL)
      .then((res) => {
        setProfiles(res.data.reverse())
      })
      .catch((err) => { throw err })

  }, [userId, toggler])

  // States corresponding to the values entered in the form
  let [title, setTitle] = useState("")
  let [landlordName, setLandlordName] = useState("")
  let [city, setCity] = useState("")
  let [state, setState] = useState("Andhra Pradesh")
  let [pincode, setPincode] = useState("")
  let [address1, setAddress1] = useState("")
  let [address2, setAddress2] = useState("")

  return (
    <>
      {/* Dialog to edit a profile____________________________________________________________________________________*/}
      <Dialog open={openEditor} onClose={handleCloseEditor} TransitionComponent={Transition}>
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
              Profile
            </Typography>
            <TextField value={titleEditor} onChange={(e) => setTitleEditor(e.target.value)} sx={{ mt: 1 }} fullWidth label="Title" variant="outlined" />

            <TextField value={landlordNameEditor} onChange={(e) => setLandlordNameEditor(e.target.value)} sx={{ mt: 2 }} fullWidth label="Landlord Name" variant="outlined" />

            <select value={stateEditor} onChange={(e) => setStateEditor(e.target.value)} style={{ padding: "20px", width: "100%", marginTop: "10px" }}>
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

            <TextField value={pincodeEditor} onChange={(e) => setPincodeEditor(e.target.value)} sx={{ mt: 2 }} fullWidth type="text" label="Pincode" variant="outlined" />

            <TextField value={cityEditor} onChange={(e) => setCityEditor(e.target.value)} sx={{ mt: 2 }} fullWidth label="City" variant="outlined" />

            <TextField value={address1Editor} onChange={(e) => setAddress1Editor(e.target.value)} sx={{ mt: 2 }} fullWidth label="Landlord Address 1" variant="outlined" />

            <TextField value={address2Editor} onChange={(e) => setAddress2Editor(e.target.value)} sx={{ mt: 2 }} fullWidth label="Landlord Address 2" variant="outlined" />

            <Stack sx={{ float: "right", mt: 2, mb: 2 }} direction="row" spacing={1}>
              <Button variant="outlined" color="info" onClick={handleCloseEditor} sx={{ width: "100px" }}>
                Close
              </Button>
              <Button
                color="primary"
                variant="contained"
                sx={{ width: "100px" }}
                onClick={() => {
                  handleEdit();
                }}
              >
                Save
              </Button>
            </Stack>
          </Container>
        </Box>
      </Dialog>


      {/* Dialog to add new profile___________________________________________________________________________________*/}
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
            <TextField value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mt: 1 }} fullWidth label="Title" variant="outlined" />

            <TextField value={landlordName} onChange={(e) => setLandlordName(e.target.value)} sx={{ mt: 2 }} fullWidth label="Landlord Name" variant="outlined" />

            <select value={state} onChange={(e) => setState(e.target.value)} style={{ padding: "20px", width: "100%", marginTop: "10px" }}>
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

            <TextField value={pincode} onChange={(e) => setPincode(e.target.value)} sx={{ mt: 2 }} fullWidth type="text" label="Pincode" variant="outlined" />

            <TextField value={city} onChange={(e) => setCity(e.target.value)} sx={{ mt: 2 }} fullWidth label="City" variant="outlined" />

            <TextField value={address1} onChange={(e) => setAddress1(e.target.value)} sx={{ mt: 2 }} fullWidth label="Landlord Address 1" variant="outlined" />

            <TextField value={address2} onChange={(e) => setAddress2(e.target.value)} sx={{ mt: 2 }} fullWidth label="Landlord Address 2" variant="outlined" />

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


                {/* Map all the profiles fetched from the api */}
                {profiles?.map((profile, i) => {

                  return <TableRow key={profile._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="center">{profile.title}</TableCell>
                    <TableCell align="center">{profile.landlordName}</TableCell>
                    <TableCell align="center">{profile.city}</TableCell>
                    <TableCell align="center">{getFormattedDate(new Date(profile.createdOn))}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <RemoveRedEyeIcon onClick={() => {
                            setProfileToEdit(profile._id)
                            handleClickOpenEditor()
                          }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip sx={{ ml: 1 }} title="Delete">
                        <IconButton color="error" aria-label="upload picture" component="span">
                          <DeleteIcon onClick={() => {
                            deleteProfile(profile._id)
                          }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                })}

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

