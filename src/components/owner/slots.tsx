import React, { useState } from "react";
import axiosInstance from '../../utils/axiosInstance';
import { OWNER_API } from '../../constants';
import showToast from "../../utils/toaster";
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios'; 

// Define the slot type
interface TimeSlot {
  label: string;
  startLabel: string;
}

const TimeSlotManager = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors: string[] = [];

    // Date and Time Validation
    const today = new Date().toISOString().split('T')[0];
    if (startDate <= today) {
      newErrors.push("Start date must be a future date.");
    }
    if (endDate <= startDate) {
      newErrors.push("End date must be after the start date.");
    }
    if (new Date(`${startDate}T${startTime}`) >= new Date(`${endDate}T${endTime}`)) {
      newErrors.push("End time must be greater than start time.");
    }

    // Price Validation
    Object.values(prices).forEach(price => {
      if (price <= 0) {
        newErrors.push("Price must be a positive number.");
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const generateTimeSlots = (startTime: string, endTime: string): TimeSlot[] => {
    const options: TimeSlot[] = [];
    let [startHour, startMinute] = startTime.split(":").map(Number);
    let [endHour, endMinute] = endTime.split(":").map(Number);

    const formatTime = (hour: number, minute: number) => {
      const period = hour < 12 ? "AM" : "PM";
      const formattedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      return `${formattedHour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;
    };

    while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
      let nextHour = startHour + 1;
      let nextMinute = startMinute;
      if (nextMinute >= 60) {
        nextHour += 1;
        nextMinute -= 60;
      }

      const startLabel = formatTime(startHour, startMinute);
      const endLabel = formatTime(nextHour, nextMinute);
      const label = `${startLabel} - ${endLabel}`;
      options.push({ label, startLabel });

      startHour = nextHour;
      startMinute = nextMinute;
    }

    return options;
  };

  const handleGenerateSlots = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const slots = generateTimeSlots(startTime, endTime);
      setTimeSlots(slots);
      setPrices({});
    }
  };

  const handlePriceChange = (slotStartLabel: string, price: string) => {
    setPrices({ ...prices, [slotStartLabel]: Number(price) });
  };

  const { venueId } = useParams<{ venueId: string }>();

  const resetForm = () => {
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setTimeSlots([]);
    setPrices({});
    setErrors([]);
  };

  const handleSaveSlots = async () => {
    if (!validateForm()) return; // Stop if validation fails

    try {
      const slotsToSave = timeSlots.map((slot) => ({
        time: slot.label,
        price: prices[slot.startLabel] || 0,
      }));

      const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, {
        startDate,
        endDate,
        slots: slotsToSave,
      });

      showToast("Slots saved successfully", "success");
      console.log("API Response:", response.data);
      resetForm();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Error response:', error.response?.data);
        showToast(`Error: ${error.response?.data?.message || 'An unknown error occurred'}`, "error");
      } else if (error instanceof Error) {
        console.error('Error message:', error.message);
        showToast(`Error: ${error.message}`, "error");
      } else {
        console.error('Unexpected error:', error);
        showToast('An unexpected error occurred.', "error");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 pt-12">
      {/* Left Card - Slot Generation Form */}
      <div className="p-4 bg-white shadow-md rounded-lg border h-[500px] mt-12">
        <h2 className="text-xl font-semibold mb-4">Generate Time Slots</h2>
        <form onSubmit={handleGenerateSlots} className="space-y-3">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 p-2 w-full border rounded-lg"
              required
            />
          </div>

          {/* Generate Slots Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg"
          >
            Generate Slots
          </button>
        </form>
        {errors.length > 0 && (
          <div className="mt-4 text-red-600">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Card - Display Generated Slots */}
      <div className="p-4 bg-white shadow-md rounded-lg border h-[500px] mt-12">
        <h2 className="text-xl font-semibold mb-4">Generated Time Slots</h2>
        {timeSlots.length > 0 ? (
          <>
            <div className="overflow-y-auto h-[330px] space-y-2 mb-4">
              {timeSlots.map((slot) => (
                <div
                  key={slot.startLabel}
                  className="flex justify-between items-center border p-2 rounded-lg"
                >
                  <span>{slot.label}</span>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={prices[slot.startLabel] || ""}
                    onChange={(e) => handlePriceChange(slot.startLabel, e.target.value)}
                    className="p-2 w-28 border rounded-lg"
                  />
                </div>
              ))}
            </div>
            {/* Save Slots Button */}
            <button
              onClick={handleSaveSlots}
              className="w-full bg-green-600 text-white p-2 rounded-lg"
            >
              Save Slots
            </button>
          </>
        ) : (
          <p className="text-gray-600">No slots generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default TimeSlotManager;
``







// // // import React, { useState, useEffect } from 'react';
// // // import { useFormik, FormikErrors } from 'formik';
// // // import * as Yup from 'yup';
// // // import axiosInstance from '../../utils/axiosInstance';
// // // import { OWNER_API } from '../../constants';
// // // import { useParams } from 'react-router-dom';
// // // import showToast from '../../utils/toaster';
// // // import { Trash } from 'lucide-react';

// // // interface TimeSlot {
// // //   startTime: string;
// // //   endTime: string;
// // //   booked: boolean;
// // //   price: string;
// // // }

// // // interface FormValues {
// // //   date: string;
// // //   timeSlots: TimeSlot[];
// // // }

// // // const TimeSlotManager: React.FC = () => {
// // //   const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([{ startTime: '', endTime: '', booked: false, price: '' }]);
// // //   const [uploadedSlots, setUploadedSlots] = useState<TimeSlot[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(false);
// // //   const [error, setError] = useState<string>('');
// // //   const [minDate, setMinDate] = useState<string>('');

// // //   const { venueId } = useParams<{ venueId: string }>();

// // //   useEffect(() => {
// // //     const today = new Date();
// // //     const formattedDate = today.toISOString().split('T')[0];
// // //     setMinDate(formattedDate);
// // //   }, []);

// // //   const formik = useFormik<FormValues>({
// // //     initialValues: {
// // //       date: '',
// // //       timeSlots: [{
// // //         startTime: '', endTime: '', price: '',
// // //         booked: false
// // //       }],
// // //     },
// // //     validationSchema: Yup.object({
// // //       date: Yup.date()
// // //         .required('Date is required')
// // //         .min(new Date(), 'Date must be today or in the future'),
// // //       timeSlots: Yup.array().of(
// // //         Yup.object({
// // //           startTime: Yup.string().required('Start time is required'),
// // //           endTime: Yup.string().required('End time is required'),
// // //           price: Yup.number()
// // //             .typeError('Price must be a number')
// // //             .positive('Price must be positive')
// // //             .required('Price is required'),
// // //         }).test('time-order', 'End time must be after start time', function (value) {
// // //           return value?.startTime < value?.endTime;
// // //         })
// // //       ),
// // //     }),
// // //     onSubmit: async (values, { resetForm }) => {
// // //       setLoading(true);
// // //       setError('');
// // //       try {
// // //         const response = await axiosInstance.post(`${OWNER_API}/add-slots/${venueId}`, { ...values });
// // //         resetForm();
// // //         setTimeSlots([{ startTime: '', endTime: '', booked: false, price: '' }]);
// // //         showToast('Time slot saved successfully!', 'success');
// // //         fetchUploadedSlots(values.date);
// // //       } catch (error) {
// // //         showToast('An error occurred while saving the time slot.', 'error');
// // //         //@ts-ignore
// // //         setError(error.response?.data?.message || 'An error occurred while saving the time slots.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     },
// // //   });

// // //   const handleTimeSlotChange = (index: number, field: string, value: string) => {
// // //     const newTimeSlots = [...timeSlots];
// // //     //@ts-ignore
// // //     newTimeSlots[index][field] = value;
// // //     setTimeSlots(newTimeSlots);
// // //     formik.setFieldValue('timeSlots', newTimeSlots);
// // //   };

// // //   const fetchUploadedSlots = async (date: string) => {
// // //     try {
// // //       const response = await axiosInstance.get(`${OWNER_API}/view-slots/${venueId}/${date}`);
// // //       setUploadedSlots(response.data.timeSlots);
// // //     } catch (error) {
// // //       console.error('Error fetching time slots:', error);
// // //       setUploadedSlots([]);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (formik.values.date) {
// // //       fetchUploadedSlots(formik.values.date);
// // //     }
// // //   }, [formik.values.date]);

// // //   const formatTime = (time: string) => {
// // //     const [hour, minute] = time.split(':');
// // //     const hourNum = parseInt(hour);
// // //     const ampm = hourNum >= 12 ? 'PM' : 'AM';
// // //     const formattedHour = hourNum % 12 || 12;
// // //     return `${formattedHour}:${minute} ${ampm}`;
// // //   };

// // //   const deleteTimeSlot = async (startTime: string, endTime: string) => {
// // //     setLoading(true);
// // //     setError('');
// // //     try {
// // //       const response = await axiosInstance.delete(`${OWNER_API}/delete-slot/${venueId}`, {
// // //         data: {
// // //           startTime,
// // //           endTime,
// // //           date: formik.values.date,
// // //         },
// // //       });
// // //       showToast('Time slot deleted successfully!', 'success');
// // //       fetchUploadedSlots(formik.values.date);
// // //     } catch (error) {
// // //       showToast('An error occurred while deleting the time slot.', 'error');
// // //       //@ts-ignore
// // //       setError(error.response?.data?.message || 'An error occurred while deleting the time slot.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-100 p-6 flex flex-col justify-center mt-12">
// // //       <div className="container mx-auto flex">
// // //         {/* Left Card - Slot Upload Form */}
// // //         <div className="w-1/2 bg-white rounded shadow-md p-8 mr-4">
// // //           <h2 className="text-2xl font-bold mb-4">Manage Time Slots</h2>
// // //           <form onSubmit={formik.handleSubmit}>
// // //             <div className="mb-4">
// // //               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
// // //                 Date
// // //               </label>
// // //               <input
// // //                 type="date"
// // //                 id="date"
// // //                 min={minDate}
// // //                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// // //                 {...formik.getFieldProps('date')}
// // //               />
// // //               {formik.touched.date && formik.errors.date ? (
// // //                 <div className="text-red-500 text-sm">{formik.errors.date}</div>
// // //               ) : null}
// // //             </div>
// // //             <div className="mb-4">
// // //               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeSlots">
// // //                 Time Slots
// // //               </label>
// // //               {timeSlots.map((slot, index) => (
// // //                 <div key={index} className="flex mb-2 space-x-2">
// // //                   <input
// // //                     type="time"
// // //                     className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// // //                     value={slot.startTime}
// // //                     onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
// // //                   />
// // //                   <input
// // //                     type="time"
// // //                     className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// // //                     value={slot.endTime}
// // //                     onChange={(e) => handleTimeSlotChange(index, 'endTime', e.target.value)}
// // //                   />
// // //                   <input
// // //                     type="number"
// // //                     placeholder="Enter Price"
// // //                     className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// // //                     value={slot.price}
// // //                     onChange={(e) => handleTimeSlotChange(index, 'price', e.target.value)}
// // //                   />
// // //                   {formik.touched.timeSlots && formik.errors.timeSlots && (formik.errors.timeSlots as FormikErrors<TimeSlot>[])[index]?.price ? (
// // //                     <div className="text-red-500 text-sm">{(formik.errors.timeSlots as FormikErrors<TimeSlot>[])[index]?.price}</div>
// // //                   ) : null}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //             <div className="flex items-center justify-between">
// // //               <button
// // //                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// // //                 type="submit"
// // //                 disabled={loading}
// // //               >
// // //                 {loading ? 'Saving...' : 'Save Time Slots'}
// // //               </button>
// // //             </div>
// // //             {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
// // //           </form>
// // //         </div>

// // //         {/* Right Card - Uploaded Slots */}
// // //         <div className="w-1/2 bg-white rounded shadow-md p-8">
// // //           <h2 className="text-2xl font-bold mb-4">Uploaded Slots</h2>
// // //           <ul className="space-y-2">
// // //             {uploadedSlots.length > 0 ? (
// // //               uploadedSlots.map((slot, index) => (
// // //                 <li
// // //                   key={index}
// // //                   className={`flex justify-between p-4 rounded-lg border ${slot.booked ? 'bg-red-200 border-red-300' : 'bg-green-200 border-green-300'} shadow-md`}
// // //                 >
// // //                   <span className="text-lg font-semibold">
// // //                     {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
// // //                   </span>
// // //                   <span className="text-lg font-semibold text-blue-600">
// // //                     ${slot.price}
// // //                   </span>
// // //                   {!slot.booked && (
// // //                     <button onClick={() => deleteTimeSlot(slot.startTime, slot.endTime)}>
// // //                       <Trash className="w-5 h-5 text-red-600 hover:text-red-800" />
// // //                     </button>
// // //                   )}
// // //                 </li>
// // //               ))
// // //             ) : (
// // //               <li className="text-gray-500">No time slots uploaded for the selected date.</li>
// // //             )}
// // //           </ul>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default TimeSlotManager;





