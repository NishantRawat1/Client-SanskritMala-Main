import React from 'react';

const FullScreenButton = ({ onClick }) => {
  return (
    <button
      className="rpv-core__toolbar-item"
      onClick={onClick}
      title="Full Screen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 9v6a2 2 0 002 2h6m-6-2h6a2 2 0 002-2V9m-6 6V9m6 6V9M6 9h6M9 6v6M6 6h6"
        />
      </svg>
    </button>
  );
};

export default FullScreenButton;
