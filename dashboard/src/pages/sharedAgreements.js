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

const SharedAgreements = () => {
    const router = useRouter()

    const userId = useSessionStorage('userId')
    const userEmail = useSessionStorage('userEmail')

    // When the component mounts or an agreement is created/deleted/modified fetch all the agreements
    let [agreements, setAgreements] = useState([])
    let [toggler, setToggler] = useState(false)
    useEffect(async () => {
        if (!userEmail)
            return

        let baseURL = `${API_SERVICES}/shared_agreements/${userEmail}`;

        axios.get(baseURL)
            .then((res) => {
                console.log(res.data)
                setAgreements(res.data.reverse())
            })
            .catch((err) => { throw err })

    }, [userId, toggler])


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

    // Camera
    const [dataUri, setDataUri] = useState('');

    function handleTakePhoto(uri) {
        setDataUri(uri);
        console.log(uri)
    }

    function handleCameraError(error) {
        console.log('handleCameraError', error);
    }

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

                                <Stack sx={{ float: "right", mt: 2, mb: 2 }} direction="row" spacing={1}>
                                    <Button variant="outlined" color="info" onClick={handleCloseSignAgreement} sx={{ width: "100px" }}>
                                        Close
                                    </Button>
                                    <Button variant="outlined"
                                        color="info"
                                        // fullWidth
                                        sx={{ m: 2 }}
                                        onClick={() => { setStep(step + 1) }}>
                                        Sign Agreement
                                    </Button>
                                </Stack>
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
                                        <Button variant="contained"
                                            color="info"
                                            sx={{ m: 2 }}
                                            onClick={() => {
                                                if (!dataUri || !lat || !fullNameOfSigner)
                                                    return

                                                let baseURL = `${API_SERVICES}/tenant_sign_agreement/${agreementId}`;

                                                axios.patch(baseURL,
                                                    {
                                                        tenantSignatureDetails: {
                                                            latitude: lat,
                                                            longitude: lng,
                                                            fullNameOfSigner,
                                                            signerImg: dataUri,
                                                            address: location?.formattedAddress
                                                        }
                                                    }
                                                )
                                                    .then((res) => {
                                                        console.log(res.data)
                                                        handleCloseSignAgreement()
                                                        setDataUri(undefined)
                                                        setAgreementId(undefined)
                                                        setStep(0)
                                                        setFullNameOfSigner("")
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

            <Head>
                <title>SharedAgreements</title>
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
                        Shared Agreements
                    </Typography>

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
                                        <TableCell align="center">

                                            <Chip
                                                label={currentAgreement.isSigned === 1 ?
                                                    "Landlord Signed"
                                                    : currentAgreement.isSigned === 2 ? "Signed" : "Unsigned"}
                                                color={currentAgreement.isSigned === 1 ?
                                                    "warning"
                                                    : currentAgreement.isSigned === 2 ? "success" : "error"}
                                            />

                                        </TableCell>
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

                                            {currentAgreement.isSigned === 1 && <Tooltip title="Sign">
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

SharedAgreements.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default SharedAgreements;
