import React, { useState } from 'react';

const SuccessMessage = ({ message }) => {
  const [showMessage, setShowMessage] = useState(true);

  const handleClose = () => {
    setShowMessage(false);
  };

  return (
    showMessage && (
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-md shadow-md animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">{message}</span>
          </div>
          <button
            className="text-green-500 hover:text-green-700 focus:outline-none"
            onClick={handleClose}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  );
};

export default SuccessMessage;
