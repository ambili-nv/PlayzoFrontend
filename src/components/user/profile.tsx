import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { CHAT_API, USER_API } from '../../constants';
import { UserInterface } from '../../types/UserInterface';
import showToast from '../../utils/toaster';
import uploadImagesToCloudinary from '../../API/uploadImages';
import WalletPage from './wallet';
import axiosInstance from '../../utils/axiosInstance';
import { MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/store/store';

interface Booking {
  _id: string;
  id: string;
  venueId: {
    name: string;
    sportsitem: string;
    _id: string;
    place: string;
  };
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

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'editProfile' | 'bookingHistory' | 'wallet'>('editProfile');
  const [profile, setProfile] = useState<UserInterface | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  // const [ownerIds, setOwnerIds] = useState<Set<string>>(new Set());

  const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);


  const [ownerIds, setCurrentOwnerId] = useState<string | null>(null);
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          // console.log('No auth token found');
          throw new Error('No auth token found');
        }

        const response = await axios.get(`${USER_API}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile(response.data.user);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, []);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`${USER_API}/booking-history`, {
          params: {
            page: currentPage,
            limit: 5, // Number of bookings per page
          },
        });
  
        if (response.data && response.data.bookings) {
          setTotalPages(response.data.totalPages);

                    const sortedBookings = response.data.bookings.sort((a: Booking, b: Booking) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setBookings(sortedBookings);

          
          // Extract and save the current owner ID
          if (sortedBookings.length > 0) {
            const ownerId = sortedBookings[0].venueId.ownerId._id;
            setCurrentOwnerId(ownerId);
          }
        } else {
          console.log('No bookings found in response');
        
          // setBookings(response.data.bookings);
        }
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      }
    };
  
    fetchBookings();
  }, [currentPage]);
  


  const handleCancelBooking = async () => {
    if (!selectedBooking) return;

    try {
      const response = await axiosInstance.patch(
        `${USER_API}/cancel-booking/${selectedBooking._id}`,
        {
          fees: selectedBooking.fees,
          bookingStatus: 'cancelled'
        }
      );

      if (response.data.success) {
        setBookings(bookings.map(booking =>
          booking._id === selectedBooking._id ? { ...booking, bookingStatus: 'cancelled' } : booking
        ));
        showToast('Booking cancelled successfully', 'success');
      } else {
        showToast('Failed to cancel booking', 'error');
      }
    } catch (error) {
      console.error('Failed to cancel booking', error);
      //@ts-ignore
      const errorMessage = error.response?.data?.message || 'Failed to cancel booking';
      showToast(errorMessage, 'error');
    } finally {
      setShowModal(false);
      setSelectedBooking(null);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: profile?.name || '',
      email: profile?.email || ''
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const token = localStorage.getItem('access_token');
      if (!token) return;

      try {
        //@ts-ignore
        const profilePicUrl = await uploadImagesToCloudinary([profilePic]);

        const updatedProfileResponse = await axios.patch(`${USER_API}/edit-profile/`, {
          ...values,
          profilePic: profilePicUrl
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile(updatedProfileResponse.data.user);

        showToast('Profile updated successfully', 'success');
      } catch (error) {
        console.error('Failed to update profile', error);
        showToast('Failed to update profile', 'error');
      }
    }
  });

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setProfilePic(event.currentTarget.files[0]);
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl('');
      setProfilePic(null);
    }
  };


  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handleChat = () => {
    axiosInstance
      .post(CHAT_API + '/conversations', {
        senderId: user.id,
        recieverId: ownerIds
      })
    navigate('/user/chat')
  }

  const handleViewDetails = (bookingId: string) => {
    navigate(`/booking-details/${bookingId}`);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="w-full max-w-6xl flex space-x-6">
        <div className="w-1/3 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center pb-6">
            <h2 className="text-xl font-semibold">{profile?.name}</h2>
            <button
              className={`mt-2 px-4 py-2 rounded-lg ${activeTab === 'bookingHistory' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('bookingHistory')}>
              Booking History
            </button>
            <button
              className={`mt-2 px-4 py-2 rounded-lg ${activeTab === 'wallet' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('wallet')}>
              Wallet
            </button>
          </div>
          <div className="relative flex flex-col items-center">
            <img
              src={previewUrl || profile?.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
            <label
              htmlFor="profile-pic"
              className="absolute bottom-0 right-4 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
            >
              <input
                id="profile-pic"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
              Change
            </label>
          </div>
          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                disabled
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Save Changes
            </button>
          </form>
        </div>
        <div className="w-2/3">
          {activeTab === 'bookingHistory' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Booking History</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border-collapse">
                  <thead>
                    <tr>
                      {/* <th className="p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Booking ID</th> */}
                      <th className="p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Venue</th>
                      <th className="p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Sports</th>
                      <th className="p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                      <th className="p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Time</th>
                      <th className="p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                      <th className="p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">chat</th>
                      <th className="p-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">View Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length > 0 ? (
                      bookings.map((booking) => (
                        <tr key={booking._id}>
                          {/* <td className="p-3 border-b border-gray-200 text-sm text-gray-700">{booking._id}</td> */}
                          <td className="p-3 border-b border-gray-200 text-sm text-gray-700">{booking.venueId.name}</td>
                          <td className="p-3 border-b border-gray-200 text-sm text-gray-700">{booking.venueId.sportsitem}</td>
                          <td className="p-3 border-b border-gray-200 text-sm text-gray-700">{booking.date}</td>
                          <td className="p-3 border-b border-gray-200 text-sm text-gray-700">
                            {(booking.startTime)} - {(booking.endTime)}
                          </td>
                          <td className="p-3 border-b border-gray-200 text-sm text-gray-700">
                            {booking.bookingStatus === 'confirmed' && (
                              <button
                                onClick={() => {
                                  setShowModal(true);
                                  setSelectedBooking(booking);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                              >
                                Cancel
                              </button>
                            )}
                          </td>

                          <td className="py-2 px-4 border-b text-center">
                            <MessageSquare
                              style={{ cursor: 'pointer', color: 'green' }}
                              onClick={() => handleChat()}
                            />
                          </td>
                          <td className="p-3 border-b border-gray-200 text-sm text-gray-700">
                            <button
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => handleViewDetails(booking._id)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="p-3 border-b border-gray-200 text-sm text-gray-700">No bookings found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                  Previous
                </button>
                <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                  Next
                </button>
              </div>

            </div>
          )}
          {activeTab === 'wallet' && (
            <div>
              <WalletPage />
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg shadow-lg p-6 z-10">
            <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
            <p className="mb-4">Are you sure you want to cancel this booking?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2 hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleCancelBooking}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;



