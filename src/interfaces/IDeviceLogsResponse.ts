import { IBaseModelResponse } from './IBaseModelResponse.ts';

export interface IDeviceLogsResponse {
    device: IBaseModelResponse;
    timeStamp: string;
    message: string;
}
