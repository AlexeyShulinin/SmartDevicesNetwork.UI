import React from 'react';
import {
    ArrowClockwiseFilled,
    MoreHorizontal24Filled,
    PowerFilled,
} from '@fluentui/react-icons';
import {
    Menu,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    ToastIntent,
    Toolbar,
    ToolbarButton,
} from '@fluentui/react-components';
import { useNodeActions } from '../../hooks/useNodeActions.ts';
import { useModal } from '../../hooks/useModal.ts';
import { DeviceLogs } from '../DeviceLogs';
import { Modal } from '../Modal';
import { INetworkNode } from '../../interfaces/INetworkNode.ts';
import { Spinner } from '@fluentui/react';
import './styles.css';
import { DeviceDetails } from '../DeviceDetails';

interface INodeActionsProps {
    networkNode: INetworkNode;
    onAlert: (intent: ToastIntent, message: string) => void;
}

export const NodeActions: React.FC<INodeActionsProps> = ({
    networkNode,
    onAlert,
}) => {
    const { isLoading, onRebootDevice, onPowerChangeDevice } = useNodeActions({
        deviceId: networkNode.id,
        status: networkNode.status,
        onAlertActionNotification: onAlert,
    });

    const { isOpen: isOpenDeviceLogs, toggle: onToggleDeviceLogs } = useModal();
    const { isOpen: isOpenDeviceDetails, toggle: onToggleDeviceDetails } =
        useModal();

    if (isLoading) {
        return <Spinner size={1} className="loader" />;
    }

    return (
        <>
            <Modal
                header={`[${networkNode.name}]: logs`}
                isOpen={isOpenDeviceLogs}
                onClose={onToggleDeviceLogs}>
                <DeviceLogs deviceId={networkNode.id} />
            </Modal>
            <Modal
                header={`[${networkNode.name}]: details`}
                isOpen={isOpenDeviceDetails}
                onClose={onToggleDeviceDetails}>
                <DeviceDetails deviceId={networkNode.id} />
            </Modal>
            <Toolbar aria-label="Default">
                <ToolbarButton
                    aria-label="Reboot"
                    onClick={onRebootDevice}
                    icon={<ArrowClockwiseFilled />}
                />
                <ToolbarButton
                    aria-label="On/Off"
                    onClick={onPowerChangeDevice}
                    icon={<PowerFilled />}
                />
                <Menu>
                    <MenuTrigger>
                        <ToolbarButton
                            aria-label="More"
                            icon={<MoreHorizontal24Filled />}
                        />
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            <MenuItem onClick={onToggleDeviceLogs}>
                                Logs
                            </MenuItem>
                        </MenuList>
                        <MenuList>
                            <MenuItem onClick={onToggleDeviceDetails}>
                                Details
                            </MenuItem>
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </Toolbar>
        </>
    );
};
