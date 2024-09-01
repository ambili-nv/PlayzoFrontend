// import React from "react";

// const Message: React.FC<{ message: any; own: boolean; receiverProfilePicture?: string; receiverName?: string }> = ({ message, own, receiverProfilePicture, receiverName }) => {
//     return (
//         <div className={`flex ${own ? "justify-end" : "justify-start"} items-start space-x-2`}>
//             {!own && (
//                 <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
//                     {/* Placeholder for receiver profile picture */}
//                     <img src={receiverProfilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
//                 </div>
//             )}
//             <div>
//                 {!own && <div className="font-semibold">{receiverName}</div>}
//                 <div className={`p-2 rounded-lg ${own ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
//                     {message.text}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Message;



import React from "react";
import { format } from "timeago.js";

interface MessageProps {
  message?: {
    text: string;
    createdAt: string;
  };
  own: boolean;
  receiverProfilePicture: string;
  receiverName: string;
}

const Message: React.FC<MessageProps> = ({
  message,
  own,
  receiverProfilePicture,
  receiverName,
}) => {
  return (
    <div className="message flex flex-col mt-8">
      {/* Fixed Profile Header */}
      <div className="fixed top-1  w-full    px-3 py-2 h-13 bg-gray-200 flex items-center justify-between ">
        <div className="flex items-center pt-12 mt-6">
          <img
            src={receiverProfilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-4"
          />
          <span className="text-xl font-bold">{receiverName}</span>
        </div>
      </div>

      {/* Message Bubble */}
      <div className={`flex ${own ? "justify-end" : "justify-start"} mt-8`}>
        <p
          className={`messageText p-2 rounded-lg ${
            own ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
        >
          {message?.text}
        </p>
      </div>

      {/* Timestamp */}
      <div className={` flex text-xs  ${own ? "justify-end" : "justify-start"}`}>
        {message?.createdAt ? format(message.createdAt) : ""}
      </div>
    </div>
  );
};

export default Message;

