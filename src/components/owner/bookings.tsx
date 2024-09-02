import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { OWNER_API } from '../../constants';
import { useAppSelector } from '../../redux/store/store';
import { MessageSquare } from 'lucide-react';
import { CHAT_API } from '../../constants';
import { useNavigate } from 'react-router-dom';

type Booking = {
    _id: string;
    bookingStatus: string;
    createdAt: string;
    date: string;
    endTime: string;
    fees: number;
    paymentStatus: string;
    slotId: string;
    startTime: string;
    userId: { _id: string; name: string };
    venueId: { _id: string; name: string };
};

const BookingHistoryPage: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(6); 
    const [total, setTotal] = useState(0);
    const owner = useAppSelector((state) => state.ownerSlice);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                const ownerId = owner.id;
                const response = await axiosInstance.get<{ success: boolean; bookings: Booking[], total: number }>(
                    `${OWNER_API}/bookings/${ownerId}?page=${page}&limit=${limit}`
                );
                if (response.data.success) {
                    setBookings(response.data.bookings);
                    setTotal(response.data.total);
                } else {
                    console.error('Fetch bookings failed:', response.data);
                }
            } catch (error) {
                console.error('Error fetching booking history:', error);
            }
        };

        fetchBookingHistory();
    }, [page, limit]);

    const formatTime = (time: string) => {
        const [hourString, minute] = time.split(':');
        const hour = parseInt(hourString, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute} ${ampm}`;
    };

    const totalPages = Math.ceil(total / limit);

    const handleChat = (userId: string) => {
        axiosInstance
            .post(CHAT_API + '/conversations', {
                senderId: userId,
                recieverId: owner.id
            })
            .then(() => {
                navigate('/owner/chat');
            });
    };

    const handleViewDetails = (bookingId: string) => {
        navigate(`/owner/booking-details/${bookingId}`);
    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <h1 className="text-2xl font-semibold mb-6 text-center">Booking History</h1>
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Venue
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Time
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                                   Chat
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">
                                   View Details
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings?.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">{booking.userId?.name}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">{booking.venueId?.name}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">{booking.date}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 text-sm">{(booking.startTime)} to {(booking.endTime)}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <MessageSquare
                                            style={{ cursor: 'pointer', color: 'green' }}
                                            onClick={() => handleChat(booking.userId._id)}
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900"
                                            onClick={() => handleViewDetails(booking._id)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-center space-x-2">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">{page} of {totalPages}</span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingHistoryPage;
