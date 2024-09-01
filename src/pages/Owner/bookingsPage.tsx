import React from "react";
import OwnerNavbar from "../../components/owner/Header/OwnerNavbar";
import BookingHistoryPage from "../../components/owner/bookings";
import Footer from "../../components/owner/Footer/footer";

const BookingPage : React.FC = ()=>{
    return (
        <>
        <OwnerNavbar/>
        <BookingHistoryPage/>
        <Footer/>
        </>
    )
}

export default BookingPage