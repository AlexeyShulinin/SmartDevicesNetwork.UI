import { IDeviceDetailsResponse } from './IDeviceDetailsResponse.ts';

export interface IDeviceResponse {
    id: number;
    name: string;
    type: string;
    status: string;
    lastActive: string;
    details: IDeviceDetailsResponse;
}
