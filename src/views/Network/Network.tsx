import { JSX } from 'react';
import { useNetwork } from '../../hooks/useNetwork.ts';
import { NetworkGraph } from '../../сomponents/NetworkGraph';
import { Spinner } from '@fluentui/react';

export const Network = (): JSX.Element => {
    const { network } = useNetwork();

    if (!network) {
        return <Spinner />;
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
