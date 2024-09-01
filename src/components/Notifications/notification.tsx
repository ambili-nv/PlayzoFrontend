// import React, { useEffect, useState } from 'react';
// import { useSocket } from '../../context/socketContext';

// const NotificationComponent: React.FC = () => {
//   const socket = useSocket();
//   const [notifications, setNotifications] = useState<any[]>([]);

//   useEffect(() => {
//     if (socket) {
//       // Listen for new notifications from the server
//       socket.on('newNotification', (notification: any) => {
//         console.log('Received new notification:', notification);
//         setNotifications((prevNotifications) => [
//           ...prevNotifications,
//           notification,
//         ]);
//       });

//       // Cleanup on component unmount
//       return () => {
//         socket.off('newNotification');
//       };
//     }
//   }, [socket]);

//   const handleClearNotifications = () => {
//     console.log('Clearing notifications');
//     // Emit event to clear notifications (if needed on server)
//     socket?.emit('clearNotifications', /* userId or other identifier */);

//     // Clear local notifications
//     setNotifications([]);
//   };

//   const handleNotificationClick = (notification: any) => {
//     console.log('Notification clicked:', notification);
//     // Handle notification click (e.g., open chat, mark as read)
//   };

//   return (
//     <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-96 p-4 bg-white border border-gray-300 shadow-xl rounded-lg z-50">
//       <button
//         className="absolute top-2 right-2 p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
//         onClick={handleClearNotifications}
//         aria-label="Clear All Notifications"
//       >
//         ×
//       </button>
//       {notifications.length === 0 ? (
//         <p className="text-center text-gray-500">No new notifications</p>
//       ) : (
//         <div className="space-y-3">
//           {notifications.map((notification, index) => (
//             <div
//               key={index}
//               className="flex items-center p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition duration-150 ease-in-out"
//               onClick={() => handleNotificationClick(notification)}
//             >
//               <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
//                 <span className="text-xl">🔔</span>
//               </div>
//               <div className="ml-3 flex-1">
//                 <p className="text-sm font-medium text-gray-800">{notification.text}</p>
//                 <span className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleTimeString()}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <button
//         className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
//         onClick={handleClearNotifications}
//         aria-label="Clear All Notifications"
//       >
//         Clear All
//       </button>
//     </div>
//   );
// };

// export default NotificationComponent;



import React, { useEffect, useState } from 'react';
import { useSocket } from '../../context/socketContext';

const NotificationComponent: React.FC = () => {
  const socket = useSocket();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (socket) {
      // Listen for new notifications from the server
      socket.on('newNotification', (notification: any) => {
        console.log('Received new notification:', notification);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          notification,
        ]);
      });

      // Cleanup on component unmount
      return () => {
        socket.off('newNotification');
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
    // Handle notification click (e.g., open chat, mark as read)
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

export default NotificationComponent;
