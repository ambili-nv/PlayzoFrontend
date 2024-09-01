import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Verified, Building, X } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path: string) => {
    setActiveLink(path);
    setIsSidebarOpen(false);
  };

  const linkClasses = (path: string) =>
    `flex items-center py-2 px-6 transition-colors duration-200 ${
      activeLink === path ? 'bg-green-700 rounded-tr-xl rounded-br-xl' : 'hover:bg-green-700 rounded-tr-xl rounded-br-xl'
    }`;

  return (
    <aside
      className={`fixed top-0 left-0 w-64 h-screen bg-green-500 text-white transition-transform transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between h-20 px-4">
        <h1 className="text-2xl font-bold">playZo</h1>
        <button onClick={() => setIsSidebarOpen(false)}>
          <X className="text-white" />
        </button>
      </div>
      <nav className="mt-10">
        <ul>
          <li className={linkClasses('/admin/dashboard')}>
            <Home className="mr-3" />
            <Link
              to="/admin/dashboard"
              className="text-white"
              onClick={() => handleLinkClick('/admin/dashboard')}
            >
              Dashboard
            </Link>
          </li>

          <li className={linkClasses('/admin/users')}>
            <Users className="mr-3" />
            <Link
              to="/admin/users"
              className="text-white"
              onClick={() => handleLinkClick('/admin/users')}
            >
              Users
            </Link>
          </li>
          <li className={linkClasses('/admin/owners')}>
            <Building className="mr-3" />
            <Link
              to="/admin/owners"
              className="text-white"
              onClick={() => handleLinkClick('/admin/owners')}
            >
              Owners
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
