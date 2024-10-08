import React, { JSX } from 'react';
import { Links } from '../Links';
import { Nodes } from '../Nodes';
import { useNetworkGraph } from '../../hooks/useNetworkGraph.ts';
import { INetworkLinkResponse } from '../../interfaces/INetworkLinkResponse.ts';
import { INetworkNodeResponse } from '../../interfaces/INetworkNodeResponse.ts';
import { Spinner } from '@fluentui/react';
import './styles.css';

interface INetworkGraphProps {
    networkLinks: INetworkLinkResponse[];
    networkNodes: INetworkNodeResponse[];
    width?: number;
    height?: number;
}

export const NetworkGraph: React.FC<INetworkGraphProps> = ({
    networkLinks,
    networkNodes,
    width = 1400,
    height = 600,
}): JSX.Element => {
    const { links, nodes, simulation, isLoading } = useNetworkGraph({
        networkLinks,
        networkNodes,
        width,
        height,
    });

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="container">
            <svg width={width} height={height} className="svg-root">
                <Links networkLinks={links} />
                <Nodes networkNodes={nodes} simulation={simulation} />
            </svg>
        </div>
    );
};
