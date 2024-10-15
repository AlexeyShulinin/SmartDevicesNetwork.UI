import { useEffect, useState } from 'react';
import { INetworkLink } from '../interfaces/INetworkLink.ts';
import { INetworkNode } from '../interfaces/INetworkNode.ts';

interface IUseDeviceFilterProps {
    links: INetworkLink[];
    nodes: INetworkNode[];
    onFilterChange: (nodeIds: number[], links: INetworkLink[]) => void;
}

type UseDeviceFilterReturnType = {
    statuses: string[];
    types: string[];
    selectedStatuses: string[];
    selectedTypes: string[];
    onStatusChange: (statuses: string[]) => void;
    onTypeChange: (types: string[]) => void;
};

export const useDeviceFilter = ({
    links,
    nodes,
    onFilterChange,
}: IUseDeviceFilterProps): UseDeviceFilterReturnType => {
    const [statuses, setStatuses] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);

    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const mapDistinctValues = () => {
        setStatuses([...new Set(nodes.map((x) => x.status))]);
        setTypes([...new Set(nodes.map((x) => x.type))]);
    };

    useEffect(() => {
        if (!nodes?.length) {
            return;
        }

        mapDistinctValues();
        onFilterChange(
            nodes.map((x) => x.id),
            links,
        );
    }, [nodes]);

    useEffect(() => {
        let filteredNodes = nodes;

        if (selectedStatuses?.length) {
            filteredNodes = filteredNodes.filter((x) =>
                selectedStatuses.some((status) => x.status === status),
            );
        }

        if (selectedTypes?.length) {
            filteredNodes = filteredNodes.filter((x) =>
                selectedTypes.some((type) => x.type === type),
            );
        }

        const filteredLinks = links.filter((x) =>
            filteredNodes.some(
                (node) =>
                    x.target.id === node.id &&
                    filteredNodes.some((n) => n.id === x.source.id),
            ),
        );
        onFilterChange(
            filteredNodes.map((x) => x.id),
            filteredLinks,
        );
    }, [selectedTypes, selectedStatuses, nodes]);

    return {
        statuses,
        types,
        selectedStatuses,
        selectedTypes,
        onStatusChange: setSelectedStatuses,
        onTypeChange: setSelectedTypes,
    };
};
