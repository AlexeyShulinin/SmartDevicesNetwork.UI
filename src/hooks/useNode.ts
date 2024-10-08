import { INetworkNode } from '../interfaces/INetworkNode.ts';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { D3DragEvent } from 'd3';

interface IUseNodeProps {
    networkNode: INetworkNode;
    simulation?: d3.Simulation<INetworkNode, undefined>;
}

export const useNode = ({ networkNode, simulation }: IUseNodeProps) => {
    const nodeRef = useRef(null);

    function dragStarted(
        event: D3DragEvent<SVGSVGElement, INetworkNode, INetworkNode>,
    ) {
        if (!event.active && simulation) {
            simulation.alphaTarget(0.5).restart();
        }
        networkNode.fx = event.subject.x;
        networkNode.fy = event.subject.y;
    }

    function dragged(
        event: D3DragEvent<SVGSVGElement, INetworkNode, INetworkNode>,
    ) {
        networkNode.fx = event.x;
        networkNode.fy = event.y;
    }

    function dragEnded(
        event: D3DragEvent<SVGSVGElement, INetworkNode, INetworkNode>,
    ) {
        if (!event.active && simulation) {
            simulation.alphaTarget(0);
        }
        networkNode.fx = null;
        networkNode.fy = null;
    }

    useEffect(() => {
        if (nodeRef && nodeRef?.current) {
            d3.select<Element, unknown>(nodeRef.current).call(
                d3
                    .drag()
                    .on('start', dragStarted)
                    .on('drag', dragged)
                    .on('end', dragEnded),
            );
        }
    }, [nodeRef]);

    return {
        nodeRef,
    };
};
