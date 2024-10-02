import React, { JSX } from 'react';
import { INetworkLink } from '../../interfaces/INetworkLink.ts';

interface ILinkProps {
    networkLink: INetworkLink;
}

const Link: React.FC<ILinkProps> = ({ networkLink }): JSX.Element => {
    return (
        <>
            <line
                id="link"
                strokeWidth="2px"
                x1={networkLink.source.x}
                y1={networkLink.source.y}
                x2={networkLink.target.x}
                y2={networkLink.target.y}
            />
            <text x={networkLink.target.x} y={networkLink.target.y - 20}>
                {networkLink.type}
            </text>
        </>
    );
};

export default Link;
