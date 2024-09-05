import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react'; 
import { RootState } from '../../../redux/reducer/reducer';
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../../redux/slice/userSlice";
import showToast from "../../../utils/toaster";
import logo from '../../../assets/images/logo.png'


const Navbar = () => {

  const user = useSelector((state: RootState) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    showToast("Logged out successfully", "success");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* <Link to="/" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:underline">
                  Home
                </Link> */}
                <Link to="/book" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:underline">
                  Book
                </Link>
                <Link to="/contact" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:underline">
                  Contact Us
                </Link>

                {user.isAuthenticated && user.role === "user" ? (
                  <>
                 <Link to="/user-profile" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:underline">
                 Profile
                 </Link>

                         <button
                          onClick={handleLogout}
                         className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                     >
                         Logout
                     </button>
                     </>
                ) : (
                  <span className="text-black dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:underline">
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                  /
                  <Link to="/signup" className="hover:underline">
                    Sign Up
                  </Link>
                </span>

                )}
                

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
          {/* <Link to="/" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
            Home
          </Link> */}
          <Link to="/book" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
            Book
          </Link>
          <Link to="/contact" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-black ">
            Contact Us
          </Link>
          {user.isAuthenticated && user.role === "user" ? (
                  <>
                 <Link to="/user-profile" className="text-blcak dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:underline">
                 Profile
                 </Link>

                         <button
                          onClick={handleLogout}
                         className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                     >
                         Logout
                     </button>
                     </>
                ) : (
                  <span className="text-black dark:text-black px-3 py-2 rounded-md text-sm font-medium hover:text-gray-700 hover:underline">
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                  /
                  <Link to="/signup" className="hover:underline">
                    Sign Up
                  </Link>
                </span>

                )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
