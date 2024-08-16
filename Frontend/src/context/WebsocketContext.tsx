import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Define the shape of the WebSocket context
interface WebSocketContextType {
  socket: Socket | null;
}

// Create the WebSocket context with a default value
const WebSocketContext = createContext<WebSocketContextType>({ socket: null });

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize the WebSocket connection
    const socket: Socket = io('http://localhost:5001', { // Ensure this matches your server URL
      transports: ['websocket'],
      reconnectionAttempts: 5, // Number of reconnection attempts
      reconnectionDelay: 1000, // Delay between reconnections
      reconnectionDelayMax: 5000, // Maximum delay between reconnections
    });

    setSocket(socket);

    // Handle incoming notifications
    const handleNotification = (message: string) => {
      alert(message); // Replace with your notification handling logic
    };

    socket.on('notification', handleNotification);

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.off('notification', handleNotification);
      socket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use WebSocket context
export const useWebSocket = () => useContext(WebSocketContext);
