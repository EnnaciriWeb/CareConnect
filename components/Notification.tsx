import React, { useEffect } from 'react';
import { NotificationType } from '../types';

interface NotificationProps {
  notification: NotificationType;
  onClose: (id: number) => void;
}

export const Notification: React.FC<NotificationProps> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  const bgColors = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  };

  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    info: 'fa-info-circle',
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 border-l-4 rounded shadow-lg animate-fade-in-down ${bgColors[notification.type]}`} role="alert">
      <i className={`fas ${icons[notification.type]} mr-3 text-xl`}></i>
      <div className="flex-1 mr-4">
        <p className="font-medium">{notification.message}</p>
      </div>
      <button onClick={() => onClose(notification.id)} className="opacity-50 hover:opacity-100 transition-opacity">
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};