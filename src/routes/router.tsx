import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "../components/Admin/AdminLayout";
import { ProtectRoute,OwnerProtectRoute,AdminProtectRoute} from "./protectRoutes";
import { PublicRouteUser,PublicRouteOwner,PublicRouteAdmin } from "./publicRoutes";

const ErrorPAge =  lazy(()=> import ('../pages/Page404'))

const Home = lazy(()=> import ('../pages/User/Home'))
const ContactUS = lazy(()=> import ('../pages/User/contact'))
const UserLogin = lazy(() => import('../pages/User/Login'));
const UserSignUP = lazy(()=>import ('../pages/User/signup'))
const UserOTP = lazy(()=>import('../pages/User/OTP'))
const UserBook = lazy(()=>import('../pages/User/Book'))
const ForgotPassword = lazy(()=>import ('../pages/User/ForgotPAssword'))
const ResetPassword = lazy(()=>import ('../pages/User/resetPassword'))
const UserProfile = lazy(()=>import ('../pages/User/USerProfile'))
const SingleVenuePage = lazy(()=>import ('../pages/User/singleVenuePage'))
// const paymentPage = lazy(()=>import ('../pages/User/paymentSuccess'))
const PaymentPage = lazy(()=>import('../pages/User/paymentSuccess'))
const ChatPage = lazy(()=>import('../pages/User/chat'))
const BookingDetailsPage  = lazy(()=>import('../components/user/bookingDetails'))

            // Owner Routes

const OwnerLogin = lazy(()=>import('../pages/Owner/ownerLogin'))  
const OwnerSignUp = lazy(()=>import('../pages/Owner/ownerSignUp')) 
const OTP = lazy(()=>import('../pages/Owner/OwnerOtp')) 
const UploadVenues = lazy(()=>import('../pages/Owner/venues/uploadVenues'))   
const HomePage = lazy(()=>import('../pages/Owner/Home'))  
const OwnerProfile = lazy(()=>import ('../pages/Owner/OwnerProfile'))
const Venues = lazy(()=>import('../pages/Owner/venues/VenueDetails'))
const OwnerVenuesList = lazy(()=>import('../pages/Owner/venues/venuesList'))
const VenueDetails = lazy(()=>import('../pages/Owner/venues/VenueDetails'))
const Slots = lazy(()=> import('../pages/Owner/venues/slotsPage'))
const BookingPage = lazy(()=> import('../pages/Owner/bookingsPage'))
const OwnerChatPage = lazy(()=> import('../pages/Owner/chat'))
const OwnerBookingDetailsPage = lazy(()=> import('../components/owner/bookingDetails'))
const ViewSlots = lazy(()=> import('../components/owner/viewSlots'))
const Notificaion = lazy(()=>import('../pages/Owner/notifications'))

            // Admin Routes

const AdminLogin = lazy(()=>import('../pages/Admin/login'))     
const AdminDashboard = lazy(()=>import('../pages/Admin/adminDashboard'))      
const UsersList = lazy(()=>import('../pages/Admin/usersList')) 
const OwnerList  = lazy(()=>import('../pages/Admin/ownerList'))
const VenuesList = lazy(()=>import('../pages/Admin/venuesList'))
const AdminBookingHistory = lazy(()=>import('../pages/Admin/userBookings'))

export const MainRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        {/* <Route path = "" element = {<PublicRouteUser/>}> */}
        <Route path = "/book" element={<UserBook/>}/>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUP/>}/>
        <Route path="/otp" element={<UserOTP/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:id" element={<ResetPassword/>}/>
        <Route path="/single-venue/:venueId" element={<SingleVenuePage/>}/>
        <Route path="/contact" element={<ContactUS/>}/>
        {/* </Route> */}

        <Route path = "" element = {<ProtectRoute/>}>
        <Route path="/user-profile" element={<UserProfile/>}/>
        <Route path="/user/chat" element={<ChatPage/>}/>
        <Route path="/payment_status/:id" element={<PaymentPage/>}/>
        <Route path="/booking-details/:bookingId" element={<BookingDetailsPage/>}/>

        </Route>

        {/* Owner Routes */}

        <Route path = "" element={<PublicRouteAdmin/>}>
        <Route path = "/owner/login" element={<OwnerLogin/>}/>
        <Route path = "/owner/signup" element={<OwnerSignUp/>}/>
        <Route path = "/owner/otp" element={<OTP/>}/>
        </Route>

        <Route path = "" element = {<OwnerProtectRoute/>}>
        <Route path = "/owner/venueupload" element={<UploadVenues/>}/>
        <Route path = "/owner/homepage" element={<HomePage/>}/>
        <Route path = "/owner/profile" element={<OwnerProfile/>}/>
        <Route path = "/owner/venue-details" element={<Venues/>}/>
        <Route path = "/owner/myvenue/:ownerId" element={<OwnerVenuesList/>}/>
        <Route path="/owner/edit-venue/:venueId" element={<VenueDetails />} />
        <Route path="/owner/add-slot/:venueId" element={<Slots />} />
        <Route path="/owner/bookings/" element={<BookingPage />} />
        <Route path="/owner/chat/" element={<OwnerChatPage />} />
        <Route path="/owner/booking-details/:bookingId" element={<OwnerBookingDetailsPage/>}/>
        <Route path="/owner/viewslots/:venueId" element={<ViewSlots/>}/>
        <Route path="/owner/notifications/" element={<Notificaion/>}/>

        </Route>

        {/* admin routes */}
        <Route path = "" element = {<PublicRouteAdmin/>}>
        <Route path = "/admin/login" element={<AdminLogin/>}/>
        </Route>

        <Route path = "" element = {<AdminProtectRoute/>}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UsersList />} />
          <Route path="owners" element={<OwnerList/>} />
          <Route path="venue-list/:ownerId" element={<VenuesList/>} />
          <Route path="booking-history/:userId" element={<AdminBookingHistory/>} />
        </Route>
        </Route>
      <Route path="*" element={<ErrorPAge />} />
      </Routes>
    </Suspense>
  );
};

