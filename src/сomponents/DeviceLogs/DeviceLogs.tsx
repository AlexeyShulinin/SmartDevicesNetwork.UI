import React from 'react';
import { useDeviceLogs } from '../../hooks/useDeviceLogs.ts';
import { DeviceLogsGrid } from '../DeviceLogsGrid';
import { Pagination } from '../Pagination';
import { Spinner } from '@fluentui/react';
import './styles.css';

interface IDeviceLogsProps {
    deviceId: number;
}

const PAGE_LIMIT = 5;

export const DeviceLogs: React.FC<IDeviceLogsProps> = ({ deviceId }) => {
    const { isLoading, deviceLogs, fetchNextPage } = useDeviceLogs({
        deviceId,
        limit: PAGE_LIMIT,
    });

    return (
        <>
            {isLoading && (
                <div className="loader-container">
                    <Spinner className="loader" size={3} />
                </div>
            )}
            {deviceLogs && (
                <>
                    <DeviceLogsGrid deviceLogs={deviceLogs} />
                    <Pagination
                        total={deviceLogs.total}
                        pageSize={PAGE_LIMIT}
                        page={deviceLogs.currentPage}
                        onClick={fetchNextPage}
                    />
                </>
            )}
        </>
    );
};
