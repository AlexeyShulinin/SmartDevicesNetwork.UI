import React, { JSX } from 'react';
import { INetworkNode } from '../../interfaces/INetworkNode.ts';
import { Node } from '../Node';
import * as d3 from 'd3';

interface INodesProps {
    networkNodes: INetworkNode[];
    filteredNodeIds: number[];
    simulation: d3.Simulation<INetworkNode, undefined> | null;
}

export const Nodes: React.FC<INodesProps> = ({
    networkNodes,
    filteredNodeIds,
    simulation,
}): JSX.Element => {
    return (
        <g id="nodes">
            {networkNodes.map((networkNode) => {
                return (
                    <Node
                        key={networkNode.id}
                        networkNode={networkNode}
                        simulation={simulation}
                        visible={filteredNodeIds.some(
                            (nodeId) => nodeId === networkNode.id,
                        )}
                    />
                );
            })}
        </g>
    );
};
