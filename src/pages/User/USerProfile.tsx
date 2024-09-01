import React from "react";
import Navbar from "../../components/user/Header/Navbar";
import ProfilePage from "../../components/user/profile";
import Footer from "../../components/user/Footer/footer";


const UserProfile : React .FC = ()=>{
    return(
        <>
        <Navbar/>
        <ProfilePage/>
        <Footer/>
        </>
    )
}

export default UserProfile