import React, { JSX } from 'react';
import { INetworkNode } from '../../interfaces/INetworkNode.ts';
import * as d3 from 'd3';
import './styles.css';
import { useNode } from './useNode.ts';

interface INodeProps {
    networkNode: INetworkNode;
    simulation?: d3.Simulation<INetworkNode, undefined>;
}

export const Node: React.FC<INodeProps> = ({
    networkNode,
    simulation,
}): JSX.Element => {
    const { nodeRef } = useNode({ networkNode, simulation });

    return (
        <g
            ref={nodeRef}
            id={`node_${networkNode.id}`}
            cx={networkNode.x}
            cy={networkNode.y}
            className={networkNode.status?.toLowerCase() ?? 'default'}
            transform={`translate(${networkNode.x}, ${networkNode.y})`}>
            <circle r={5} />
            <title>{`${networkNode.name}\nStatus:${networkNode.status}`}</title>
            <text x="8" y="0.31rem">
                {networkNode.name}
            </text>
            <rect x="10" y="10" width="100" height="75" stroke="black" />
            <foreignObject x="10" y="10" width="100" height="75">
                <p style={{ margin: 0 }}>
                    <b>{`Status: ${networkNode.status}`}</b>
                </p>
                <p style={{ margin: 0 }}>{`Type: ${networkNode.type}`}</p>
            </foreignObject>
        </g>
    );
};

export default Node;
