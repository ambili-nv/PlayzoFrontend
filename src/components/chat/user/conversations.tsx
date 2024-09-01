// import React, { useEffect, useState } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import axios from "axios";
// import { USER_API } from "../../../constants";

// interface ConversationProps {
//   conversation: any;
//   currentChat: any;
//   onClick: () => void;
//   unreadMessages: number;
// }

// const Conversation: React.FC<ConversationProps> = ({
//   conversation,
//   currentChat,
//   onClick,
//   unreadMessages,
// }) => {
//   const isActive = currentChat?._id === conversation._id;

//   const [ownerData, setOwnerData] = useState<any>({});

//   useEffect(() => {
//     const fetchOwnerData = async () => {
//       try {
//         const ownerId = conversation.members[1];
//         console.log("Fetching owner data for ID:", ownerId);

//         const response = await axios.get(`${USER_API}/owner/${ownerId}`);
//         console.log("Owner data response:", response.data);

//         setOwnerData(response.data.owner);
//       } catch (error) {
//         console.error("Error fetching owner data:", error);
//       }
//     };

//     if (conversation.members.length > 1) {
//       fetchOwnerData();
//     }
//   }, [conversation]);

//   return (
//     <div
//       onClick={onClick}
//       className={`flex items-center p-2 cursor-pointer ${
//         isActive ? "bg-gray-200" : ""
//       }`}
//     >
//       <div className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300">
//         {ownerData?.profilePic ? (
//           <img
//             className="w-16 h-16 rounded-full object-cover shadow-md"
//             src={ownerData.profilePic}
//             alt="Owner Profile"
//           />
//         ) : (
//           <FaUserCircle size={48} className="text-gray-600" />
//         )}
//         <div className="ml-4 flex-1 relative">
//           <p className="font-semibold text-gray-800 text-lg">
//             {ownerData?.name ? ownerData.name : ownerData.name}
//           </p>
//           <p className="text-gray-500 text-sm mt-1 truncate">
//             {conversation.lastMessage?.text}
//           </p>
//         </div>
//       </div>

//       {!isActive && unreadMessages > 0 && (
//         <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
//           {unreadMessages}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Conversation;






import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { USER_API } from "../../../constants";

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

  const [ownerData, setOwnerData] = useState<any>({});

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const ownerId = conversation.members[1];
        console.log("Fetching owner data for ID:", ownerId);

        const response = await axios.get(`${USER_API}/owner/${ownerId}`);
        console.log("Owner data response:", response.data);

        setOwnerData(response.data.owner);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    if (conversation.members.length > 1) {
      fetchOwnerData();
    }
  }, [conversation]);

  return (
    <div
      onClick={onClick}
      className={`flex items-center p-2 cursor-pointer ${
        isActive ? "bg-gray-200" : ""
      } sm:p-3 md:p-4`}
    >
      <div className="flex items-center p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-300 sm:p-4 md:p-5">
        {ownerData?.profilePic ? (
          <img
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover shadow-md"
            src={ownerData.profilePic}
            alt="Owner Profile"
          />
        ) : (
          <FaUserCircle size={24} className="text-gray-600 sm:size-32 md:size-40" />
        )}
        <div className="ml-2 sm:ml-4 flex-1 relative">
          <p className="font-semibold text-gray-800 text-base sm:text-md md:text-l">
            {ownerData?.name ? ownerData.name : ownerData.name}
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">
            {conversation.lastMessage?.text}
          </p>
        </div>
      </div>

      {!isActive && unreadMessages > 0 && (
        <div className="bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm">
          {unreadMessages}
        </div>
      )}
    </div>
  );
};

export default Conversation;
