import React from "react";
import OwnerNavbar from "../../components/owner/Header/OwnerNavbar";
import ProfilePage from "../../components/owner/Profile/profile";
import Footer from "../../components/owner/Footer/footer";


const OwnerProfile :  React . FC = ()=>{
    return(
        <>
        <OwnerNavbar/>
        <ProfilePage/>
        <Footer/>
        </>
    )
}

export default OwnerProfile