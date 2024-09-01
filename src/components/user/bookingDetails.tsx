import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { USER_API } from '../../constants';
import ReviewForm from './Reviews/ReviewForm'; // Import the ReviewForm component
import showToast from '../../utils/toaster';

interface Venue {
  _id: string;
  name: string;
  sportsitem: string;
  place: string;
}

interface Booking {
  _id: string;
  bookingId:string;
  venueId: Venue;
  date: string;
  startTime: string;
  endTime: string;
  bookingStatus: string;
  paymentStatus: string;
  fees: number;
  createdAt: string;
  slotId: string;
  userId: string;
}

const BookingDetailsPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const navigate = useNavigate();
  const [canAddReview, setCanAddReview] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (bookingId) {
          const response = await axiosInstance.get(`${USER_API}/booking-details/${bookingId}`);
          setBooking(response.data.bookings);
          console.log(response.data.bookings,"mmmmm");
          
          // Check if the current time is after the end time of the booking slot
          const currentTime = new Date();
          const bookingEndTime = new Date(`${response.data.bookings.date}T${convertTo24HourFormat(response.data.bookings.endTime)}`);

          // Set whether the user can add a review
          if (currentTime > bookingEndTime) {
            setCanAddReview(true);
          }
        }
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  // Function to convert time with AM/PM to 24-hour format
  const convertTo24HourFormat = (time12h: string): string => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier.toUpperCase() === 'PM') {
      hours = (parseInt(hours, 10) + 12).toString();
    }

    return `${hours}:${minutes}`;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false); // Hide the review form after submission
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-200 p-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Booking Details</h1>
        {booking ? (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Booking ID: {booking.bookingId}</h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center">
                  <span className="font-medium w-32">Venue:</span>
                  <span>{booking.venueId.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">Sport:</span>
                  <span>{booking.venueId.sportsitem}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">Location:</span>
                  <span>{booking.venueId.place}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">Date:</span>
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">Time:</span>
                  <span>{booking.startTime} - {booking.endTime}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">Booking Status:</span>
                  <span>{booking.bookingStatus}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">Payment Status:</span>
                  <span>{booking.paymentStatus}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">Price:</span>
                  <span>{booking.fees.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-32">Created At:</span>
                  <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                onClick={handleBack}
              >
                Back
              </button>
              {canAddReview && (
                <button
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  {showReviewForm ? 'Cancel' : 'Add Review'}
                </button>
              )}
            </div>
            {showReviewForm && (
              <ReviewForm
                venueId={booking.venueId._id} // Pass the venueId from booking details
                onReviewSubmitted={handleReviewSubmitted}
              />
            )}
          </div>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsPage;
