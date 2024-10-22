import { Statuses } from './Statuses.ts';

export const STATUS_COLOR_MAP = {
    [Statuses.Online.toLowerCase()]: 'available',
    [Statuses.Offline.toLowerCase()]: 'offline',
    [Statuses.Reboot.toLowerCase()]: 'away',
    default: 'blocked',
};
