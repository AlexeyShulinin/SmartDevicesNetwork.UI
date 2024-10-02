import React, { JSX } from 'react';
import { Link } from '../Link';
import { INetworkLink } from '../../interfaces/INetworkLink.ts';

interface ILinksProps {
    networkLinks: INetworkLink[];
}

const Links: React.FC<ILinksProps> = ({ networkLinks }): JSX.Element => {
    return (
        <g id="links" stroke="#999">
            {networkLinks.map((networkLink) => {
                return (
                    <Link key={networkLink.index} networkLink={networkLink} />
                );
            })}
        </g>
    );
};

export default Links;
