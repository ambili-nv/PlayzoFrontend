import React from "react";

import OwnerNavbar from "../../../components/owner/Header/OwnerNavbar";
import TimeSlotManager from "../../../components/owner/slots";
import Footer from "../../../components/owner/Footer/footer";

const SlotPage : React.FC = ()=>{
    return (
        <>
        <OwnerNavbar/>
        <TimeSlotManager/>
        {/* <Footer/> */}
        </>
    )
}

export default SlotPage