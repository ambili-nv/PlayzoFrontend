import React from "react";
import Navbar from "../../components/user/Header/Navbar";
import BookingHistory from "../../components/user/bookingHistory";
import Footer from "../../components/user/Footer/footer";

const BookingHistoryPage : React.FC = ()=>{
    return(
        <>
        <Navbar/>
        <BookingHistory/>
        <Footer/>
        </>
    )
}

export default BookingHistoryPage