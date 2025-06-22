import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification } from './Notification';

interface NotificationContextType {
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');

  const showNotification = useCallback((msg: string) => {
    setMessage(msg);
  }, []);

  const closeNotification = useCallback(() => {
    setMessage('');
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification message={message} onClose={closeNotification} />
    </NotificationContext.Provider>
  );
} 