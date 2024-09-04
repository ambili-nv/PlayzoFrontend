import React, { useState } from 'react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (location: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    if (location.trim()) {
      onSubmit(location.trim());
      onClose();
    } else {
      alert("Please enter a valid location.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Enter Your Location</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded-full text-white font-semibold shadow-md bg-blue-500 hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="ml-2 px-4 py-2 rounded-full text-gray-700 font-semibold shadow-md bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
