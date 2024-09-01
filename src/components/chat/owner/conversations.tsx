// import React,{useEffect,useState} from "react";
// import { OWNER_API } from "../../../constants";
// import { FaUserCircle } from "react-icons/fa";
// import axios from "axios";

// interface ConversationProps {
//     conversation: {
//       _id: string;
//       members: string[];
//       lastMessage: {
//         text: string;
//         createdAt: string;
//       };
//     };
//     lastMessage: {
//       text: string;
//     };
//   }

//   //@ts-ignore
// const Conversation: React.FC<{ conversation: any }> = ({ conversation,lastMessage }) => {
//     const [userData,setUserData] = useState<any>({})

//     useEffect(() => {
//         const fetchUserData = async () => {
//           try {
//             const userId = conversation.members[0];
//             console.log("Fetching User data for ID:", userId);
    
//             const response = await axios.get(`${OWNER_API}/user/${userId}`);
//             console.log("user data response:", response.data);
    
//             setUserData(response.data.user);
//           } catch (error) {
//             console.error("Error fetching user data:", error);
//           }
//         };
    
//         if (conversation.members.length > 1) {
//             fetchUserData();
//         }
//       }, [conversation]);
//       // console.log(ownerData,"ownerData//");


//       return (
//         <div className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300">
//           {userData?.profilePic ? (
//             <img
//               className="w-16 h-16 rounded-full object-cover shadow-md"
//               src={userData.profilePic}
//               alt="Owner Profile"
//             />
//           ) : (
//             <FaUserCircle size={48} className="text-gray-600" />
//           )}
//           <div className="ml-4 flex-1">
//             <p className="font-semibold text-gray-800 text-lg">
//               {userData?.name ? userData.name : `User ${conversation.members[1]}`}
//             </p>
//             <p className="text-gray-500 text-sm mt-1 truncate">
//               {conversation.lastMessage?.text}
//             </p>
//           </div>
//           <span className="text-gray-400 text-xs flex-shrink-0">
//             {new Date(conversation.lastMessage?.createdAt).toLocaleDateString()}
//           </span>
//         </div>
//       );
// };

// export default Conversation;


// import React,{useEffect,useState} from "react";
// import { OWNER_API } from "../../../constants";
// import { FaUserCircle } from "react-icons/fa";
// import axios from "axios";

// interface ConversationProps {
//   conversation: any;
//   currentChat: any;
//   onClick: () => void;
//   unreadMessages: number;
//   }

//   const Conversation: React.FC<ConversationProps> = ({
//     conversation,
//     currentChat,
//     onClick,
//     unreadMessages,
//   }) => {
//     const isActive = currentChat?._id === conversation._id;
  
//     const [userData, setUserData] = useState<any>({});



//     useEffect(() => {
//         const fetchUserData = async () => {
//           try {
//             const userId = conversation.members[0];
//             console.log("Fetching User data for ID:", userId);
    
//             const response = await axios.get(`${OWNER_API}/user/${userId}`);
//             console.log("user data response:", response.data);
    
//             setUserData(response.data.user);
//           } catch (error) {
//             console.error("Error fetching user data:", error);
//           }
//         };
    
//         if (conversation.members.length > 1) {
//             fetchUserData();
//         }
//       }, [conversation]);
//       // console.log(ownerData,"ownerData//");


//       return (

//         <div
//         onClick={onClick}
//         className={`flex items-center p-2 cursor-pointer ${
//           isActive ? "bg-gray-200" : ""
//         }`}
//       >

//         <div className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300">
//           {userData?.profilePic ? (
//             <img
//               className="w-16 h-16 rounded-full object-cover shadow-md"
//               src={userData.profilePic}
//               alt="Owner Profile"
//             />
//           ) : (
//             <FaUserCircle size={48} className="text-gray-600" />
//           )}
//         <div className="ml-4 flex-1 relative">
//           <p className="font-semibold text-gray-800 text-lg">
//             {userData?.name ? userData.name : userData.name}
//           </p>
//           <p className="text-gray-500 text-sm mt-1 truncate">
//             {conversation.lastMessage?.text}
//           </p>
//         </div>
//         </div>
        
//       {!isActive && unreadMessages > 0 && (
//         <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
//           {unreadMessages}
//         </div>
//       )}
//        </div>
//       );
// };

// export default Conversation;



import React, { useEffect, useState } from "react";
import { OWNER_API } from "../../../constants";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

interface ConversationProps {
  conversation: any;
  currentChat: any;
  onClick: () => void;
  unreadMessages: number;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  currentChat,
  onClick,
  unreadMessages,
}) => {
  const isActive = currentChat?._id === conversation._id;

  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = conversation.members[0];
        console.log("Fetching User data for ID:", userId);

        const response = await axios.get(`${OWNER_API}/user/${userId}`);
        console.log("user data response:", response.data);

        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (conversation.members.length > 1) {
      fetchUserData();
    }
  }, [conversation]);

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-2 cursor-pointer ${
        isActive ? "bg-gray-200" : ""
      }`}
    >
      <div className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300 w-full sm:w-auto">
        {userData?.profilePic ? (
          <img
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-md"
            src={userData.profilePic}
            alt="Owner Profile"
          />
        ) : (
          <FaUserCircle size={32} className="sm:size-48 text-gray-600" />
        )}
        <div className="ml-3 flex-1 relative">
          <p className="font-semibold text-gray-800 text-base sm:text-lg">
            {userData?.name ? userData.name : "Unknown User"}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">
            {conversation.lastMessage?.text || "No messages yet"}
          </p>
        </div>
      </div>

      {!isActive && unreadMessages > 0 && (
        <div className="bg-red-500 text-white rounded-full w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm">
          {unreadMessages}
        </div>
      )}
    </div>
  );
};

export default Conversation;
