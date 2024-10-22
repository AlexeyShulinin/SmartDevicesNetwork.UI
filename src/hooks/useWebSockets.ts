import { useEffect, useState } from 'react';

interface IUseWebSocketsProps {
    uri: string;
    onMessage: (event: MessageEvent) => void;
}

type UseWebSocketsReturnType = {
    socket: WebSocket | null;
};

export const useWebSockets = ({
    uri,
    onMessage,
}: IUseWebSocketsProps): UseWebSocketsReturnType => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        if (socket || !uri || !onMessage) {
            return;
        }

        const webSocket = new WebSocket(uri);
        webSocket.binaryType = 'blob';

        webSocket.onopen = () => console.log('Connection established');
        webSocket.onclose = () => console.log('Connection lost');
        webSocket.onmessage = onMessage;

        setSocket(webSocket);
    }, [onMessage, socket, uri]);

    return { socket };
};
