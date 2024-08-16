import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface PopupProps {
  message: string | null;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-10 right-6 mt-1 z-50">
      <div className="bg-gray-100 text-blue-600 border border-green-600 py-4 px-6 rounded-lg shadow-md min-h-[60px] flex items-center justify-center">
        {message}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
