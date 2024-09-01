import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import Navbar from '../../components/user/Header/Navbar';
import Footer from '../../components/user/Footer/footer';

const ContactUs: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4">
        <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-semibold mb-6 text-center">Contact Us</h1>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="w-6 h-6 text-gray-500" />
              <div>
                <h2 className="text-lg font-medium text-gray-900">Location</h2>
                <p className="text-gray-600">Kochi, Ernakulam, Kerala</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="w-6 h-6 text-gray-500" />
              <div>
                <h2 className="text-lg font-medium text-gray-900">Email</h2>
                <p className="text-gray-600">playzo@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="w-6 h-6 text-gray-500" />
              <div>
                <h2 className="text-lg font-medium text-gray-900">Phone</h2>
                <p className="text-gray-600">7289547136</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;







