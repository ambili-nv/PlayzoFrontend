import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Logo from '../../../assets/images/logo.png'
import { clearOwner } from '../../../redux/slice/ownerSlice';
import { useDispatch } from 'react-redux';
import showToast from '../../../utils/toaster';


const OwnerNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Function to handle logout
  const handleLogout = () => {
    dispatch(clearOwner());
    showToast("Logged out successfully", "success")
    navigate("/owner/login");
  };

  return (
    <nav className="bg-white dark:bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/owner/homepage" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:underline">
                  Home
                </Link>
                <Link to="/owner/bookings" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:underline">
                  Bookings
                </Link>
                <Link to="/owner/profile" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:underline">
                  Profile
                </Link>
                {/* <Link to="/logout" onClick={handleLogout} className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:underline">
                  Logout
                </Link> */}
                <button
                  onClick={handleLogout}
                  className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="text-gray-800 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${isNavOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/owner/homepage" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
            Home
          </Link>
          <Link to="/owner/bookings" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
            Bookings
          </Link>
          <Link to="/owner/profile" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
            Profile
          </Link>
          {/* <Link to="/logout" onClick={handleLogout} className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
            Logout
          </Link> */}
          <button
            onClick={handleLogout}
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default OwnerNavbar;
