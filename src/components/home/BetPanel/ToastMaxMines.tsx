// Toast.tsx
import React, { useState, useEffect } from 'react';
import './BetPanel';

interface ToastMaxMines {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastMaxMines> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); 

    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    <div className="toast">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
