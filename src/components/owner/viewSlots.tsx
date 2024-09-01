// // import React, { useState, useEffect } from 'react';
// // import axiosInstance from '../../utils/axiosInstance';
// // import { OWNER_API } from '../../constants';
// // import { useParams } from 'react-router-dom';
// // import showToast from '../../utils/toaster';
// // import { Trash } from 'lucide-react';

// // interface TimeSlot {
// //   startTime: string;
// //   endTime: string;
// //   price: string;
// // }

// // const UploadedSlotsView: React.FC = () => {
// //   const [uploadedSlots, setUploadedSlots] = useState<TimeSlot[]>([]);
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string>('');
// //   const { venueId } = useParams<{ venueId: string }>();

// //   useEffect(() => {
// //     fetchUploadedSlots();
// //   }, []);

// //   const fetchUploadedSlots = async () => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       const response = await axiosInstance.get(`${OWNER_API}/view-slots/${venueId}`);
// //       setUploadedSlots(response.data.timeSlots);
// //     } catch (error) {
// //       showToast('An error occurred while fetching uploaded slots.', 'error');
// //       //@ts-ignore
// //       setError(error.response?.data?.message || 'An error occurred while fetching uploaded slots.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const deleteUploadedTimeSlot = async (startTime: string, endTime: string) => {
// //     setLoading(true);
// //     setError('');
// //     try {
// //       const response = await axiosInstance.delete(`${OWNER_API}/delete-slot/${venueId}`, {
// //         data: {
// //           startTime,
// //           endTime,
// //         },
// //       });
// //       showToast('Time slot deleted successfully!', 'success');
// //       fetchUploadedSlots();
// //     } catch (error) {
// //       showToast('An error occurred while deleting the time slot.', 'error');
// //       //@ts-ignore
// //       setError(error.response?.data?.message || 'An error occurred while deleting the time slot.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       <div className="container mx-auto bg-white rounded shadow-md p-8">
// //         <h2 className="text-2xl font-bold mb-4">Uploaded Slots</h2>
// //         {loading ? (
// //           <div>Loading...</div>
// //         ) : error ? (
// //           <div className="text-red-500">{error}</div>
// //         ) : uploadedSlots.length > 0 ? (
// //           <div className="space-y-2">
// //             {uploadedSlots.map((slot, index) => (
// //               <div key={index} className="flex justify-between items-center mb-2 p-2 border rounded bg-gray-50">
// //                 <div>
// //                   <p>Start Time: {slot.startTime}</p>
// //                   <p>End Time: {slot.endTime}</p>
// //                   <p>Price: ${slot.price}</p>
// //                 </div>
// //                 <button
// //                   onClick={() => deleteUploadedTimeSlot(slot.startTime, slot.endTime)}
// //                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
// //                 >
// //                   <Trash size={16} />
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <p>No uploaded slots available.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default UploadedSlotsView;





// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import { OWNER_API } from '../../constants';
// import { useParams, useLocation } from 'react-router-dom';
// import showToast from '../../utils/toaster';
// import { Trash } from 'lucide-react';

// interface TimeSlot {
//   startTime: string;
//   endTime: string;
//   price: string;
// }

// const UploadedSlotsView: React.FC = () => {
//   const [uploadedSlots, setUploadedSlots] = useState<TimeSlot[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [selectedDate, setSelectedDate] = useState<string>('');
//   const { venueId } = useParams<{ venueId: string }>();
//   const location = useLocation();

//   useEffect(() => {
//     // Extract the date from the URL query parameters
//     const params = new URLSearchParams(location.search);
//     const date = params.get('date') || '';
//     setSelectedDate(date);
//     fetchUploadedSlots(date);
//   }, [location.search]);

//   const fetchUploadedSlots = async (date: string) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axiosInstance.get(`${OWNER_API}/view-slots/${venueId}`, {
//         params: { date }, // Pass date as a query parameter
//       });
//       setUploadedSlots(response.data.timeSlots);
//     } catch (error) {
//       showToast('An error occurred while fetching uploaded slots.', 'error');
//       //@ts-ignore
//       setError(error.response?.data?.message || 'An error occurred while fetching uploaded slots.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newDate = event.target.value;
//     setSelectedDate(newDate);
//     // Update the URL with the selected date
//     window.history.pushState({}, '', `?date=${newDate}`);
//     fetchUploadedSlots(newDate);
//   };

//   const deleteUploadedTimeSlot = async (startTime: string, endTime: string) => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axiosInstance.delete(`${OWNER_API}/delete-slot/${venueId}`, {
//         data: { startTime, endTime },
//       });
//       showToast('Time slot deleted successfully!', 'success');
//       fetchUploadedSlots(selectedDate);
//     } catch (error) {
//       showToast('An error occurred while deleting the time slot.', 'error');
//       //@ts-ignore
//       setError(error.response?.data?.message || 'An error occurred while deleting the time slot.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="container mx-auto bg-white rounded shadow-md p-8">
//         <h2 className="text-2xl font-bold mb-4">Uploaded Slots</h2>
//         <div className="mb-4">
//           <label htmlFor="datePicker" className="block text-gray-700">Select Date:</label>
//           <input
//             id="datePicker"
//             type="date"
//             value={selectedDate}
//             onChange={handleDateChange}
//             className="border border-gray-300 rounded p-2 w-full"
//           />
//         </div>
//         {loading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div className="text-red-500">{error}</div>
//         ) : uploadedSlots.length > 0 ? (
//           <div className="space-y-2">
//             {uploadedSlots.map((slot, index) => (
//               <div key={index} className="flex justify-between items-center mb-2 p-2 border rounded bg-gray-50">
//                 <div>
//                   <p>Start Time: {slot.startTime}</p>
//                   <p>End Time: {slot.endTime}</p>
//                   <p>Price: ${slot.price}</p>
//                 </div>
//                 <button
//                   onClick={() => deleteUploadedTimeSlot(slot.startTime, slot.endTime)}
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
//                 >
//                   <Trash size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No uploaded slots available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UploadedSlotsView;





import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { OWNER_API } from '../../constants';
import { useParams, useLocation } from 'react-router-dom';
import showToast from '../../utils/toaster';
import { Trash } from 'lucide-react';

interface TimeSlot {
  startTime: string;
  endTime: string;
  price: string;
}

const UploadedSlotsView: React.FC = () => {
  const [uploadedSlots, setUploadedSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { venueId } = useParams<{ venueId: string }>();
  const location = useLocation();

  useEffect(() => {
    // Extract the date from the URL query parameters
    const params = new URLSearchParams(location.search);
    const date = params.get('date') || '';
    setSelectedDate(date);
    fetchUploadedSlots(date);
  }, [location.search]);

  const fetchUploadedSlots = async (date: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get(`${OWNER_API}/view-slots/${venueId}`, {
        params: { date }, // Pass date as a query parameter
      });
      setUploadedSlots(response.data.timeSlots);
    } catch (error) {
      showToast('An error occurred while fetching uploaded slots.', 'error');
      //@ts-ignore
      setError(error.response?.data?.message || 'An error occurred while fetching uploaded slots.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    // Update the URL with the selected date
    window.history.pushState({}, '', `?date=${newDate}`);
    fetchUploadedSlots(newDate);
  };

  const deleteUploadedTimeSlot = async (startTime: string, endTime: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.delete(`${OWNER_API}/delete-slot/${venueId}`, {
        data: { date: selectedDate, startTime, endTime }, // Pass date along with startTime and endTime
      });
      showToast('Time slot deleted successfully!', 'success');
      fetchUploadedSlots(selectedDate);
    } catch (error) {
      showToast('An error occurred while deleting the time slot.', 'error');
      //@ts-ignore
      setError(error.response?.data?.message || 'An error occurred while deleting the time slot.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white rounded shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Uploaded Slots</h2>
        <div className="mb-4">
          <label htmlFor="datePicker" className="block text-gray-700">Select Date:</label>
          <input
            id="datePicker"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : uploadedSlots.length > 0 ? (
          <div className="space-y-2">
            {uploadedSlots.map((slot, index) => (
              <div key={index} className="flex justify-between items-center mb-2 p-2 border rounded bg-gray-50">
                <div>
                  <p>Start Time: {slot.startTime}</p>
                  <p>End Time: {slot.endTime}</p>
                  <p>Price: {slot.price}</p>
                </div>
                <button
                  onClick={() => deleteUploadedTimeSlot(slot.startTime, slot.endTime)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No uploaded slots available.</p>
        )}
      </div>
    </div>
  );
};

export default UploadedSlotsView;
