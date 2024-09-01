import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import showToast from '../../utils/toaster';
import BookingCard from './BookingCard';
import { ADMIN_API } from '../../constants';
import axios from 'axios';

interface Booking {
  _id: string;
  venueId: {
    _id: string;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  fees: number;
  paymentStatus: string;
  bookingStatus: string;
}

interface BookingResponse {
  success: boolean;
  bookings: Booking[] | { bookings: Booking[] }; // Adjusted to handle both formats
  total: number;
}

const BookingHistory: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 5; // Number of items per page

  const fetchBookingHistory = async (page: number) => {
    try {
      const response = await axios.get<BookingResponse>(`${ADMIN_API}/bookings/user/${userId}`, {
        params: { page, limit: itemsPerPage }
      });

      console.log('API Response:', response.data); // Log entire response for debugging

      const bookingsData = response.data.bookings;

      if (Array.isArray(bookingsData)) {
        // bookingsData is an array
        setBookings(bookingsData);
      } else if (typeof bookingsData === 'object' && bookingsData.bookings) {
        // bookingsData is an object with a bookings property
        console.log(bookingsData.bookings);
        setBookings(bookingsData.bookings);
      } else {
        console.error('Invalid data format:', bookingsData);
        setError('Invalid data format');
        setBookings([]);
      }

      // Calculate total pages based on total items and items per page
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
    } catch (err) {
      console.error('Failed to fetch booking history:', err);
      showToast('Failed to fetch booking history',"error");
      setError('Failed to fetch booking history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingHistory(currentPage);
  }, [currentPage, userId]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Booking History</h1>
      {bookings.length === 0 ? (
        <div>No bookings found for this user.</div>
      ) : (
        <>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <BookingCard key={booking._id} booking={booking} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingHistory;















// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import showToast from '../../utils/toaster';
// import BookingCard from './BookingCard';
// import { ADMIN_API } from '../../constants';

// interface Booking {
//   _id: string;
//   venueId: {
//     _id: string;
//     name: string;
//   };
//   date: string;
//   startTime: string;
//   endTime: string;
//   fees: number;
//   paymentStatus: string;
//   bookingStatus: string;
// }

// interface BookingResponse {
//   success: boolean;
//   bookings: Booking[] | { bookings: Booking[] }; // Adjusted to handle both formats
//   total: number;
// }

// const BookingHistory: React.FC = () => {
//   const { userId } = useParams<{ userId: string }>();
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const itemsPerPage = 2; // Number of items per page

//   const fetchBookingHistory = async (page: number) => {
//     try {
//       const response = await axiosInstance.get<BookingResponse>(`${ADMIN_API}/bookings/user/${userId}`, {
//         params: { page, limit: itemsPerPage }
//       });

//       console.log('API Response:', response.data); // Log entire response for debugging

//       const bookingsData = response.data.bookings;

//       if (Array.isArray(bookingsData)) {
//         // bookingsData is an array
//         setBookings(bookingsData);
//       } else if (typeof bookingsData === 'object' && bookingsData.bookings) {
//         // bookingsData is an object with a bookings property
//         setBookings(bookingsData.bookings);
//       } else {
//         console.error('Invalid data format:', bookingsData);
//         setError('Invalid data format');
//         setBookings([]);
//       }

//       setTotalPages(Math.ceil(response.data.total / itemsPerPage));
//     } catch (err) {
//       console.error('Failed to fetch booking history:', err);
//       showToast('Failed to fetch booking history');
//       setError('Failed to fetch booking history');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookingHistory(currentPage);
//   }, [currentPage, userId]);

//   const handlePageChange = (page: number) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-20">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-20 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Booking History</h1>
//       {bookings.length === 0 ? (
//         <div>No bookings found for this user.</div>
//       ) : (
//         <>
//           <div className="overflow-x-auto mb-4">
//             <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {bookings.map((booking) => (
//                   <BookingCard key={booking._id} booking={booking} />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-between items-center">
//             <button
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               Previous
//             </button>
//             <span>Page {currentPage} of {totalPages}</span>
//             <button
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
//               disabled={currentPage === totalPages}
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default BookingHistory;


