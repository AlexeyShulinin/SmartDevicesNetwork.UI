import React from 'react';
import { INetworkLink } from '../../interfaces/INetworkLink.ts';
import { INetworkNode } from '../../interfaces/INetworkNode.ts';
import { Select } from '../Select';
import { useDeviceFilter } from '../../hooks/useDeviceFilter.ts';
import './styles.css';

interface IDeviceFilterProps {
    links: INetworkLink[];
    nodes: INetworkNode[];
    onFilterChange: (nodeIds: number[], links: INetworkLink[]) => void;
}

export const DeviceFilter: React.FC<IDeviceFilterProps> = ({
    links,
    nodes,
    onFilterChange,
}) => {
    const {
        statuses,
        types,
        selectedStatuses,
        selectedTypes,
        onStatusChange,
        onTypeChange,
    } = useDeviceFilter({ links, nodes, onFilterChange });

    return (
        <div className="flex-container">
            <div>
                <Select
                    label="Status"
                    options={statuses}
                    selectedValues={selectedStatuses}
                    onSelectChange={onStatusChange}
                />
            </div>
            <div>
                <Select
                    label="Type"
                    options={types}
                    selectedValues={selectedTypes}
                    onSelectChange={onTypeChange}
                />
            </div>
        </div>
    );
};
