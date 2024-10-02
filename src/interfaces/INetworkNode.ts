import { INetworkNodeResponse } from './INetworkNodeResponse.ts';

export interface INetworkNode extends INetworkNodeResponse {
    x: number;
    y: number;
    fx?: number | null;
    fy?: number | null;
}
