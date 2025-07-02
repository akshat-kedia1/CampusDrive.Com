import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client'; //Client-side socket.io ka io() function le liya.

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);  //connection bana rahi hai backend socket server se 
const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, []);



    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;