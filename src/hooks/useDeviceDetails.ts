import { useEffect, useState } from 'react';
import camelize from 'camelize';
import { IDeviceResponse } from '../interfaces/IDeviceResponse.ts';
import { STATUS_COLOR_MAP } from '../constants/StatusColorMapping.ts';

interface IDeviceDetailsProps {
    deviceId: number;
}

type colorTypes = 'blocked' | 'available' | 'offline' | 'away';

type UseDeviceDetailsReturnType = {
    isLoading: boolean;
    deviceDetails: IDeviceResponse | null;
    deviceStatus: colorTypes;
};

export const useDeviceDetails = ({
    deviceId,
}: IDeviceDetailsProps): UseDeviceDetailsReturnType => {
    const [isLoading, setIsLoading] = useState(false);
    const [deviceDetails, setDeviceDetails] = useState<IDeviceResponse | null>(
        null,
    );
    const [deviceStatus, setStatusBadgeColor] = useState<colorTypes>('blocked');

    useEffect(() => {
        const getDeviceDetails = async () =>
            fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/devices/${deviceId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

        setIsLoading(true);

        getDeviceDetails()
            .then((response) => response.json())
            .then((data) => camelize(data))
            .then((data) => setDeviceDetails(data))
            .finally(() => setIsLoading(false));
    }, [deviceId]);

    useEffect(() => {
        if (!deviceDetails) {
            return;
        }

        setStatusBadgeColor(
            (STATUS_COLOR_MAP[deviceDetails.status.toLowerCase()] ||
                STATUS_COLOR_MAP.default) as colorTypes,
        );
    }, [deviceDetails]);

    return { isLoading, deviceDetails, deviceStatus };
};
