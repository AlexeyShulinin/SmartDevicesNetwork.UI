import { INetworkNode } from '../interfaces/INetworkNode.ts';
import * as d3 from 'd3';
import { MutableRefObject, useEffect, useRef } from 'react';
import { D3DragEvent } from 'd3';

interface IUseNodeProps {
    networkNode: INetworkNode;
    simulation: d3.Simulation<INetworkNode, undefined> | null;
}

type UseNodeReturnType = {
    nodeRef: MutableRefObject<null>;
};

export const useNode = ({
    networkNode,
    simulation,
}: IUseNodeProps): UseNodeReturnType => {
    const nodeRef = useRef(null);

    const dragStarted = (
        event: D3DragEvent<SVGSVGElement, INetworkNode, INetworkNode>,
    ) => {
        if (!event.active && simulation) {
            simulation.alphaTarget(0.5).restart();
        }

        networkNode.fx = event.subject.x;
        networkNode.fy = event.subject.y;
    };

    const dragged = (
        event: D3DragEvent<SVGSVGElement, INetworkNode, INetworkNode>,
    ) => {
        networkNode.fx = event.x;
        networkNode.fy = event.y;
    };

    const dragEnded = (
        event: D3DragEvent<SVGSVGElement, INetworkNode, INetworkNode>,
    ) => {
        if (!event.active && simulation) {
            simulation.alphaTarget(0);
        }

        networkNode.fx = null;
        networkNode.fy = null;
    };

    useEffect(() => {
        if (!nodeRef || !nodeRef?.current) {
            return;
        }

        d3.select<Element, unknown>(nodeRef.current).call(
            d3
                .drag()
                .on('start', dragStarted)
                .on('drag', dragged)
                .on('end', dragEnded),
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodeRef]);

    return {
        nodeRef,
    };
};
