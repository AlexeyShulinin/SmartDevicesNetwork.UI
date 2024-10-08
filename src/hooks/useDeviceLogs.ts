import { useCallback, useEffect, useState } from 'react';
import { IDeviceLogsPagedRequest } from '../interfaces/IDeviceLogsPagedRequest.ts';
import { IPagedListResponse } from '../interfaces/IPagedListResponse.ts';
import { IDeviceLogsResponse } from '../interfaces/IDeviceLogsResponse.ts';
import camelize from 'camelize';

interface IDeviceLogsProps {
    deviceId: number;
    limit: number;
}

export const useDeviceLogs = ({ deviceId, limit }: IDeviceLogsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [deviceLogs, setDeviceLogs] =
        useState<IPagedListResponse<IDeviceLogsResponse> | null>(null);

    const fetchDeviceLogs = useCallback((request: IDeviceLogsPagedRequest) => {
        setIsLoading(true);
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/devices/${request.deviceId}/logs`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request.filter),
            },
        )
            .then((response) => response.json())
            .then((data) => camelize(data))
            .then((data) => setDeviceLogs(data))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (deviceId) {
            fetchDeviceLogs({
                deviceId: deviceId,
                filter: { page: 0, limit: 5 },
            });
        }
    }, [deviceId]);

    const fetchNextPage = (page: number) => {
        fetchDeviceLogs({
            deviceId: deviceId,
            filter: { page: page, limit: limit },
        });
    };

    return {
        isLoading,
        deviceLogs,
        fetchNextPage,
    };
};
