import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement);

import { ADMIN_API } from '../../constants';

const Dashboard = () => {
  const [venues, setVenues] = useState(0);
  const [users, setUsers] = useState(0);
  const [bookingCount, setBookingsCount] = useState(0);
  const [bookings, setBookings] = useState<any[]>([]);
  const [monthlyBookings, setMonthlyBookings] = useState<number[]>([]);
  const [yearlyBookings, setYearlyBookings] = useState<number[]>([]);
  const [selectedView, setSelectedView] = useState('monthly');
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axiosInstance.get(`${ADMIN_API}/venues`);
        setVenues(response.data.venueData.totalVenues);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`${ADMIN_API}/users`);
        setUsers(response.data.totalUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${ADMIN_API}/bookings`);
        if (response.data) {
          const bookingsData = response.data.bookingData.bookings;
          console.log(bookingsData,"bookings data");
          
          setBookingsCount(response.data.bookingData.totalBookings)
          setBookings(bookingsData);
          calculateMonthlyBookings(bookingsData);
          calculateYearlyBookings(bookingsData);
          // Sort bookings by date in descending order and slice the first 5
          //@ts-ignore
          const sortedBookings = bookingsData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
          setRecentBookings(sortedBookings);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };


    const calculateMonthlyBookings = (bookings: any[]) => {
      const monthlyBookings = new Array(12).fill(0);
      bookings.forEach((booking: { date: string | number | Date; }) => {
        const bookingDate = new Date(booking.date);
        const month = bookingDate.getMonth();
        monthlyBookings[month] += 1;
      });
      setMonthlyBookings(monthlyBookings);
    };

        const calculateYearlyBookings = (bookings: any[]) => {
      const yearlyBookings = new Array(5).fill(0); // Assuming data for the past 5 years
      bookings.forEach((booking: { date: string | number | Date; }) => {
        const bookingDate = new Date(booking.date);
        const year = bookingDate.getFullYear();
        const currentYear = new Date().getFullYear();
        const yearIndex = currentYear - year;
        if (yearIndex >= 0 && yearIndex < yearlyBookings.length) {
          yearlyBookings[yearIndex] += 1;
        }
      });
      setYearlyBookings(yearlyBookings);
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchVenues(), fetchUsers(), fetchBookings()]);
      } catch (error) {
        setError('Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    const lineChartData = {
    labels: selectedView === 'monthly' ? 
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] :
      new Array(5).fill(0).map((_, i) => `${new Date().getFullYear() - i}`),
    datasets: [
      {
        label: selectedView === 'monthly' ? 'Monthly Bookings' : 'Yearly Bookings',
        data: selectedView === 'monthly' ? monthlyBookings : yearlyBookings,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  // const doughnutChartData = {
  //   labels: ['Venues', 'Users', 'Bookings'],
  //   datasets: [
  //     {
  //       label: 'Total',
  //       data: [venues, users, bookingCount],
  //       backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(153,102,255,0.2)', 'rgba(255,159,64,0.2)'],
  //       borderColor: ['rgba(75,192,192,1)', 'rgba(153,102,255,1)', 'rgba(255,159,64,1)'],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 rounded-lg shadow-lg text-center text-white transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-2">Venues</h3>
          <p className="text-3xl font-bold">{venues}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg shadow-lg text-center text-white transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-2">Users</h3>
          <p className="text-3xl font-bold">{users}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-red-500 p-6 rounded-lg shadow-lg text-center text-white transition-transform transform hover:scale-105">
          <h3 className="text-xl font-semibold mb-2">Bookings</h3>
          <p className="text-3xl font-bold">{bookingCount}</p>
        </div>
      </div>



      <div className="mb-8 text-center">
          <button
          className={`px-4 py-2 mx-2 font-semibold ${selectedView === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedView('monthly')}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 mx-2 font-semibold ${selectedView === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedView('yearly')}
        >
          Yearly
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
          <h3 className="text-xl font-semibold mb-4">Monthly Bookings</h3>
          <div className="h-72">
            <Line data={lineChartData} />
          </div>
        </div>
        {/* <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
          <h3 className="text-xl font-semibold mb-4">Overall Distribution</h3>
          <div className="flex justify-center items-center h-72">
            <Doughnut data={doughnutChartData} />
          </div>
        </div> */}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h3 className="text-xl font-semibold mb-4">Recent Bookings</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sports</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.bookingId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.userId?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.venueId?.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.venueId.sportsitem}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.bookingStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.fees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
