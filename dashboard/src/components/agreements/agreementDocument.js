import PageStyles from "./PageStyles.module.css"

export const AgreementDocument = (props) => {
    const { agreement } = props

    return (< div >
        <h2>RESIDENTIAL RENTAL AGREEMENT</h2>

        <p>
            This agreement made at {agreement?.landlord?.city}, {agreement?.landlord?.state} on this [Date, Month, Year] between {agreement?.landlord?.landlordName}, residing at {agreement?.landlord?.address1}, {agreement?.landlord?.address2}, {agreement?.landlord?.city}, {agreement?.landlord?.state}, {agreement?.landlord?.pincode}
            hereinafter referred to as the `LESSOR` of the One Part AND [Tenant Name], residing at
            [Tenant Address Line 1, Address Line 2, City, State, Pin Code] hereinafter referred to as
            the `LESSEE` of the other Part;
        </p>
        <br />

        <p>
            WHEREAS the Lessor is the lawful owner of, and otherwise well sufficiently entitled to
            {agreement?.propertyAddress?.address1}, {agreement?.propertyAddress?.address2}, {agreement?.propertyAddress?.city}, {agreement?.propertyAddress?.state}, {agreement?.propertyAddress?.pincode} falling in the
            category, {agreement?.propertyInfo?.fallingCategory} and
            comprising of {agreement?.propertyInfo?.bedrooms} Bedrooms, {agreement?.propertyInfo?.bathrooms} Bathrooms, {agreement?.propertyInfo?.carparks} Carparks with an extent of {agreement?.propertyInfo?.squareFeet} Square-feet hereinafter referred to as the `said premises`;
        </p>
        <br />

        <p>
            AND WHEREAS at the request of the Lessee, the Lessor has agreed to let the said
            premises to the tenant for a term of {agreement?.leaseDurationInfo?.term} {agreement?.leaseDurationInfo?.termUnit} commencing from {agreement?.leaseDurationInfo?.startDate}
            in the manner hereinafter appearing.
        </p>
        <br />

        <p>
            NOW THIS AGREEMENT WITNESSETH AND IT IS HEREBY AGREED BY AND BETWEEN
            THE PARTIES AS UNDER
        </p>
        <br />

        <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
            <p>
                <ol>

                    <li>
                        That the Lessor hereby grant to the Lessee, the right to enter into and use and
                        remain in the said premises along with the existing fixtures and fittings listed in
                        Annexure 1 to this Agreement and that the Lessee shall be entitled to peacefully
                        possess, and enjoy possession of the said premises, and the other rights herein.
                    </li>

                    <li>
                        That the lease hereby granted shall, unless cancelled earlier under any provision of
                        this Agreement, remain in force for a period of {agreement?.leaseDurationInfo?.term} {agreement?.leaseDurationInfo?.termUnit}.
                    </li>

                    <li>
                        That the Lessee will have the option to terminate this lease by giving {agreement?.leaseDurationInfo?.duration} {agreement?.leaseDurationInfo?.durationUnit} in writing to the Lessor.
                    </li>

                    <li>
                        That the Lessee shall have no right to create any sub-lease or assign or transfer in
                        any manner the lease or give to any one the possession of the said premises or any
                        part thereof.
                    </li>

                    <li>
                        That the Lessee shall use the said premises only for residential purposes.
                    </li>

                    <li style={{ pageBreakAfter: "always" }}>
                        That the Lessor shall, before handing over the said premises, ensure the working of
                        sanitary, electrical and water supply connections and other fittings pertaining to the
                        said premises. It is agreed that it shall be the responsibility of the Lessor for their
                        return in the working condition at the time of re-possession of the said premises
                        (reasonable wear and tear and loss or damage by fire, flood, rains, accident,
                        irresistible force or act of God excepted).
                    </li>

                    <br className={PageStyles.showWhenPrint} />

                    <li>
                        That the Lessee is not authorized to make any alteration in the construction of the
                        said premises. The Lessee may however install and remove his own fittings and
                        fixtures, provided this is done without causing any excessive damage or loss to the
                        said premises.
                    </li>

                    <li>
                        That the day to day repair jobs such as fuse blow out, replacement of light
                        bulbs/tubes, leakage of water taps, maintenance of the water pump and other minor
                        repairs, etc., shall be effected by the Lessee at its own cost, and any major repairs,
                        either structural or to the electrical or water connection, plumbing leaks, water
                        seepage shall be attended to by the Lessor. In the event of the Lessor failing to carry
                        out the repairs on receiving notice from the Lessee, the Lessee shall undertake the
                        necessary repairs and the Lessor will be liable to immediately reimburse costs
                        incurred by the Lessee.
                    </li>

                    <li>
                        That the Lessor or its duly authorized agent shall have the right to enter into or upon
                        the said premises or any part thereof at a mutually arranged convenient time for the
                        purpose of inspection.
                    </li>

                    <li>
                        That the Lessee shall use the said premises along with its fixtures and fitting in
                        careful and responsible manner and shall handover the premises to the Lessor in
                        working condition (reasonable wear and tear and loss or damage by fire, flood,
                        rains, accidents, irresistible force or act of God excepted).
                    </li>

                    <li>
                        That in consideration of use of the said premises the Lessee agrees that he shall pay
                        to the Lessor during the period of this agreement, a monthly rent at the rate of
                        {agreement?.monthlyRent?.amountNumbers} {agreement?.monthlyRent?.amountWords}. The amount will be paid in advance on or
                        before the date of {agreement?.monthlyRent?.payDate} of every English calendar month.
                    </li>

                    <li>
                        It is hereby agreed that if default is made by the lessee in payment of the rent for a
                        period of three months, or in observance and performance of any of the covenants
                        and stipulations hereby contained and on the part to be observed and performed by
                        the lessee, then on such default, the lessor shall be entitled in addition to or in the
                        alternative to any other remedy that may be available to him at this discretion, to
                        terminate the lease and eject the lessee from the said premises; and to take
                        possession thereof as full and absolute owner thereof, provided that a notice in
                        writing shall be given by the lessor to the lessee of his intention to terminate the
                        lease and to take possession of the said premises. If the arrears of rent are paid or
                        the lessee comply with or carry out the covenants and conditions or stipulations,
                        within fifteen days from the service of such notice, then the lessor shall not be
                        entitled to take possession of the said premises.

                    </li>

                    <li style={{ pageBreakAfter: "always" }}>
                        That in addition to the compensation mentioned above, the Lessee shall pay the
                        actual electricity, shared maintenance, water bills for the period of the agreement
                        directly to the authorities concerned. The relevant `start date` meter readings are
                        {agreement?.leaseDurationInfo?.startingMeter}.
                    </li>
                    <br className={PageStyles.showWhenPrint} />

                    <li>
                        That the Lessee has paid to the Lessor a sum of {agreement?.deposit?.amountNumbers} {agreement?.deposit?.amountWords} as deposit, free of interest, which the Lessor does accept and acknowledge.
                        This deposit is for the due performance and observance of the terms and conditions
                        of this Agreement. The deposit shall be returned to the Lessee simultaneously with
                        the Lessee vacating the said premises. In the event of failure on the part of the
                        Lessor to refund the said deposit amount to the Lessee as aforesaid, the Lessee shall
                        be entitled to continue to use and occupy the said premises without payment of any
                        rent until the Lessor refunds the said amount (without prejudice to the Lessee`s
                        rights and remedies in law to recover the deposit).
                    </li>

                    <li>
                        That the Lessor shall be responsible for the payment of all taxes and levies
                        pertaining to the said premises including but not limited to House Tax, Property Tax,
                        other cesses, if any, and any other statutory taxes, levied by the Government or
                        Governmental Departments. During the term of this Agreement, the Lessor shall
                        comply with all rules, regulations and requirements of any statutory authority, local,
                        state and central government and governmental departments in relation to the said
                        premises.
                    </li>
                </ol>
            </p>
        </div>
        <br />

        <p>
            IN WITNESS WHEREOF, the parties hereto have set their hands on the day and year first
            hereinabove mentioned.
        </p>
        <br />

        <div style={{ display: "flex", justifyContent: "space-around", pageBreakAfter: "always" }} >

            <div>
                <p>
                    Lessor,
                </p>
                <br /><br />

                <p>
                    {agreement?.landlord?.landlordName}
                </p>
                <p>
                    {agreement?.landlord?.address1}
                </p>
                <p>
                    {agreement?.landlord?.address2}
                </p>
                <p>
                    {agreement?.landlord?.city}, {agreement?.landlord?.state}, {agreement?.landlord?.pincode}
                </p>
                <br /><br />

                <p>
                    WITNESS ONE
                </p>
                <br /><br />
                <p>
                    [Name & Address]
                </p>

            </div>

            <div>
                <p>
                    Lessee,
                </p>
                <br /><br />

                <p>
                    [Name]
                </p>
                <p>
                    [Address Line 1]
                </p>
                <p>
                    [Address Line 2]
                </p>
                <p>
                    [City, State, Pin Code]
                </p>
                <br /><br />

                <p>
                    WITNESS TWO
                </p>
                <br /><br />
                <p>
                    [Name & Address]
                </p>

            </div>
        </div>
        <br /><br /><br />

        <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>
                ANNEXURE I
            </h2>
        </div>
        <br />

        <p>
            List of fixtures and fittings provided in {agreement?.propertyAddress?.address1}, {agreement?.propertyAddress?.address2},
            {agreement?.propertyAddress?.city}, {agreement?.propertyAddress?.state}, {agreement?.propertyAddress?.pincode}:

            <ol div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
                <li>Item 1 </li>
                <li>Item 2 </li>
                <li>Item 3 </li>
            </ol>
        </p>

    </div >
    )
};
