// import React,{useEffect,useState,useRef} from "react";
// import { FiSend } from "react-icons/fi";
// import Conversation from "../../components/chat/owner/conversations";
// import Message from "../../components/chat/owner/messages";
// import { useAppSelector } from "../../redux/store/store";
// import { CHAT_API } from "../../constants";
// import { OWNER_API } from "../../constants";
// import axios from "axios";
// import OwnerNavbar from "../../components/owner/Header/OwnerNavbar";
// import { useSocket } from "../../context/socketContext";

// const OwnerChatUI: React.FC = () => {
//     const owner = useAppSelector((state)=>state.ownerSlice)

//     const [conversations, setConversations] = useState<any[]>([]);
//     const [currentChat, setCurrentChat] = useState<any | null>(null);
//     const [newMessage, setNewMessage] = useState<string>("");
//     const [messages, setMessages] = useState<any[]>([]);
//     const [receiverData, setReceiverData] = useState<any | null>(null);
//     const [arrivalMessage, setArrivalMessage] = useState<any>(null);
//     const scrollRef = useRef<HTMLDivElement>(null);
//     const socket = useSocket();



//     useEffect(() => {
//         socket?.on("getMessage", (data: any) => {
//           setArrivalMessage({
//             senderId: data.senderId,
//             text: data.text,
//             createdAt: Date.now(),
//           });
//         });

//         socket?.on("updateLastMessage", (data: any) => {
//             setConversations((prevConversations) => {
//               const updatedConversations = prevConversations.map((conversation) =>
//                 conversation._id === data.conversationId
//                   ? { ...conversation, lastMessage: data.lastMessage }
//                   : conversation
//               );
      
//               updatedConversations.sort(
//                 (a, b) =>
//                   new Date(b.lastMessage.createdAt).getTime() -
//                   new Date(a.lastMessage.createdAt).getTime()
//               );
      
//               return updatedConversations;
//             });
//           });
//         }, []);

//         useEffect(() => {
//             if (arrivalMessage) {
//               if (currentChat?.members.includes(arrivalMessage.senderId)) {
//                 setMessages((prev) => [...prev, arrivalMessage]);
//               }
//               setConversations((prevConversations) => {
//                 const updatedConversations = prevConversations.map((conversation) =>
//                   conversation._id === currentChat?._id
//                     ? { ...conversation, lastMessage: arrivalMessage }
//                     : conversation
//                 );
        
//                 updatedConversations.sort(
//                   (a, b) =>
//                     new Date(b.lastMessage.createdAt).getTime() -
//                     new Date(a.lastMessage.createdAt).getTime()
//                 );
        
//                 return updatedConversations;
//               });
//             }
//           }, [arrivalMessage, currentChat]);

//           useEffect(() => {
//             socket?.emit("addUser", owner.id);
//             socket?.on("getUsers", () => {});
//           }, [owner]);
    
    

//     useEffect(() => {
//         const getConversations = async () => {
//             try {
//                 const response = await axios.get(`${CHAT_API}/conversations/${owner.id}`);
//                 console.log(response.data,"res data conversation");
                
//                 const conversationData = response.data.chats;
//         const updatedConversations = await Promise.all(
//             conversationData.map(async (conversation: any) => {
//               const messagesResponse = await axios.get(
//                 `${CHAT_API}/messages/${conversation._id}`
//               );
//               const messages = messagesResponse.data.messages;
//               const lastMessage = messages[messages.length - 1];
//               return { ...conversation, lastMessage };
//             })
//           );
          
//           updatedConversations.sort(
//             (a, b) =>
//               new Date(b.lastMessage?.createdAt).getTime() -
//               new Date(a.lastMessage?.createdAt).getTime()
//           );
  
//           setConversations(updatedConversations);
//             } catch (error) {
//                 console.error("Error fetching conversations:", error);
//             }
//         };

//         getConversations();
//     }, [owner.id]);


//     useEffect(() => {
//         const getMessages = async () => {
//           if (!currentChat) return;
//           try {
//             const response = await axios.get(
//               `${CHAT_API}/messages/${currentChat._id}`
//             );
//             setMessages(response.data.messages);
//           } catch (error) {
//             console.error("Error fetching messages:", error);
//           }
//         };
//         getMessages();
//       }, [currentChat]);


// const handleConversationClick = async (conversation: any)=>{
//     setCurrentChat(conversation);

//     const id = conversation.members.find((member: any) => member !== owner.id);
//     console.log("Selected conversation ID:", id);

//     try {
//         const response = await axios.get(`${OWNER_API}/user/${id}`)
//         console.log(response.data,"ownerdetails in chat");
//         setReceiverData(response.data.user)
//     } catch (error) {
        
//     }

//     const lastMessageResponse = await axios.get(`${CHAT_API}/messages/${conversation._id}`)
//     console.log(lastMessageResponse.data);
//     const lastMessageData = lastMessageResponse.data.messages.slice(-1)[0];
//     setConversations((prevConversations) => {
//       const updatedConversations = prevConversations.map((conv) =>
//         conv._id === conversation._id
//           ? { ...conv, lastMessage: lastMessageData }
//           : conv
//       );
//       updatedConversations.sort(
//         (a, b) =>
//           new Date(b.lastMessage?.createdAt).getTime() -
//           new Date(a.lastMessage?.createdAt).getTime()
//       );

//       return updatedConversations;
//     });

// }


// const handleSubmit  = async (e: React.FormEvent)=>{
//     e.preventDefault();
//     const message = {
//       senderId: owner.id,
//       text: newMessage,
//       conversationId: currentChat?._id,
//     };

//     const receiverId = currentChat?.members.find(
//         (member: any) => member !== owner.id
//       );

//       console.log(receiverId,"1111111");
      
//       console.log(currentChat._id,"2222222");
      
//       socket?.emit("sendMessage", {
//         senderId: owner.id,
//         receiverId,
//         text: newMessage,
//         conversationId: currentChat?._id,
//       });

//       try {
//         const response = await axios.post(`${CHAT_API}/messages`, message);
//         console.log(response.data,"res data mesg post");
        
//         setMessages([...messages, response.data]);
//         setNewMessage("");
//   setConversations((prevConversations) => {
//     const updatedConversations = prevConversations.map((conversation) =>
//       conversation._id === currentChat?._id
//         ? { ...conversation, lastMessage: response.data }
//         : conversation
//     );

//     updatedConversations.sort(
//       (a, b) =>
//         new Date(b.lastMessage.createdAt).getTime() -
//         new Date(a.lastMessage.createdAt).getTime()
//     );

//     return updatedConversations;
//   });
//       } catch (error) {
//         console.error("Error sending message:", error);
//       }
// }

// useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);


//   return (
//     <>
//     <OwnerNavbar/>
//     <div className="flex flex-col h-screen pt-16"> {/* Add padding-top here */}
//     <div className="flex flex-1 overflow-hidden">
//     {/* <div className="h-screen flex flex-col lg:flex-row"> */}
//         {/* Chat Menu */}
//         <div className="w-full lg:w-1/4 bg-gray-200 border-r border-gray-300">
//             <div className="p-4 h-full flex flex-col">
//                 {conversations.length > 0 ? (
//                     conversations.map((conversation, index) => (
//                         <div
//                             key={index}
//                             onClick={() => handleConversationClick(conversation)}
//                         >
//                             <Conversation
//                                 conversation={conversation}
//                                 //@ts-ignore
//                                 lastMessage={conversation.lastMessage}
//                             />
//                         </div>
//                     ))
//                 ) : (
//                     <div className="flex justify-center items-center flex-grow">
//                         <p className="text-lg text-blue-900 font-bold mb-60">Conversation list is empty!</p>
//                     </div>
//                 )}
//             </div>
//         </div>

//         {/* Chat Box */}
//         <div className="w-full lg:w-3/4 flex flex-col bg-gray-100">
//             <div className="flex-1 overflow-y-scroll p-4 border-b border-gray-300">
//                 {!currentChat ? (
//                     <div className="text-center text-gray-400 text-xl mt-20">
//                         Open a chat to start the conversation..
//                     </div>
//                 ) : (
//                     <>
//                         {messages.map((message, index) => (
//                             <div key={index} ref={scrollRef}>
//                                 <Message
//                                     message={message}
//                                     own={message.senderId === owner.id}
//                                     receiverProfilePicture={receiverData?.profilePic}
//                                     receiverName={receiverData?.name}
//                                 />
//                             </div>
//                         ))}
//                     </>
//                 )}
//             </div>
//             {/* Message Input */}
//             <div className="bg-white p-4 border-t border-gray-300 flex items-center">
//                 <textarea
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none"
//                     placeholder="Write a message..."
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                     rows={2}
//                 ></textarea>
//                 <button className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
//                 onClick={handleSubmit}
//                 >
//                     <FiSend size={20} />
//                 </button>
//             </div>
//         </div>
//     </div>
//     </div>

//     </>
// );
// };

// export default OwnerChatUI;



import React,{useEffect,useState,useRef} from "react";
import { FiSend } from "react-icons/fi";
import Conversation from "../../components/chat/owner/conversations";
import Message from "../../components/chat/owner/messages";
import { useAppSelector } from "../../redux/store/store";
import { CHAT_API } from "../../constants";
import { OWNER_API } from "../../constants";
import axios from "axios";
import OwnerNavbar from "../../components/owner/Header/OwnerNavbar";
import { useSocket } from "../../context/socketContext";

const OwnerChatUI: React.FC = () => {
    const owner = useAppSelector((state)=>state.ownerSlice)

    const [conversations, setConversations] = useState<any[]>([]);
    const [currentChat, setCurrentChat] = useState<any | null>(null);
    const [newMessage, setNewMessage] = useState<string>("");
    const [messages, setMessages] = useState<any[]>([]);
    const [receiverData, setReceiverData] = useState<any | null>(null);
    const [arrivalMessage, setArrivalMessage] = useState<any>(null);
    const [unreadMessages, setUnreadMessages] = useState<{ [key: string]: number }>({});

    const scrollRef = useRef<HTMLDivElement>(null);
    const socket = useSocket();



    // useEffect(() => {
    //     socket?.on("getMessage", (data: any) => {
    //       setArrivalMessage({
    //         senderId: data.senderId,
    //         text: data.text,
    //         createdAt: Date.now(),
    //       });
    //     });

    //     socket?.on("updateLastMessage", (data: any) => {
    //         setConversations((prevConversations) => {
    //           const updatedConversations = prevConversations.map((conversation) =>
    //             conversation._id === data.conversationId
    //               ? { ...conversation, lastMessage: data.lastMessage }
    //               : conversation
    //           );
      
    //           updatedConversations.sort(
    //             (a, b) =>
    //               new Date(b.lastMessage.createdAt).getTime() -
    //               new Date(a.lastMessage.createdAt).getTime()
    //           );
      
    //           return updatedConversations;
    //         });
    //       });
    //     }, []);


    useEffect(() => {
      const handleMessage = (data: any) => {
        console.log("Message received:", data);
        setArrivalMessage({
          senderId: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
    
        if (currentChat && data.senderId !== owner.id) {
          setUnreadMessages((prevUnread) => ({
            ...prevUnread,
            [currentChat._id]: (prevUnread[currentChat._id] || 0) + 1,
          }));
        } else if (currentChat === null) {
          setUnreadMessages((prevUnread) => ({
            ...prevUnread,
            [data.conversationId]: (prevUnread[data.conversationId] || 0) + 1,
          }));
        }
      };
    
      const handleUpdateLastMessage = (data: any) => {
        setConversations((prevConversations) => {
          const updatedConversations = prevConversations.map((conversation) =>
            conversation._id === data.conversationId
              ? { ...conversation, lastMessage: data.lastMessage }
              : conversation
          );
    
          updatedConversations.sort(
            (a, b) =>
              new Date(b.lastMessage?.createdAt).getTime() -
              new Date(a.lastMessage?.createdAt).getTime()
          );
    
          return updatedConversations;
        });
      };
    
      socket?.on("getMessage", handleMessage);
      socket?.on("updateLastMessage", handleUpdateLastMessage);
    
      return () => {
        socket?.off("getMessage", handleMessage);
        socket?.off("updateLastMessage", handleUpdateLastMessage);
      };
    }, [socket, currentChat, owner.id]);




        useEffect(() => {
            if (arrivalMessage) {
              if (currentChat?.members.includes(arrivalMessage.senderId)) {
                setMessages((prev) => [...prev, arrivalMessage]);
              }
              setConversations((prevConversations) => {
                const updatedConversations = prevConversations.map((conversation) =>
                  conversation._id === currentChat?._id
                    ? { ...conversation, lastMessage: arrivalMessage }
                    : conversation
                );
        
                updatedConversations.sort(
                  (a, b) =>
                    new Date(b.lastMessage.createdAt).getTime() -
                    new Date(a.lastMessage.createdAt).getTime()
                );
        
                return updatedConversations;
              });
            }
          }, [arrivalMessage, currentChat]);

          useEffect(() => {
            socket?.emit("addUser", owner.id);
            socket?.on("getUsers", () => {});
          }, [owner]);
    
    

    useEffect(() => {
        const getConversations = async () => {
            try {
                const response = await axios.get(`${CHAT_API}/conversations/${owner.id}`);
                console.log(response.data,"res data conversation");
                
                const conversationData = response.data.chats;
        const updatedConversations = await Promise.all(
            conversationData.map(async (conversation: any) => {
              const messagesResponse = await axios.get(
                `${CHAT_API}/messages/${conversation._id}`
              );
              const messages = messagesResponse.data.messages;
              const lastMessage = messages[messages.length - 1];
              return { ...conversation, lastMessage };
            })
          );
          
          updatedConversations.sort(
            (a, b) =>
              new Date(b.lastMessage?.createdAt).getTime() -
              new Date(a.lastMessage?.createdAt).getTime()
          );
  
          setConversations(updatedConversations);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };

        getConversations();
    }, [owner.id]);


    useEffect(() => {
        const getMessages = async () => {
          if (!currentChat) return;
          try {
            const response = await axios.get(
              `${CHAT_API}/messages/${currentChat._id}`
            );
            setMessages(response.data.messages);
          } catch (error) {
            console.error("Error fetching messages:", error);
          }
        };
        getMessages();
      }, [currentChat]);


const handleConversationClick = async (conversation: any)=>{
    setCurrentChat(conversation);

    const id = conversation.members.find((member: any) => member !== owner.id);
    console.log("Selected conversation ID:", id);

    try {
        const response = await axios.get(`${OWNER_API}/user/${id}`)
        console.log(response.data,"ownerdetails in chat");
        setReceiverData(response.data.user)
    } catch (error) {
        
    }

    const lastMessageResponse = await axios.get(`${CHAT_API}/messages/${conversation._id}`)
    console.log(lastMessageResponse.data);
    const lastMessageData = lastMessageResponse.data.messages.slice(-1)[0];
    setConversations((prevConversations) => {
      const updatedConversations = prevConversations.map((conv) =>
        conv._id === conversation._id
          ? { ...conv, lastMessage: lastMessageData }
          : conv
      );
      updatedConversations.sort(
        (a, b) =>
          new Date(b.lastMessage?.createdAt).getTime() -
          new Date(a.lastMessage?.createdAt).getTime()
      );

      return updatedConversations;
    });

}


const handleSubmit  = async (e: React.FormEvent)=>{
    e.preventDefault();
    const message = {
      senderId: owner.id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members.find(
        (member: any) => member !== owner.id
      );

      console.log(receiverId,"1111111");
      
      console.log(currentChat._id,"2222222");
      
      socket?.emit("sendMessage", {
        senderId: owner.id,
        receiverId,
        text: newMessage,
        conversationId: currentChat?._id,
      });

      try {
        const response = await axios.post(`${CHAT_API}/messages`, message);
        console.log(response.data,"res data mesg post");
        
        setMessages([...messages, response.data]);
        setNewMessage("");
  setConversations((prevConversations) => {
    const updatedConversations = prevConversations.map((conversation) =>
      conversation._id === currentChat?._id
        ? { ...conversation, lastMessage: response.data }
        : conversation
    );

    updatedConversations.sort(
      (a, b) =>
        new Date(b.lastMessage.createdAt).getTime() -
        new Date(a.lastMessage.createdAt).getTime()
    );

    return updatedConversations;
  });
      } catch (error) {
        console.error("Error sending message:", error);
      }
}

useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <>
    <OwnerNavbar/>
    <div className="flex flex-col h-screen pt-16"> {/* Add padding-top here */}
    <div className="flex flex-1 overflow-hidden">
    {/* <div className="h-screen flex flex-col lg:flex-row"> */}
        {/* Chat Menu */}
        <div className="w-full lg:w-1/4 bg-gray-200 border-r border-gray-300">
            <div className="p-4 h-full flex flex-col">
                {conversations.map((conversation) => (
                  <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    currentChat={currentChat}
                    onClick={() => handleConversationClick(conversation)}
                    unreadMessages={unreadMessages[conversation._id] || 0}
                  />
                ))}
                
            </div>
        </div>

        {/* Chat Box */}
        <div className="w-full lg:w-3/4 flex flex-col bg-gray-100">
            <div className="flex-1 overflow-y-scroll p-4 border-b border-gray-300">
                {!currentChat ? (
                    <div className="text-center text-gray-400 text-xl mt-20">
                        Open a chat to start the conversation..
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <div key={index} ref={scrollRef}>
                                <Message
                                    message={message}
                                    own={message.senderId === owner.id}
                                    receiverProfilePicture={receiverData?.profilePic}
                                    receiverName={receiverData?.name}
                                />
                            </div>
                        ))}
                    </>
                )}
            </div>
            {/* Message Input */}
            <div className="bg-white p-4 border-t border-gray-300 flex items-center">
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none"
                    placeholder="Write a message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    rows={2}
                ></textarea>
                <button className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                onClick={handleSubmit}
                >
                    <FiSend size={20} />
                </button>
            </div>
        </div>
    </div>
    </div>

    </>
);
};

export default OwnerChatUI;
