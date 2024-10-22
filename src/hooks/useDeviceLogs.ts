import { useCallback, useEffect, useState } from 'react';
import { IDeviceLogsPagedRequest } from '../interfaces/IDeviceLogsPagedRequest.ts';
import { IPagedListResponse } from '../interfaces/IPagedListResponse.ts';
import { IDeviceLogsResponse } from '../interfaces/IDeviceLogsResponse.ts';
import camelize from 'camelize';

interface IDeviceLogsProps {
    deviceId: number;
    limit: number;
}

type UseDeviceLogsReturnType = {
    isLoading: boolean;
    deviceLogs: IPagedListResponse<IDeviceLogsResponse> | null;
    fetchNextPage: (page: number) => void;
};

export const useDeviceLogs = ({
    deviceId,
    limit,
}: IDeviceLogsProps): UseDeviceLogsReturnType => {
    const [isLoading, setIsLoading] = useState(false);
    const [deviceLogs, setDeviceLogs] =
        useState<IPagedListResponse<IDeviceLogsResponse> | null>(null);

    const fetchDeviceLogs = useCallback((request: IDeviceLogsPagedRequest) => {
        const getDeviceLogs = async () =>
            fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/devices/${request.deviceId}/logs`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(request.filter),
                },
            );

        setIsLoading(true);

        getDeviceLogs()
            .then((response) => response.json())
            .then((data) => camelize(data))
            .then((data) => setDeviceLogs(data))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!deviceId) {
            return;
        }

        fetchDeviceLogs({
            deviceId: deviceId,
            filter: { page: 0, limit: 5 },
        });
    }, [deviceId, fetchDeviceLogs]);

    const fetchNextPage = useCallback(
        (page: number) => {
            fetchDeviceLogs({
                deviceId: deviceId,
                filter: { page: page, limit: limit },
            });
        },
        [deviceId, fetchDeviceLogs, limit],
    );

    return {
        isLoading,
        deviceLogs,
        fetchNextPage,
    };
};
