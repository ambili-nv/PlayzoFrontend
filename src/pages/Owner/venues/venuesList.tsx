import React from "react";
import OwnerNavbar from "../../../components/owner/Header/OwnerNavbar";
import Footer from "../../../components/owner/Footer/footer";
import MyVenuesList from "../../../components/owner/venueLists";
const OwnerVenuesList : React.FC = ()=>{
    return (
        <>
        <OwnerNavbar/>
        <MyVenuesList/>
        <Footer/>
        </>
    )
}


export default OwnerVenuesList