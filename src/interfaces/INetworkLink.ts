import { INetworkNode } from './INetworkNode.ts';

export interface INetworkLink {
    index?: number;
    type: string;
    source: INetworkNode;
    target: INetworkNode;
}
