/* eslint-disable react/prop-types */
import { useState } from 'react';
import { signOut } from 'firebase/auth';
 // Import your Firebase auth configuration
import { FaBell, FaShoppingCart, FaUser } from 'react-icons/fa';
import { auth } from '../Firebase/FireBaseService';

const Navbar = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

   console.log(user)
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <a href="/">LOGO</a>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-6 text-lg">
        <li><a href="/" className="hover:text-gray-400">Home</a></li>
        <li><a href="/man" className="hover:text-gray-400">Man</a></li>
        <li><a href="/women" className="hover:text-gray-400">Women</a></li>
        <li><a href="/coming-soon" className="hover:text-gray-400">Coming Soon</a></li>
      </ul>

      {/* User Icons */}
      <div className="flex items-center gap-4">
        <FaBell size={20} className="cursor-pointer hover:text-gray-400" />
        <FaShoppingCart size={20} className="cursor-pointer hover:text-gray-400" />

        {/* User Menu */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer border-l border-gray-600 pl-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaUser size={20} />
            <span>{user ? user.displayName : 'User'}</span>
          </div>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded shadow-lg py-2 z-50">
              {user ? (
                <>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-600"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Log In
                  </a>
                  <a
                    href="/register"
                    className="block px-4 py-2 hover:bg-gray-600"
                  >
                    Register
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
