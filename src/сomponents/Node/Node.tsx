import React, { JSX } from 'react';
import { INetworkNode } from '../../interfaces/INetworkNode.ts';
import * as d3 from 'd3';
import './styles.css';
import { useNode } from '../../hooks/useNode.ts';
import { NodeActions } from '../NodeActions';
import {
    Toast,
    Toaster,
    ToastIntent,
    ToastTitle,
    useId,
    useToastController,
} from '@fluentui/react-components';

interface INodeProps {
    networkNode: INetworkNode;
    simulation: d3.Simulation<INetworkNode, undefined> | null;
    visible: boolean;
}

export const Node: React.FC<INodeProps> = ({
    networkNode,
    simulation,
    visible,
}): JSX.Element => {
    const { nodeRef } = useNode({ networkNode, simulation });

    const toasterId = useId(`toaster_${networkNode.id}`);
    const { dispatchToast } = useToastController(toasterId);

    const onAlert = (intent: ToastIntent, message: string) => {
        dispatchToast(
            <Toast>
                <ToastTitle>{message}</ToastTitle>
            </Toast>,
            { intent },
        );
    };

    return (
        <>
            <Toaster toasterId={toasterId} />
            <g visibility={visible ? '' : 'hidden'}>
                <g
                    transform={`translate(${networkNode.x + 20}, ${networkNode.y - 20})`}>
                    <foreignObject x="100" y="-5" width="110" height="40">
                        <NodeActions
                            networkNode={networkNode}
                            onAlert={onAlert}
                        />
                    </foreignObject>
                </g>
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
                    <rect
                        x="10"
                        y="10"
                        width="225"
                        height="100"
                        stroke="black"
                    />
                    <foreignObject x="10" y="10" width="225" height="100">
                        <p style={{ margin: 0 }}>
                            <b>{`Status: ${networkNode.status}`}</b>
                        </p>
                        <p
                            style={{
                                margin: 0,
                            }}>{`Type: ${networkNode.type}`}</p>
                    </foreignObject>
                </g>
            </g>
        </>
    );
};
