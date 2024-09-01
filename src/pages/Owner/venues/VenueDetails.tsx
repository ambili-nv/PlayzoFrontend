import React from "react";
import VenueDetailsPage from "../../../components/owner/Profile/venues";
import OwnerNavbar from "../../../components/owner/Header/OwnerNavbar";
import Footer from "../../../components/owner/Footer/footer";


const VenueDetails : React .FC = ()=>{
    return (
        <>
        <OwnerNavbar/>
        <VenueDetailsPage/>
        <Footer/>
        </>
    )
}

export default VenueDetails