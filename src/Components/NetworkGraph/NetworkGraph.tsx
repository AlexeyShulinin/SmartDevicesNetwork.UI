import React, { JSX } from 'react';
import { Links } from '../Links';
import { Nodes } from '../Nodes';
import { useNetworkGraph } from './useNetworkGraph.ts';
import { INetworkLinkResponse } from '../../interfaces/INetworkLinkResponse.ts';
import { INetworkNodeResponse } from '../../interfaces/INetworkNodeResponse.ts';

interface INetworkGraphProps {
    networkLinks: INetworkLinkResponse[];
    networkNodes: INetworkNodeResponse[];
    width?: number;
    height?: number;
}

const NetworkGraph: React.FC<INetworkGraphProps> = ({
    networkLinks,
    networkNodes,
    width = 1600,
    height = 800,
}): JSX.Element => {
    const { links, nodes, simulation } = useNetworkGraph({
        networkLinks,
        networkNodes,
        width,
        height,
    });

    if (links?.length == 0 || nodes?.length == 0) {
        return <>Loading...</>;
    }

    return (
        <svg width={width} height={height}>
            <Links networkLinks={links} />
            <Nodes networkNodes={nodes} simulation={simulation} />
        </svg>
    );
};

export default NetworkGraph;
