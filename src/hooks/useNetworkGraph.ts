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

type UseNetworkGraphReturnType = {
    links: INetworkLink[];
    nodes: INetworkNode[];
    simulation: d3.Simulation<INetworkNode, undefined> | null;
    isLoading: boolean;
    filteredLinks: INetworkLink[];
    filteredNodeIds: number[];
    onFilterChange: (nodeIds: number[], links: INetworkLink[]) => void;
};

export const useNetworkGraph = ({
    networkLinks,
    networkNodes,
    width,
    height,
}: IUseNetworkGraphProps): UseNetworkGraphReturnType => {
    const [links, setLinks] = useState<INetworkLink[]>([]);
    const [filteredLinks, setFilteredLinks] = useState<INetworkLink[]>([]);
    const [nodes, setNodes] = useState<INetworkNode[]>([]);
    const [filteredNodeIds, setFilteredNodeIds] = useState<number[]>([]);
    const [simulation, setSimulation] = useState<d3.Simulation<
        INetworkNode,
        undefined
    > | null>(null);

    useEffect(() => {
        if (!networkNodes?.length) {
            return;
        }

        setNodes((prevState) => [
            ...prevState.map((prevNodeState) => {
                const currentNodeState =
                    networkNodes.find((node) => node.id === prevNodeState.id) ||
                    {};
                return {
                    ...prevNodeState,
                    ...currentNodeState,
                };
            }),
        ]);
    }, [networkNodes]);

    useEffect(() => {
        if (!width || !height) {
            return;
        }

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
            rootNode.y = -200;
        }

        // Create a simulation with several forces.
        const simulation = d3
            .forceSimulation(mappedNodes)
            .force(
                'link',
                d3
                    .forceLink(mappedLinks)
                    .id((d) => (d as INetworkNode).id)
                    .distance(200),
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height]);

    const isLoading = useMemo(
        () => links?.length == 0 || nodes?.length == 0,
        [links, nodes],
    );

    const onFilterChange = (nodeIds: number[], links: INetworkLink[]) => {
        setFilteredNodeIds(nodeIds);
        setFilteredLinks(links);
    };

    return {
        links,
        nodes,
        simulation,
        isLoading,
        filteredLinks,
        filteredNodeIds,
        onFilterChange,
    };
};
