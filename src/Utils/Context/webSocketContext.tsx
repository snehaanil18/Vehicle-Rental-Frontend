"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

// Define the shape of the context
interface SocketContextProps {
  socket: Socket | null;
  notifications: Notification[];
}

interface Notification {
  message: string;
}

// Create the context
const SocketContext = createContext<SocketContextProps>({
  socket: null,
  notifications: [],
});

// Custom hook to use the socket context
export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

// Provider component to wrap your app
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    console.log('Initializing socket connection...'); 
    const newSocket = io('http://localhost:4000', { withCredentials: true });
    setSocket(newSocket);

    newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
    });

    // Listen for incoming notifications
    newSocket.on('notification', (data: Notification) => {
        console.log('Notification received:', data);
      setNotifications((prev) => [...prev, data]);
    });

    newSocket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};
