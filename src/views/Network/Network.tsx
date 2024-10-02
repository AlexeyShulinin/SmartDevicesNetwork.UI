import { JSX } from 'react';
import { useNetwork } from './useNetwork.ts';
import { NetworkGraph } from '../../Components/NetworkGraph';

export const Network = (): JSX.Element => {
    const { network } = useNetwork();

    console.log('Network', network);

    if (!network) {
        return <>Loading...</>;
    }

    return (
        <>
            <NetworkGraph
                networkNodes={network.nodes}
                networkLinks={network.links}
            />
        </>
    );
};
