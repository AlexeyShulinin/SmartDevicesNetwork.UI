import React, { JSX, useRef } from 'react';
import { Links } from '../Links';
import { Nodes } from '../Nodes';
import { useNetworkGraph } from '../../hooks/useNetworkGraph.ts';
import { INetworkLinkResponse } from '../../interfaces/INetworkLinkResponse.ts';
import { INetworkNodeResponse } from '../../interfaces/INetworkNodeResponse.ts';
import { Spinner } from '@fluentui/react';
import './styles.css';
import { DeviceFilter } from '../DeviceFilter';

interface INetworkGraphProps {
    networkLinks: INetworkLinkResponse[];
    networkNodes: INetworkNodeResponse[];
}

export const NetworkGraph: React.FC<INetworkGraphProps> = ({
    networkLinks,
    networkNodes,
}): JSX.Element => {
    const networkGraphRef = useRef<SVGSVGElement>(null);
    const {
        links,
        nodes,
        simulation,
        isLoading,
        filteredNodeIds,
        filteredLinks,
        onFilterChange,
    } = useNetworkGraph({
        networkLinks,
        networkNodes,
        width: networkGraphRef?.current?.clientWidth || 0,
        height: networkGraphRef?.current?.clientHeight || 0,
    });

    return (
        <div className="container">
            <div>
                <DeviceFilter
                    links={links}
                    nodes={nodes}
                    onFilterChange={onFilterChange}
                />
            </div>
            <svg className="svg-root" ref={networkGraphRef}>
                {isLoading ? (
                    <Spinner />
                ) : (
                    <>
                        <Links networkLinks={filteredLinks} />
                        <Nodes
                            networkNodes={nodes}
                            filteredNodeIds={filteredNodeIds}
                            simulation={simulation}
                        />
                    </>
                )}
            </svg>
        </div>
    );
};
