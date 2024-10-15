import { useEffect, useState } from 'react';
import { INetworkResponse } from '../interfaces/INetworkResponse.ts';
import { useWebSockets } from './useWebSockets.ts';

type UseNetworkReturnType = {
    network: INetworkResponse | null;
};

export const useNetwork = (): UseNetworkReturnType => {
    const [networkResponse, setNetworkResponse] =
        useState<INetworkResponse | null>(null);

    const { socket } = useWebSockets({
        uri: `${import.meta.env.VITE_API_BASE_URL}/ws`,
        onMessage: async (event: MessageEvent) => {
            setNetworkResponse(JSON.parse(await event.data.text()));
        },
    });

    useEffect(() => {
        function fetchNetwork() {
            fetch(`${import.meta.env.VITE_API_BASE_URL}/api/network`)
                .then((response) => response.json())
                .then((result) => setNetworkResponse(result));
        }

        fetchNetwork();

        return () => {
            socket?.close();
        };
    }, []);

    return {
        network: networkResponse,
    };
};
