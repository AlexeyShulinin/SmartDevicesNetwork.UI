import { useEffect, useState } from 'react';
import { INetworkResponse } from '../interfaces/INetworkResponse.ts';
import { useWebSockets } from './useWebSockets.ts';

type UseNetworkReturnType = {
    network: INetworkResponse | null;
};

export const useNetwork = (): UseNetworkReturnType => {
    const { socket } = useWebSockets({
        uri: `${import.meta.env.VITE_API_BASE_URL}/ws`,
        onMessage: onWebSocketMessage,
    });

    async function onWebSocketMessage(event: MessageEvent) {
        setNetworkResponse(JSON.parse(await event.data.text()));
    }

    const [networkResponse, setNetworkResponse] =
        useState<INetworkResponse | null>(null);

    useEffect(() => {
        fetchNetwork();

        function fetchNetwork() {
            fetch(`${import.meta.env.VITE_API_BASE_URL}/api/network`)
                .then((response) => response.json())
                .then((result) => setNetworkResponse(result));
        }

        return () => {
            socket?.close();
        };
    }, []);

    return {
        network: networkResponse,
    };
};
