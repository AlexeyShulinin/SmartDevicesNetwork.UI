import React from 'react';
import { IPagedListResponse } from '../../interfaces/IPagedListResponse.ts';
import { IDeviceLogsResponse } from '../../interfaces/IDeviceLogsResponse.ts';
import {
    DataGrid,
    DataGridBody,
    DataGridCell,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridRow,
} from '@fluentui/react-components';
import { columns } from './helpers/columns.tsx';

interface IDeviceLogsGridProps {
    deviceLogs: IPagedListResponse<IDeviceLogsResponse>;
}

export const DeviceLogsGrid: React.FC<IDeviceLogsGridProps> = ({
    deviceLogs,
}) => {
    return (
        <DataGrid items={deviceLogs.items} columns={columns} sortable>
            <DataGridHeader>
                <DataGridRow>
                    {({ renderHeaderCell }) => (
                        <DataGridHeaderCell>
                            {renderHeaderCell()}
                        </DataGridHeaderCell>
                    )}
                </DataGridRow>
            </DataGridHeader>
            <DataGridBody<IDeviceLogsGridProps>>
                {({ item, rowId }) => (
                    <DataGridRow<IDeviceLogsGridProps> key={rowId}>
                        {({ renderCell }) => (
                            <DataGridCell>{renderCell(item)}</DataGridCell>
                        )}
                    </DataGridRow>
                )}
            </DataGridBody>
        </DataGrid>
    );
};
