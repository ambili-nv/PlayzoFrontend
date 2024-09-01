// BookingHistory.tsx

import React, { useEffect, useState } from 'react';

// Dummy booking data for testing purposes
const dummyBookings = [
  {
    id: 1,
    venueName: "Sports Arena 1",
    date: "2024-07-15",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: 50.00
  },
  {
    id: 2,
    venueName: "Football Field",
    date: "2024-07-16",
    startTime: "02:00 PM",
    endTime: "04:00 PM",
    status: "pending",
    paymentStatus: "pending",
    totalAmount: 80.00
  },
  {
    id: 3,
    venueName: "Tennis Court",
    date: "2024-07-17",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    status: "confirmed",
    paymentStatus: "paid",
    totalAmount: 30.00
  }
];

interface Booking {
  id: number;
  venueName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
}

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Simulate API call to fetch bookings
    setTimeout(() => {
      setBookings(dummyBookings);
    }, 1000); // Simulate loading delay for better UI experience
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Booking History</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map(booking => (
          <div key={booking.id} className="bg-white shadow-md rounded-md p-4">
            <p className="text-lg font-semibold mb-2">{booking.venueName}</p>
            <p className="text-gray-600 mb-2">{booking.date} | {booking.startTime} - {booking.endTime}</p>
            <p className="mb-2">Booking Status: {booking.status}</p>
            <p className="mb-2">Payment Status: {booking.paymentStatus}</p>
            <p className="font-semibold text-lg mb-2">${booking.totalAmount.toFixed(2)}</p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
              View Receipt
            </button>
            {/* Option to cancel booking if applicable */}
            {booking.status === 'pending' && (
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md ml-2">
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
