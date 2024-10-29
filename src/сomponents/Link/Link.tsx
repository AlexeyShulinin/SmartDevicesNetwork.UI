import React, { JSX } from 'react';
import { INetworkLink } from '../../interfaces/INetworkLink.ts';
import './styles.css';

interface ILinkProps {
    networkLink: INetworkLink;
}

export const Link: React.FC<ILinkProps> = ({ networkLink }): JSX.Element => {
    return (
        <>
            <line
                id="link"
                strokeWidth="2px"
                className={networkLink.type}
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
