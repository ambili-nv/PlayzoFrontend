// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { OWNER_API } from '../../constants';

// interface Venue {
//   name: string;
//   sportsitem: string;
//   place: string;
// }

// interface User {
//   name: string;
//   email: string;
// }

// interface Booking {
//   _id: string;
//   bookingId:string;
//   venueId: Venue;
//   date: string;
//   startTime: string;
//   endTime: string;
//   bookingStatus: string;
//   paymentStatus: string;
//   fees: number;
//   createdAt: string;
//   slotId: string;
//   userId: User;
// }

// const BookingDetailsPage: React.FC = () => {
//   const { bookingId } = useParams<{ bookingId: string }>();
//   const [booking, setBooking] = useState<Booking | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         if (bookingId) {
//           const response = await axiosInstance.get(`${OWNER_API}/booking-details/${bookingId}`);
//           setBooking(response.data.bookings);
//         }
//       } catch (error) {
//         console.error('Error fetching booking details:', error);
//       }
//     };

//     fetchBookingDetails();
//   }, [bookingId]);

//   const formatTime = (time: string) => {
//     const [hours, minutes] = time.split(':');
//     const intHours = parseInt(hours, 10);
//     const suffix = intHours >= 12 ? 'PM' : 'AM';
//     const formattedHours = intHours % 12 || 12;
//     return `${formattedHours}:${minutes} ${suffix}`;
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200 p-8">
//       <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
//         <h1 className="text-4xl font-bold mb-6 text-gray-800">Booking Details</h1>
//         {booking ? (
//           <div className="space-y-6">
//             <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//               <h2 className="text-2xl font-semibold mb-4 text-gray-700">Booking ID: {booking.bookingId}</h2>
//               <div className="space-y-4 text-gray-600">
//                 <div className="flex items-center">
//                   <span className="font-medium w-32">Name:</span>
//                   <span>{booking.userId.name}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium w-32">Email:</span>
//                   <span>{booking.userId.email}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium w-32">Venue:</span>
//                   <span>{booking.venueId.name}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium w-32">Sport:</span>
//                   <span>{booking.venueId.sportsitem}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium w-32">Location:</span>
//                   <span>{booking.venueId.place}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium w-32">Date:</span>
//                   <span>{booking.date}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium w-32">Time:</span>
//                   <span>{(booking.startTime)} - {(booking.endTime)}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium w-32">Booking Status:</span>
//                   <span>{booking.bookingStatus}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium w-32">Payment Status:</span>
//                   <span>{booking.paymentStatus}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium w-32">Price:</span>
//                   <span>{booking.fees.toFixed(2)}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <span className="font-medium w-32">Created At:</span>
//                   <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <button
//                 className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
//                 onClick={handleBack}
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-600">Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingDetailsPage;





import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { OWNER_API } from '../../constants';

interface Venue {
  name: string;
  sportsitem: string;
  place: string;
}

interface User {
  name: string;
  email: string;
}

interface Booking {
  _id: string;
  bookingId: string;
  venueId: Venue;
  date: string;
  startTime: string;
  endTime: string;
  bookingStatus: string;
  paymentStatus: string;
  fees: number;
  createdAt: string;
  slotId: string;
  userId: User;
}

const BookingDetailsPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (bookingId) {
          const response = await axiosInstance.get(`${OWNER_API}/booking-details/${bookingId}`);
          setBooking(response.data.bookings);
        }
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const intHours = parseInt(hours, 10);
    const suffix = intHours >= 12 ? 'PM' : 'AM';
    const formattedHours = intHours % 12 || 12;
    return `${formattedHours}:${minutes} ${suffix}`;
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200 p-4 md:p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4 md:p-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-800">Booking Details</h1>
        {booking ? (
          <div className="space-y-4 md:space-y-6">
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-gray-700">Booking ID: {booking.bookingId}</h2>
              <div className="space-y-2 md:space-y-4 text-gray-600">
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium w-full md:w-32">Name:</span>
                  <span>{booking.userId.name}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium w-full md:w-32">Email:</span>
                  <span>{booking.userId.email}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium w-full md:w-32">Venue:</span>
                  <span>{booking.venueId.name}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium w-full md:w-32">Sport:</span>
                  <span>{booking.venueId.sportsitem}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium w-full md:w-32">Location:</span>
                  <span>{booking.venueId.place}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium w-full md:w-32">Date:</span>
                  <span>{booking.date}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium w-full md:w-32">Time:</span>
                  <span>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium w-full md:w-32">Booking Status:</span>
                  <span>{booking.bookingStatus}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium w-full md:w-32">Payment Status:</span>
                  <span>{booking.paymentStatus}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium w-full md:w-32">Price:</span>
                  <span>{booking.fees.toFixed(2)}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="font-medium w-full md:w-32">Created At:</span>
                  <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsPage;
