import React, { JSX } from 'react';
import { INetworkNode } from '../../interfaces/INetworkNode.ts';
import { Node } from '../Node';
import * as d3 from 'd3';

interface INodesProps {
    networkNodes: INetworkNode[];
    simulation?: d3.Simulation<INetworkNode, undefined>;
}

const Nodes: React.FC<INodesProps> = ({
    networkNodes,
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
                    />
                );
            })}
        </g>
    );
};

export default Nodes;
