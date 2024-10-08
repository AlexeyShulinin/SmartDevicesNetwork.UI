import {
    createTableColumn,
    TableCellLayout,
    TableColumnDefinition,
} from '@fluentui/react-components';
import { IDeviceLogsResponse } from '../../../interfaces/IDeviceLogsResponse.ts';

export const columns: TableColumnDefinition<IDeviceLogsResponse>[] = [
    createTableColumn<IDeviceLogsResponse>({
        columnId: 'device',
        compare: (a, b) => {
            return a.device.name.localeCompare(b.device.name);
        },
        renderHeaderCell: () => {
            return 'Device Name';
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.device.name}</TableCellLayout>;
        },
    }),
    createTableColumn<IDeviceLogsResponse>({
        columnId: 'timestamp',
        compare: (a, b) => {
            return (
                new Date(a.timeStamp).getTime() -
                new Date(b.timeStamp).getTime()
            );
        },
        renderHeaderCell: () => {
            return 'Timestamp';
        },
        renderCell: (item) => {
            return (
                <TableCellLayout>
                    {new Date(item.timeStamp).toLocaleString('ru-ru')}
                </TableCellLayout>
            );
        },
    }),
    createTableColumn<IDeviceLogsResponse>({
        columnId: 'message',
        compare: (a, b) => {
            return a.message.localeCompare(b.message);
        },
        renderHeaderCell: () => {
            return 'Message';
        },
        renderCell: (item) => {
            return <TableCellLayout>{item.message}</TableCellLayout>;
        },
    }),
];
