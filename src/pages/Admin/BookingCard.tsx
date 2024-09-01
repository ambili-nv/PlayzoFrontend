import React from 'react';

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

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const formatTime = (time: string) => {
    const [hourString, minute] = time.split(':');
    const hour = parseInt(hourString, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{booking.venueId.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
      <td className="px-6 py-4 whitespace-nowrap">{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.fees}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.paymentStatus}</td>
      <td className="px-6 py-4 whitespace-nowrap">{booking.bookingStatus}</td>
    </tr>
  );
};

export default BookingCard;
