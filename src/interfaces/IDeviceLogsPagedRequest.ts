import { IPageFilterRequest } from './IPageFilterRequest.ts';

export interface IDeviceLogsPagedRequest {
    deviceId: number;
    filter: IPageFilterRequest;
}
