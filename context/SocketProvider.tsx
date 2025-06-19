'use client'
import React, { useCallback, useContext, useEffect, useState } from "react";

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
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
        console.log("send message", msg);
        if (socket) {
            socket.send(msg);
        }
    }, [socket]);

    useEffect(() => {
        const _socket = new WebSocket("http://localhost:8000");
        setSocket(_socket);
        return (() => {
            _socket.close();
            setSocket(null);
        })
    }, [])

    return (
        <SocketContext.Provider value={{sendMessage}}>
            {children}
        </SocketContext.Provider>
    )
}