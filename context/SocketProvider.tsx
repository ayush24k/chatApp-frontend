'use client'
import React, { useCallback, useContext, useEffect, useState } from "react";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
    messages: string[];
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error(`state is undefined`);

    return state;
};

export default function SocketProvider({ children }: SocketProviderProps) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    const sendMessage: ISocketContext['sendMessage'] = useCallback((msg) => {
        console.log("send message", msg);
        if (socket) {
            socket.send(msg);
        }
    }, [socket]);

    useEffect(() => {
        const _socket = new WebSocket(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000");
        setSocket(_socket);

        _socket.onmessage = (message) => {
            console.log('from server message recieved:', message.data);
            setMessages((prev) => [...prev, message.data]);
        }

        _socket.onclose = () => {
            console.log('WebSocket disconnected');
        };
        return (() => {
            _socket.close();
            setSocket(null);
            console.log("socket closed");
        })
    }, [])

    return (
        <SocketContext.Provider value={{ sendMessage, messages }}>
            {children}
        </SocketContext.Provider>
    )
}