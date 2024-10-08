import { useEffect, useState } from 'react';

interface IUseWebSocketsProps {
    uri: string;
    onMessage: (event: MessageEvent) => void;
}

export const useWebSockets = ({ uri, onMessage }: IUseWebSocketsProps) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        if (!socket && uri && onMessage) {
            const socket = new WebSocket(uri);
            socket.binaryType = 'blob';

            socket.onopen = () => console.log('Connection established');
            socket.onclose = () => console.log('Connection lost');
            socket.onmessage = onMessage;

            setSocket(socket);
        }
    }, [onMessage, uri]);

    return { socket };
};
