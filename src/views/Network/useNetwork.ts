import { useEffect, useState } from 'react';
import { INetworkResponse } from '../../interfaces/INetworkResponse.ts';

type UseNetworkReturnType = {
    network: INetworkResponse | null;
};

export const useNetwork = (): UseNetworkReturnType => {
    const [networkResponse, setNetworkResponse] =
        useState<INetworkResponse | null>(null);

    useEffect(() => {
        const socket = new WebSocket(`${import.meta.env.VITE_API_BASE_URL}/ws`);
        socket.binaryType = 'blob';

        socket.onopen = () => console.log('Connection established');
        socket.onclose = () => console.log('Connection lost');
        socket.onmessage = async (event) =>
            setNetworkResponse(JSON.parse(await event.data.text()));

        fetchNetwork();

        return () => {
            socket.close();
        };
    }, []);

    const fetchNetwork = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/network`)
            .then((response) => response.json())
            .then((result) => setNetworkResponse(result));
    };

    return {
        network: networkResponse,
    };
};
