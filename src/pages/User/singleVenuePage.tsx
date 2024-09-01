import React from "react";
import Navbar from "../../components/user/Header/Navbar";
import Footer from "../../components/user/Footer/footer";
import SingleVenue from "../../components/user/singleVenue";

const SingleVenuePage : React.FC = ()=>{
    return(
        <>
        <Navbar/>
        <SingleVenue/>
        <Footer/>
        </>
    )
}

export default SingleVenuePage