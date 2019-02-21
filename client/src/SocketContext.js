import React, { useRef, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function SocketProvider({ children }) {
  const socket = useRef(io());
  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const socket = useContext(SocketContext);
  return socket;
}
