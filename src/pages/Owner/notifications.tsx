





// import React, { useState, useEffect } from 'react';
// import OwnerNavbar from '../../components/owner/Header/OwnerNavbar';
// // import { useSocket } from '../../context/SocketProvider'; // Adjust the path as necessary
// import { useAppSelector } from '../../redux/store/store';
// import { useSocket } from '../../context/socketContext';
// import axios from 'axios';
// import { OWNER_API } from '../../constants';

// interface Notification {
//     _id: string;
//     message: string;
//     createdAt: string;
// }

// const Notifications = () => {
//     const [notifications, setNotifications] = useState<Notification[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const socket = useSocket();
//     const owner = useAppSelector((state) => state.ownerSlice);

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             setLoading(true);
//             try {
//                 // Assuming you have an API endpoint to fetch notifications
//                 // const response = await axios.get(`${OWNER_API}/notifications/${owner.id}`);
//                 // console.log("/////////");
                
//                 // setNotifications(response.data.notification);
//                 // console.log(response.data.notificaion
//                     // ,"////////////");
//             } catch (err) {
//                 setError('Failed to fetch notifications');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (owner?.id) {
//             fetchNotifications();
//         }

//         // Setup socket listener for real-time notifications
//         if (socket) {
//             socket.on('newBookingNotification', (notification: Notification) => {
//                 console.log('Notification received:', notification);

//                 setNotifications((prevNotifications) => [
//                     ...prevNotifications,
//                     notification,
//                 ]);
//             });

//             return () => {
//                 socket.off('newBookingNotification');
//             };
//         }
//     }, [owner, socket]);

//     if (loading) return <p className="text-gray-500">Loading notifications...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;

//     return (
//         <>
//             <OwnerNavbar />
//             {/* <div className="p-4 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto mt-12">
//                 <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
//                 {notifications.length === 0 ? (
//                     <p className="text-gray-600">No notifications</p>
//                 ) : (
//                     <ul className="space-y-2">
//                         {notifications.map((notification) => (
//                             <li key={notification._id} className="bg-white border border-gray-300 rounded-lg p-4 relative">
//                                 <p className="text-gray-800">{notification.message}</p>
//                                 <span className="text-xs text-gray-500 absolute bottom-2 right-2">
//                                     {new Date(notification.createdAt).toLocaleString()}
//                                 </span>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div> */}


// <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-96 p-4 bg-white border border-gray-300 shadow-xl rounded-lg z-50 mt-12">
//       {/* <button
//         className="absolute top-2 right-2 p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
//         onClick={handleClearNotifications}
//         aria-label="Clear All Notifications"
//       >
//         ×
//       </button> */}
//       <div className="space-y-3">
//         {notifications.map((notification, index) => (
//           <div
//             key={index}
//             className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
//             // onClick={() => handleNotificationClick(notification)}
//           >
//             <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
//               <span className="text-xl">🔔</span>
//             </div>
//             <div className="ml-3 flex-1">
//               <p className="text-sm font-medium text-gray-800">{notification.message}</p>
//               {/* <span className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleTimeString()}</span> */}
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* <button
//         className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
//         onClick={handleClearNotifications}
//         aria-label="Clear All Notifications"
//       >
//         Clear All
//       </button> */}
//     </div>
//         </>
//     );
// };

// export default Notifications;






// import React, { useState, useEffect } from 'react';
// import OwnerNavbar from '../../components/owner/Header/OwnerNavbar';
// import { useAppSelector } from '../../redux/store/store';
// import { useSocket } from '../../context/socketContext';
// import axios from 'axios';
// import { OWNER_API } from '../../constants';

// interface Notification {
//     _id: string;
//     message: string;
//     createdAt: string;
// }

// const Notifications = () => {
//     const [notifications, setNotifications] = useState<Notification[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const socket = useSocket();
//     const owner = useAppSelector((state) => state.ownerSlice);

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             setLoading(true);
//             try {
//                 // const response = await axios.get(`${OWNER_API}/notifications/${owner.id}`);
//                 // setNotifications(response.data.notification);
//             } catch (err) {
//                 setError('Failed to fetch notifications');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (owner?.id) {
//             fetchNotifications();
//         }

//         if (socket) {
//             // Listen for real-time booking notifications
//             socket.on('newBookingNotification', (notification) => {
//                 setNotifications((prevNotifications) => [
//                     ...prevNotifications,
//                     { 
//                         _id: notification.bookingId, 
//                         message: notification.text, 
//                         createdAt: notification.timestamp 
//                     },
//                 ]);
//             });

//             return () => {
//                 socket.off('newBookingNotification');
//             };
//         }
//     }, [owner, socket]);

//     if (loading) return <p className="text-gray-500">Loading notifications...</p>;
//     if (error) return <p className="text-red-500">{error}</p>;

//     return (
//         <>
//             <OwnerNavbar />
//             <div className="p-4 bg-gray-100 rounded-lg shadow-lg max-w-3xl mx-auto mt-12">
//                 <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
//                 {notifications.length === 0 ? (
//                     <p className="text-gray-600">No notifications</p>
//                 ) : (
//                     <ul className="space-y-2">
//                         {notifications.map((notification) => (
//                             <li key={notification._id} className="bg-white border border-gray-300 rounded-lg p-4 relative">
//                                 <p className="text-gray-800">{notification.message}</p>
//                                 <span className="text-xs text-gray-500 absolute bottom-2 right-2">
//                                     {new Date(notification.createdAt).toLocaleString()}
//                                 </span>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Notifications;



import React, { useEffect, useState } from 'react';
import { useSocket } from '../../context/socketContext';

const BookingNotification: React.FC = () => {
  const socket = useSocket();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (socket) {
      // Listen for booking notifications from the server
      socket.on('newBookingNotification', (notification: any) => {
        console.log('Received new booking notification:', notification);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notification,
        ]);
      });

      // Cleanup on component unmount
      return () => {
        socket.off('newBookingNotification');
      };
    }
  }, [socket]);

  const handleClearNotifications = () => {
    console.log('Clearing notifications');
    // Emit event to clear notifications (if needed on server)
    socket?.emit('clearNotifications');

    // Clear local notifications
    setNotifications([]);
  };

  const handleNotificationClick = (notification: any) => {
    console.log('Notification clicked:', notification);
    // Handle notification click (e.g., open booking details, mark as read)
  };

  // Only render the component if there are notifications
  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-96 p-4 bg-white border border-gray-300 shadow-xl rounded-lg z-50 mt-12">
      <button
        className="absolute top-2 right-2 p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
        onClick={handleClearNotifications}
        aria-label="Clear All Notifications"
      >
        ×
      </button>
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
            onClick={() => handleNotificationClick(notification)}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <span className="text-xl">🔔</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-800">{notification.text}</p>
              <span className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
        onClick={handleClearNotifications}
        aria-label="Clear All Notifications"
      >
        Clear All
      </button>
    </div>
  );
};

export default BookingNotification;
