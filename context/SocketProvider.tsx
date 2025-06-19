'use client'
import React, { useCallback, useContext, useEffect } from "react";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error (`state is undefined`);

    return state;
};

export default function SocketProvider ({children}: SocketProviderProps) {
    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
        console.log("send message", msg);
    }, []);

    useEffect(() => {
        const socket = new WebSocket("http://localhost:8000");

        return (() => {
            socket.close();
        })
    }, [])

    return (
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    )
}