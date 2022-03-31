import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
    Box,
    Container,
    Typography,
} from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { AgreementDocument } from "../components/agreements/agreementDocument"
import { useRouter } from "next/router";
import axios from "axios";
import { API_SERVICES } from "../config/apiRoutes"

const viewAgreement = (props) => {
    const router = useRouter()

    // Extract url params if there are any
    const { agreementID } = router.query

    // Based on the agreement id fetch agreement details
    let [agreement, setAgreement] = useState()
    useEffect(() => {
        if (!agreementID)
            return

        axios.get(`${API_SERVICES}/single_agreement/${agreementID}`)
            .then(res => {
                console.log(res.data)
                setAgreement(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [agreementID])

    return (
        <>
            <Head>
                <title>viewAgreement</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    margin: "1.5rem",
                    marginTop: "-1rem",
                    marginBottom: "1rem"
                }}
            >
                <Container maxWidth={false}>
                    <AgreementDocument agreement={agreement} />
                </Container>
            </Box>
        </>
    );
};

// viewAgreement.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default viewAgreement;

