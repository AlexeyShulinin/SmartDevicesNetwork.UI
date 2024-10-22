import { useCallback, useState } from 'react';
import { IActionRequest } from '../interfaces/IActionRequest.ts';
import { Actions } from '../constants/Actions.ts';
import { Statuses } from '../constants/Statuses.ts';
import { ToastIntent } from '@fluentui/react-components';

interface IUseNodeActions {
    deviceId: number;
    status: string;
    onAlertActionNotification: (intent: ToastIntent, message: string) => void;
}

type UseNodeActionsReturnType = {
    isLoading: boolean;
    onRebootDevice: () => void;
    onPowerChangeDevice: () => void;
};

export const useNodeActions = ({
    deviceId,
    status,
    onAlertActionNotification,
}: IUseNodeActions): UseNodeActionsReturnType => {
    const [isLoading, setIsLoading] = useState(false);

    const performAction = useCallback(
        (actionRequest: IActionRequest) => {
            const postAction = async () =>
                fetch(
                    `${import.meta.env.VITE_API_BASE_URL}/api/devices/${deviceId}/action`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(actionRequest),
                    },
                );

            setIsLoading(true);
            postAction()
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((actionResponse) =>
                    onAlertActionNotification(
                        actionResponse.status.toLowerCase() as ToastIntent,
                        actionResponse.message,
                    ),
                )
                .finally(() => setIsLoading(false));
        },
        [deviceId, onAlertActionNotification],
    );

    const onRebootDevice = useCallback(() => {
        performAction({ action: Actions.Reboot });
    }, [performAction]);

    const onPowerChangeDevice = useCallback(() => {
        performAction({
            action:
                status.toLowerCase() === Statuses.Online.toLowerCase()
                    ? Actions.Off
                    : Actions.On,
        });
    }, [performAction, status]);

    return { isLoading, onRebootDevice, onPowerChangeDevice };
};
