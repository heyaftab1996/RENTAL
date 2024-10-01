// Modal.js
import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl w-full relative">
        <button
          className="absolute top-2 right-6 text-3xl text-gray-900 hover:text-gray-800 z-50 font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <div className="p-4 overflow-y-auto max-h-[90vh]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
