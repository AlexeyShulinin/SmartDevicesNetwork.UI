import * as d3 from 'd3';
import { INetworkLink } from '../interfaces/INetworkLink.ts';
import { INetworkNode } from '../interfaces/INetworkNode.ts';
import { useEffect, useMemo, useState } from 'react';
import { INetworkLinkResponse } from '../interfaces/INetworkLinkResponse.ts';
import { INetworkNodeResponse } from '../interfaces/INetworkNodeResponse.ts';

interface IUseNetworkGraphProps {
    networkLinks: INetworkLinkResponse[];
    networkNodes: INetworkNodeResponse[];
    width: number;
    height: number;
}

export const useNetworkGraph = ({
    networkLinks,
    networkNodes,
    width,
    height,
}: IUseNetworkGraphProps) => {
    const [links, setLinks] = useState<INetworkLink[]>([]);
    const [nodes, setNodes] = useState<INetworkNode[]>([]);
    const [simulation, setSimulation] =
        useState<d3.Simulation<INetworkNode, undefined>>();

    // TODO: Add alert to refresh if links were added/removed
    useEffect(() => {
        if (networkNodes?.length > 0) {
            setNodes((prevState) => [
                ...prevState.map((prevNodeState) => {
                    const currentNodeState =
                        networkNodes.find(
                            (node) => node.id === prevNodeState.id,
                        ) || {};
                    return {
                        ...prevNodeState,
                        ...currentNodeState,
                    };
                }),
            ]);
        }
    }, [networkNodes]);

    useEffect(() => {
        const mappedLinks: INetworkLink[] = networkLinks.map(
            (d) =>
                ({
                    ...d,
                }) as unknown,
        ) as INetworkLink[];
        const mappedNodes: INetworkNode[] = networkNodes.map(
            (d) =>
                ({
                    ...d,
                }) as INetworkNode,
        );

        const rootNode = mappedNodes.find(
            (x) => !mappedLinks.some((l) => l.target.id == x.id),
        );
        if (rootNode) {
            rootNode.x = 100;
            rootNode.y = -500;
        }

        // Create a simulation with several forces.
        const simulation = d3
            .forceSimulation(mappedNodes)
            .force(
                'link',
                d3
                    .forceLink(mappedLinks)
                    .id((d) => (d as INetworkNode).id)
                    .distance(150),
            )
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .on('tick', () => {
                setLinks([...mappedLinks]);

                const simulationNodes = simulation.nodes();
                setNodes((prevState) => {
                    if (!prevState?.length) {
                        return [...simulationNodes];
                    }
                    return [
                        ...prevState.map((prevNodeState) => {
                            const currentNodeState =
                                simulationNodes.find(
                                    (node) => node.id === prevNodeState.id,
                                ) || ({} as INetworkNode);
                            return {
                                ...prevNodeState,
                                x: currentNodeState.x,
                                y: currentNodeState.y,
                            };
                        }),
                    ];
                });
            });
        setSimulation(simulation);
    }, []);

    const isLoading = useMemo(
        () => links?.length == 0 || nodes?.length == 0,
        [links, nodes],
    );

    return {
        links,
        nodes,
        simulation,
        isLoading,
    };
};
