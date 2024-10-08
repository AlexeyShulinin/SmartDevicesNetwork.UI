import { useState } from 'react';
import { IActionRequest } from '../interfaces/IActionRequest.ts';
import { Actions } from '../constants/Actions.ts';
import { Statuses } from '../constants/Statuses.ts';
import { ToastIntent } from '@fluentui/react-components';

interface IUseNodeActions {
    deviceId: number;
    status: string;
    onAlertActionNotification: (intent: ToastIntent, message: string) => void;
}

export const useNodeActions = ({
    deviceId,
    status,
    onAlertActionNotification,
}: IUseNodeActions) => {
    const [isLoading, setIsLoading] = useState(false);

    // TODO: Add toast for success/error notification
    const performAction = (actionRequest: IActionRequest) => {
        setIsLoading(true);
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/devices/${deviceId}/action`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(actionRequest),
            },
        )
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
    };

    const onRebootDevice = () => {
        performAction({ action: Actions.Reboot });
    };

    const onPowerChangeDevice = () => {
        performAction({
            action:
                status.toLowerCase() === Statuses.Online.toLowerCase()
                    ? Actions.Off
                    : Actions.On,
        });
    };

    return { isLoading, onRebootDevice, onPowerChangeDevice };
};
