// import React from 'react';
// import { Menu } from 'lucide-react';

// interface HeaderProps {
//   setIsSidebarOpen: (isOpen: boolean) => void;
// }

// const AdminHeader: React.FC<HeaderProps> = ({ setIsSidebarOpen }) => {
//   return (
//     <header className="bg-green-100 p-4 flex justify-between items-center">
//       <button onClick={() => setIsSidebarOpen(true)}>
//         <Menu className="text-green-700" />
//       </button>
//       <h1 className="text-3xl font-bold text-green-700">Venues</h1>
//     </header>
//   );
// };

// export default AdminHeader;




import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import Logo from '../../../assets/images/logo.png'
import { useDispatch } from 'react-redux';
import { clearAdmin } from '../../../redux/slice/adminSlice';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const AdminHeader: React.FC<HeaderProps> = ({ setIsSidebarOpen}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = ()=>{
    dispatch(clearAdmin());
    navigate("/admin/login");
  }

  return (
    <header className="bg-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu className="text-green-700" />
        </button>
        {/* Your logo image */}
        <img src={Logo} alt="Logo" className="h-8 w-auto pl-14" />
      </div>
      <button
       onClick={handleLogout}
       >
        <LogOut className="text-green-700" />
      </button>
    </header>
  );
};

export default AdminHeader;


