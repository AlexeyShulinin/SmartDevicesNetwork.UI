import { INetworkNodeResponse } from './INetworkNodeResponse.ts';
import { INetworkLinkResponse } from './INetworkLinkResponse.ts';

export interface INetworkResponse {
    nodes: INetworkNodeResponse[];
    links: INetworkLinkResponse[];
}