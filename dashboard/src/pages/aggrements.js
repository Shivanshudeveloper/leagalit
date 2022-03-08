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
  duration,
  Chip,
} from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Snackbar from '@mui/material/Snackbar';

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";

import CloseIcon from "@mui/icons-material/Close";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { number } from "yup";

import NumberFormat from "react-number-format";
import { borderRadius, typography } from "@mui/system";

import useSessionStorage from "src/hooks/useSessionStorage";
import axios from "axios";
import { useRouter } from "next/router";
import { API_SERVICES } from "../config/apiRoutes"
import { AgreementDocument } from "src/components/agreements/agreementDocument";

var converter = require("number-to-words")

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
  const router = useRouter()

  let [showSharableURL, setShowShareURL] = useState(false)

  // landlord information
  let [landlord, setLandlord] = useState({
    landlordName: "",
    city: "",
    pincode: "",
    state: "",
    address1: "",
    address2: "",
  })

  // Property information 
  let [propertyInfo, setPropertyInfo] = useState({
    fallingCategory: "",
    bedrooms: 0,
    bathrooms: 0,
    carparks: 0,
    squareFeet: 0
  })

  // Property Address
  let [propertyAddress, setPropertyAddress] = useState({
    leaseName: "",
    city: "",
    pincode: "",
    state: "",
    address1: "",
    address2: ""
  })

  // Lease Duration 
  let [leaseDurationInfo, setLeaseDurationInformation] = useState({
    startDate: "",
    duration: 0,
    durationUnit: "",
    term: 0,
    termUnit: "",
    startingMeter: ""
  })

  // Lease Amount : Monthly rent and deposit
  let [monthlyRent, setMonthlyRent] = useState({
    amountNumbers: 0,
    amountWords: "",
    payDate: ""
  })

  let [deposit, setDeposit] = useState({
    amountNumbers: 0,
    amountWords: ""
  })

  // For adding a new agreement__________________________________________________________________________________________
  let [newAgreement, setNewAgreement] = useState({
    title: "",
    date: "",
    template: ""
  })


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


  // Delete an agreement 
  async function deleteAgreement(agreementId) {
    let baseURL = `${API_SERVICES}/agreements/${agreementId}`;

    axios.delete(baseURL)
      .then(result => {
        console.log(result.data)
        setToggler(!toggler)
      })
      .catch(err => {
        console.log(err)
      })

  }

  let [openSnackBar, setOpenSnackBar] = useState(false)
  let [snackBarMessage, setSnackBarMessage] = useState("")

  function notifyUser(state) {

    switch (state) {
      case 0:
        setSnackBarMessage("Agreement created")
        break
      case 1: setSnackBarMessage("Input field(s) may be vacant")
        break
      case 2: setSnackBarMessage("Please login")
        break
    }
    setOpenSnackBar(true)
  }

  const handleSubmit = async () => {

    // If details are missing then do not submit
    if (!userId) {
      notifyUser(2)
      return
    }

    if ((newAgreement.title === "" || newAgreement.date === "" || newAgreement.template === "")
      || (landlord.landlordName === "" || landlord.city === "" || landlord.state === "" || landlord.address1 === "" || landlord.pincode === "")
      || (propertyAddress.leaseName === "" || propertyAddress.state === "" || propertyAddress.city === "" || propertyAddress.pincode === "" || propertyAddress.address1 === "")
      || (propertyInfo.bathrooms === "" || propertyInfo.bedrooms === "" || propertyInfo.fallingCategory === "" || propertyInfo.squareFeet === "")
      || (leaseDurationInfo.duration === "" || leaseDurationInfo.durationUnit === "" || leaseDurationInfo.term === "" || leaseDurationInfo.termUnit === "" || leaseDurationInfo.startDate === "" || leaseDurationInfo.startingMeter === "")
      || (monthlyRent.amountNumbers === "" || monthlyRent.amountWords === "" || monthlyRent.payDate === "")
      || (deposit.amountNumbers === "" || deposit.amountWords === "")) {
      notifyUser(1)
      return
    }
    // On submit post to the api
    const agreement = {
      title: newAgreement.title,
      date: newAgreement.date,
      template: newAgreement.template,
      landlord,
      propertyAddress,
      propertyInfo,
      leaseDurationInfo,
      monthlyRent,
      deposit,
      userId
    }

    console.log(agreement)

    let baseURL = `${API_SERVICES}/agreements/`;
    await axios.post(baseURL, agreement)
      .then(res => {
        console.log(res.data)
        setActiveStep(0);
        setSteps(1);

        setToggler(!toggler)
        // notifyUser(0)
        setShowShareURL(true)

        // Reset the state
        setLandlord({
          landlordName: "",
          city: "",
          pincode: "",
          state: "",
          address1: "",
          address2: "",
        })

        setPropertyInfo({
          fallingCategory: "",
          bedrooms: 0,
          bathrooms: 0,
          carparks: 0,
          squareFeet: 0
        })

        setPropertyAddress({
          leaseName: "",
          city: "",
          pincode: "",
          state: "",
          address1: "",
          address2: ""
        })

        setLeaseDurationInformation({
          startDate: "",
          duration: 0,
          durationUnit: "",
          term: 0,
          termUnit: "",
          startingMeter: ""
        })

        setMonthlyRent({
          amountNumbers: 0,
          amountWords: "",
          payDate: ""
        })

        setDeposit({
          amountNumbers: 0,
          amountWords: ""
        })

        setNewAgreement({
          title: "",
          date: "",
          template: ""
        })

        handleClose();
      })
      .catch(err => {
        console.log(err)
      })
  };

  // When the component mounts or an agreement is created/deleted/modified fetch all the agreements
  let [agreements, setAgreements] = useState([])
  let [toggler, setToggler] = useState(false)
  useEffect(async () => {
    if (!userId)
      return

    let baseURL = `${API_SERVICES}/agreements/${userId}`;

    axios.get(baseURL)
      .then((res) => {
        console.log(res.data)
        setAgreements(res.data.reverse())
      })
      .catch((err) => { throw err })

  }, [userId, toggler])

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

    let baseURL = `${API_SERVICES}/profiles/${userId}`;

    await axios.get(baseURL)
      .then((res) => {
        setProfiles(res.data)
      })
      .catch((err) => { throw err })

  }, [userId])

  let [selectedProfile, setSelectedProfile] = useState()

  useEffect(async () => {

    if (!selectedProfile)
      return

    let baseURL = `${API_SERVICES}/getProfile/${selectedProfile}`;

    await axios.get(baseURL)
      .then((res) => {
        let data = res.data
        setLandlord({
          title: data.title,
          landlordName: data.landlordName,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          address1: data.address1,
          address2: data.address2
        })

      })
      .catch((err) => { throw err })


  }, [selectedProfile])



  // Camera
  const [dataUri, setDataUri] = useState('');

  function handleTakePhoto(uri) {
    setDataUri(uri);
    console.log(uri)
  }

  function handleCameraError(error) {
    console.log('handleCameraError', error);
  }

  let [tenantEmail, setTenantEmail] = useState("")


  const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  // For the snackbar
  // Opens when a new agreement is created
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          setOpenSnackBar(false)
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  let [agreementSignDialog, setAgreementSignDialog] = useState(false)

  function handleCloseSignAgreement() {
    setAgreementSignDialog(false)
  }

  let [agreementToSign, setAgreementToSign] = useState({})
  let [agreementId, setAgreementId] = useState()

  let [step, setStep] = useState(0)

  useEffect(() => {

    if (!agreementId)
      return

    axios.get(`${API_SERVICES}/single_agreement/${agreementId}`)
      .then(res => {
        setAgreementToSign(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [agreementId])

  // Current geolocation
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [location, setLocation] = useState()

  useEffect(() => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      })

  }, [])

  useEffect(() => {
    if (!lat || !lng)
      return

    axios.get(`${API_SERVICES}/get_location/${lat}/${lng}`)
      .then(res => {
        setLocation(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))

  }, [lat, lng])

  let [fullNameOfSigner, setFullNameOfSigner] = useState()


  return (
    <>
      <Dialog maxWidth="lg" open={agreementSignDialog} onClose={handleCloseSignAgreement} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative", backgroundColor: "#111827" }} id="serviceTopBar">
          <Toolbar>
            <IconButton color="inherit" onClick={handleCloseSignAgreement} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ width: "100%", padding: "0.5rem" }}>
          <Container sx={{ mt: 4, mb: 4, padding: "1rem", }}>

            {step === 0 &&
              <>
                <AgreementDocument agreement={agreementToSign} />

                <Button variant="outlined"
                  color="info"
                  fullWidth
                  sx={{ m: 2 }}
                  onClick={() => { setStep(step + 1) }}>
                  Sign Agreement
                </Button>
              </>
            }

            {step === 1 &&
              <>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>

                  {dataUri ?
                    <>
                      <img src={dataUri} />

                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "15rem" }}>
                        <Button variant="outlined"
                          color="info"
                          sx={{ m: 2 }}
                          onClick={() => { setDataUri(undefined) }}
                        >
                          Retake Photo
                        </Button>
                      </div>
                    </> :
                    <>
                      <Camera
                        onTakePhoto={(uri) => { handleTakePhoto(uri); }}
                        onCameraError={(error) => { handleCameraError(error); }}
                        isFullscreen={false}
                      />
                    </>

                  }
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Button variant="outlined"
                    color="info"
                    sx={{ m: 2 }}
                    onClick={() => { setStep(step - 1) }}>
                    Back
                  </Button>
                  {dataUri &&
                    <Button variant="outlined"
                      color="info"
                      sx={{ m: 2 }}
                      onClick={() => {
                        if (!dataUri)
                          return

                        setStep(step + 1)
                      }}
                    >
                      Continue
                    </Button>}
                </div>
              </>
            }

            {step === 2 &&
              <>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <h2>User Location :</h2>

                  {!lat ?
                    <>Please turn on geolocation to continue</> :
                    <>

                      You are at : {lat} {lng} <br />

                      {location?.formattedAddress}

                    </>
                  }
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Button variant="outlined"
                    color="info"
                    sx={{ m: 2 }}
                    onClick={() => { setStep(step - 1) }}>
                    Back
                  </Button>
                  {lat &&
                    <Button variant="outlined"
                      color="info"
                      sx={{ m: 2 }}
                      onClick={() => {
                        if (!dataUri || !lat)
                          return

                        setStep(step + 1)
                      }}
                    >
                      Continue
                    </Button>}
                </div>
              </>
            }

            {step === 3 &&
              <>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <h2>Please enter your full name</h2>

                  <TextField
                    value={fullNameOfSigner}
                    onChange={(e) => {
                      setFullNameOfSigner(e.target.value)
                    }}
                    sx={{ m: 2 }} fullWidth label="Full Name" variant="outlined" />
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Button variant="outlined"
                    color="info"
                    sx={{ m: 2 }}
                    onClick={() => { setStep(step - 1) }}>
                    Back
                  </Button>
                  {(fullNameOfSigner) &&
                    <Button variant="outlined"
                      color="info"
                      sx={{ m: 2 }}
                      onClick={() => {
                        if (!dataUri || !lat)
                          return

                        setStep(step + 1)
                      }}
                    >
                      Continue
                    </Button>}
                </div>
              </>
            }

            {step === 4 &&
              <>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <h2>Please enter your tenant's email address</h2>

                  <TextField
                    value={tenantEmail}
                    onChange={(e) => {
                      setTenantEmail(e.target.value)
                    }}
                    sx={{ m: 2 }} fullWidth label="Tenant's Email" variant="outlined" />
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Button variant="outlined"
                    color="info"
                    sx={{ m: 2 }}
                    onClick={() => { setStep(step - 1) }}>
                    Back
                  </Button>
                  {validEmail.test(tenantEmail) &&
                    <Button variant="contained"
                      color="info"
                      sx={{ m: 2 }}
                      onClick={() => {
                        if (!dataUri || !lat || !fullNameOfSigner)
                          return

                        let baseURL = `${API_SERVICES}/landlord_sign_agreement/${agreementId}`;

                        axios.patch(baseURL,
                          {
                            landlordSignatureDetails: {
                              latitude: lat,
                              longitude: lng,
                              fullNameOfSigner,
                              signerImg: dataUri,
                              address: location?.formattedAddress
                            },
                            tenantEmail
                          }
                        )
                          .then((res) => {
                            console.log(res.data)
                            handleCloseSignAgreement()
                            setDataUri(undefined)
                            setAgreementId(undefined)
                            setStep(0)
                            setFullNameOfSigner("")
                            setTenantEmail("")
                            setToggler(!toggler)
                          })
                          .catch((err) => { throw err })

                      }}
                    >
                      Submit
                    </Button>}
                </div>
              </>
            }


          </Container>
        </Box>
      </Dialog>

      {/* Opens after a new agreement is submitted */}
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackBar(false)
        }}
        message={snackBarMessage}
        action={action}
      />

      <Dialog open={showSharableURL} onClose={() => { setShowShareURL(false) }} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative", backgroundColor: "#111827" }} id="serviceTopBar">
          <Toolbar>
            <IconButton color="inherit" onClick={() => { setShowShareURL(false) }} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Typography sx={{ textAlign: "center", m: 1 }} variant="h5">
          Agreement created
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Container sx={{ mt: 2, mb: 2 }} maxWidth="sm">


            <Typography sx={{ mt: 1 }}>
              <strong>
                Click to copy : {" "}
              </strong>
              {/* Click to copy text to clipboard */}
              <Chip
                label={`http://localhost:3000/aggrements`}
                onClick={() => { navigator.clipboard.writeText(`http://localhost:3000/aggrements`) }}
              >
              </Chip>

            </Typography>

          </Container>
        </Box>
      </Dialog>


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

                <TextField name="title"
                  value={newAgreement.title}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setNewAgreement((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="Title" variant="outlined" />

                <Typography sx={{ mt: 2 }} variant="h6">
                  Date
                </Typography>
                <TextField fullWidth type="date" variant="outlined"
                  name="date"
                  value={newAgreement.date}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setNewAgreement((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                />

                <FormControl sx={{ mt: 2 }} fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Aggrement Template</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Aggrement Template"
                    name="template"
                    value={newAgreement.template}
                    onChange={(e) => {
                      let { name, value } = e.target
                      setNewAgreement((preVal) => {
                        return {
                          ...preVal,
                          [name]: value
                        }
                      })
                    }}
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
                    {/* console.log(profile._id) */ }
                    return <MenuItem key={profile._id} value={profile._id}>{profile.landlordName}</MenuItem>
                  })}

                </TextField>
                <Divider sx={{ color: "#6B7280", fontSize: "1.25rem", my: 2 }}>OR</Divider>

                <TextField
                  name="landlordName"
                  value={landlord.landlordName}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setLandlord((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="Landlord Name" variant="outlined" />

                <select
                  name="state"
                  value={landlord.state}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setLandlord((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  style={{ padding: "20px", width: "100%", marginTop: "20px" }}>
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
                  name="pincode"
                  value={landlord.pincode}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setLandlord((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                />

                <TextField
                  name="city"
                  value={landlord.city}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setLandlord((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="City" variant="outlined" />

                <TextField
                  name="address1"
                  value={landlord.address1}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setLandlord((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="Landlord Address 1" variant="outlined" />

                <TextField
                  name="address2"
                  value={landlord.address2}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setLandlord((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="Landlord Address 2" variant="outlined" />
              </>
            ) : steps === 3 ? (
              <>
                <Typography sx={{ mt: 1 }} variant="h5">
                  Property Address
                </Typography>
                <TextField
                  name="leaseName"
                  value={propertyAddress.leaseName}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setPropertyAddress((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  focused sx={{ mt: 2 }} fullWidth label="Lease Name" variant="outlined" />
                <select
                  name="state"
                  value={propertyAddress.state}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setPropertyAddress((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  style={{ padding: "20px", width: "100%", marginTop: "20px" }}>
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
                  name="pincode"
                  value={propertyAddress.pincode}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setPropertyAddress((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                />

                <TextField
                  name="city"
                  value={propertyAddress.city}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setPropertyAddress((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="City" variant="outlined" />

                <TextField
                  name="address1"
                  value={propertyAddress.address1}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setPropertyAddress((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="Lease Address 1" variant="outlined" />

                <TextField
                  name="address2"
                  value={propertyAddress.address2}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setPropertyAddress((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="Lease Address 2" variant="outlined" />

                <Typography sx={{ mt: 1 }} variant="h5">
                  Property Information
                </Typography>

                <select
                  name="fallingCategory"
                  value={propertyInfo.fallingCategory}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setPropertyInfo((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  style={{ padding: "20px", width: "100%", marginTop: "20px" }}>
                  <option selected disabled>
                    Falling Category
                  </option>
                  <option value="Independent House">Independent House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Farm House">Farm House</option>
                  <option value="Residential Property">Residential Property</option>
                </select>

                <TextField
                  name="bedrooms"
                  value={propertyInfo.bedrooms}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setPropertyInfo((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="Number of bedrooms" variant="outlined" />

                <TextField
                  name="bathrooms"
                  value={propertyInfo.bathrooms}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setPropertyInfo((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="Number of bathroom" variant="outlined" />

                <TextField
                  name="carparks"
                  value={propertyInfo.carparks}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setPropertyInfo((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="Number of carparks" variant="outlined" />

                <TextField
                  name="squareFeet"
                  value={propertyInfo.squareFeet}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setPropertyInfo((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  sx={{ mt: 2 }} fullWidth label="Square Feet" variant="outlined" />
              </>
            ) : steps === 4 ? (
              <>
                <Typography sx={{ mt: 1 }} variant="h5">
                  Lease Duration Information
                </Typography>
                <Typography sx={{ mt: 2 }} variant="h6">
                  Lease Start Date
                </Typography>
                <TextField
                  name="startDate"
                  value={leaseDurationInfo.startDate}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setLeaseDurationInformation((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
                  fullWidth type="date" variant="outlined" />
                <Typography sx={{ mt: 2 }} variant="h6">
                  Lease Term
                </Typography>
                <Box>
                  <TextField
                    name="term"
                    value={leaseDurationInfo.term}
                    onChange={(e) => {
                      let { name, value } = e.target
                      setLeaseDurationInformation((preVal) => {
                        return {
                          ...preVal,
                          [name]: value
                        }
                      })
                    }}
                    sx={{ mr: 1, width: "40%" }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField
                    name="termUnit"
                    value={leaseDurationInfo.termUnit}
                    onChange={(e) => {
                      let { name, value } = e.target
                      setLeaseDurationInformation((preVal) => {
                        return {
                          ...preVal,
                          [name]: value
                        }
                      })
                    }}
                    select sx={{ width: "58.5%" }}>
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
                    name="duration"
                    value={leaseDurationInfo.duration}
                    onChange={(e) => {
                      let { name, value } = e.target
                      setLeaseDurationInformation((preVal) => {
                        return {
                          ...preVal,
                          [name]: value
                        }
                      })
                    }}
                    sx={{ mr: 1, width: "40%" }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField
                    name="durationUnit"
                    value={leaseDurationInfo.durationUnit}
                    onChange={(e) => {
                      let { name, value } = e.target
                      setLeaseDurationInformation((preVal) => {
                        return {
                          ...preVal,
                          [name]: value
                        }
                      })
                    }}
                    select sx={{ width: "58.5%" }}>
                    <MenuItem value="Days">Days</MenuItem>
                    <MenuItem value="Months">Months</MenuItem>
                    <MenuItem value="Years">Years</MenuItem>
                  </TextField>
                </Box>
                <TextField
                  name="startingMeter"
                  value={leaseDurationInfo.startingMeter}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setLeaseDurationInformation((preVal) => {
                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
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
                  name="amountNumbers"
                  value={monthlyRent.amountNumbers}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setMonthlyRent((preVal) => {
                      return {
                        ...preVal,
                        [name]: value,
                        amountWords: converter.toWords(value ? value : 0)
                      }
                    })
                  }}
                  sx={{ mt: 1 }}
                  fullWidth
                  label="In Numbers"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Rs</InputAdornment>,
                    inputComponent: NumberFormatCustom,
                  }}
                  variant="outlined"
                />
                <TextField
                  name="amountWords"
                  value={monthlyRent.amountWords}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setMonthlyRent((preVal) => {

                      return {
                        ...preVal,
                        [name]: value
                      }
                    })
                  }}
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
                  <TextField
                    name="payDate"
                    value={monthlyRent.payDate}
                    onChange={(e) => {
                      let { name, value } = e.target
                      setMonthlyRent((preVal) => {
                        return {
                          ...preVal,
                          [name]: value
                        }
                      })
                    }}
                    sx={{ mx: 1, py: 1.4, minWidth: "50px" }} select variant="standard">
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
                  name="amountNumbers"
                  value={deposit.amountNumbers}
                  onChange={(e) => {
                    console.log(deposit)

                    let { name, value } = e.target
                    setDeposit((preVal) => {
                      return {
                        ...preVal,
                        [name]: value,
                        amountWords: converter.toWords(value ? value : 0)
                      }
                    })
                  }}
                  sx={{ mt: 1 }}
                  fullWidth
                  label="In Numbers"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Rs</InputAdornment>,
                    inputComponent: NumberFormatCustom,
                  }}
                  variant="outlined"
                />
                <TextField
                  name="amountWords"
                  value={deposit.amountWords}
                  onChange={(e) => {
                    let { name, value } = e.target
                    setDeposit((preVal) => {
                      return {
                        ...preVal,
                        [name]: value,
                      }
                    })
                  }}
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
                  <TableCell align="center">Landlord</TableCell>
                  <TableCell align="center">Created on</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {agreements?.map((currentAgreement, i) => {
                  return <TableRow key={currentAgreement._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell align="center">{currentAgreement.title}</TableCell>
                    <TableCell align="center">{currentAgreement.template}</TableCell>
                    <TableCell align="center">{currentAgreement.landlord.landlordName}</TableCell>
                    <TableCell align="center">{currentAgreement.date}</TableCell>
                    <TableCell align="center">{currentAgreement.isSigned === 1 ?
                      "Landlord Signed"
                      : currentAgreement.isSigned === 2 ? "Signed" : "Unsigned"}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton color="primary" aria-label="upload picture" component="span"
                          // OnClick redirect to view agreement page 
                          onClick={
                            () => {
                              window.open(`/viewAgreement?agreementID=${currentAgreement._id}`)
                            }
                          }
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </Tooltip>

                      {!currentAgreement.isSigned && <Tooltip title="Sign">
                        <IconButton color="primary" aria-label="upload picture" component="span"
                          // OnClick redirect to view agreement page 
                          onClick={
                            () => {
                              setAgreementId(currentAgreement._id)
                              setAgreementSignDialog(true)
                            }
                          }
                        >
                          <HistoryEduIcon />
                        </IconButton>
                      </Tooltip>}

                      <Tooltip sx={{ ml: 1 }} title="Delete">
                        <IconButton color="error" aria-label="upload picture" component="span">
                          <DeleteIcon onClick={() => {
                            deleteAgreement(currentAgreement._id)
                          }
                          } />
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

Aggrements.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Aggrements;
