import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserInterface } from '../../types/UserInterface';
import { ADMIN_API } from '../../constants';
import showToast from '../../utils/toaster';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage] = useState(6); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(ADMIN_API + "/users", {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          params: {
            page: currentPage,
            limit: usersPerPage
          }
        });
        setUsers(response.data.users);
        setTotalUsers(response.data.totalUsers);
      } catch (error: any) {
        showToast('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const toggleBlockStatus = async (userId: string, isBlocked: boolean) => {
    try {
      await axios.patch(`${ADMIN_API}/block-user/${userId}`, { isBlocked: !isBlocked });
      setUsers(users.map(user => user._id === userId ? { ...user, isBlocked: !isBlocked } : user));
    } catch (error: any) {
      showToast('Failed to update user status');
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="flex justify-center mt-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === number ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Users List</h1>
      <div className="overflow-x-auto mt-4 shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">
              <th className="py-3 px-4 text-left border-b border-gray-200">Serial No</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Name</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Email</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Details</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Status</th>
              <th className="py-3 px-4 text-left border-b border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                <td className="py-3 px-4 border-b border-gray-200">{(currentPage - 1) * usersPerPage + index + 1}</td>
                <td className="py-3 px-4 border-b border-gray-200">{user.name}</td>
                <td className="py-3 px-4 border-b border-gray-200">{user.email}</td>
                <td
                  className="py-3 px-4 border-b border-gray-200 text-blue-600 cursor-pointer hover:text-blue-800"
                  onClick={() => navigate(`/admin/booking-history/${user._id}`)}
                >
                  View
                </td>
                <td className={`py-3 px-4 border-b border-gray-200 ${user.isBlocked ? 'text-red-600' : 'text-green-600'}`}>
                  {user.isBlocked ? 'Blocked' : 'Active'}
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button
                    className={`px-4 py-2 rounded-full text-white font-semibold shadow-md transition-all duration-300 ease-in-out ${user.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                    onClick={() => toggleBlockStatus(user._id, user.isBlocked)}
                  >
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renderPagination()}
    </main>
  );
};

export default UsersList;
