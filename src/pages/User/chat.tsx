import React, { useEffect, useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
import Conversation from "../../components/chat/user/conversations";
import Message from "../../components/chat/user/messages";
import { useAppSelector } from "../../redux/store/store";
import axios from "axios";
import { CHAT_API, USER_API } from "../../constants";
import Navbar from "../../components/user/Header/Navbar";
import { useSocket } from "../../context/socketContext";

const ChatUI: React.FC = () => {
  const user = useAppSelector((state) => state.userSlice);

  const [conversations, setConversations] = useState<any[]>([]);
  const [currentChat, setCurrentChat] = useState<any | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [receiverData, setReceiverData] = useState<any | null>(null);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [unreadMessages, setUnreadMessages] = useState<{ [key: string]: number }>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = useSocket();



  useEffect(() => {
    const handleMessage = (data: any) => {
      console.log("Message received:", data);
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
  
      if (currentChat && data.senderId !== user.id) {
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
  }, [socket, currentChat, user.id]);
  

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
            new Date(b.lastMessage?.createdAt).getTime() -
            new Date(a.lastMessage?.createdAt).getTime()
        );

        return updatedConversations;
      });
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.emit("addUser", user.id);
    socket?.on("getUsers", (_users: any) => {});
  }, [user, socket]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(`${CHAT_API}/conversations/${user.id}`);
        console.log(response.data, "res data conversation");

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
  }, [user.id]);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) return;
      try {
        const response = await axios.get(
          `${CHAT_API}/messages/${currentChat._id}`
        );
        setMessages(response.data.messages);
        // Reset unread messages count when opening a chat
        setUnreadMessages((prevUnread) => ({
          ...prevUnread,
          [currentChat._id]: 0,
        }));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleConversationClick = async (conversation: any) => {
    setCurrentChat(conversation);

    // Fetch receiver details
    const ownerId = conversation.members.find((member: any) => member !== user.id);
    console.log("Selected conversation ID:", ownerId);
    console.log(conversation, "conversation");
    console.log(conversation._id, "conversation id");

    try {
      const response = await axios.get(`${USER_API}/owner/${ownerId}`);
      console.log(response.data, "owner details in chat");
      setReceiverData(response.data.owner);
    } catch (error) {
      console.error("Error fetching receiver details:", error);
    }

    const lastMessageResponse = await axios.get(`${CHAT_API}/messages/${conversation._id}`);
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

    // Reset unread messages count when opening a chat
    setUnreadMessages((prevUnread) => ({
      ...prevUnread,
      [conversation._id]: 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = {
      senderId: user.id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members.find(
      (member: any) => member !== user.id
    );

    console.log(receiverId, "1111111");

    console.log(currentChat._id, "2222222");

    socket?.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
      conversationId: currentChat?._id,
    });

    try {
      const response = await axios.post(`${CHAT_API}/messages`, message);
      console.log(response.data, "res data message post");

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
            new Date(b.lastMessage?.createdAt).getTime() -
            new Date(a.lastMessage?.createdAt).getTime()
        );

        return updatedConversations;
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen pt-16">
        <div className="flex flex-grow">
          <div className="w-full md:w-1/4 border-r border-gray-300">
            <div className="p-2">
              <h2 className="text-xl font-semibold">Conversations</h2>
              <div className="mt-2">
                
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
          </div>



          <div className="w-full lg:w-3/4 flex flex-col bg-gray-100 flex-grow">
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
                          own={message.senderId === user.id}
                          receiverProfilePicture={receiverData?.profilePic}
                          receiverName={receiverData?.name}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="p-4 border-t border-gray-300">
                <form onSubmit={handleSubmit} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Write a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                  >
                    <FiSend size={20} />
                  </button>
                </form>
              </div>
              </div>
        </div>
      </div>
    </>
  );
};

export default ChatUI;

