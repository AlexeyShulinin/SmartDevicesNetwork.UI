import { useDeviceDetails } from '../../hooks/useDeviceDetails.ts';
import React from 'react';
import { Label, Spinner } from '@fluentui/react';
import {
    Avatar,
    Badge,
    Body1,
    Body1Strong,
    Caption1,
    Card,
    CardHeader,
    CardPreview,
} from '@fluentui/react-components';
import {
    PhoneLaptopRegular,
    BatteryChargeRegular,
} from '@fluentui/react-icons';
import { formatDateFromString } from '../../utils/dateUtils.ts';
import './styles.css';

interface IDeviceDetailsProps {
    deviceId: number;
}

export const DeviceDetails: React.FC<IDeviceDetailsProps> = ({ deviceId }) => {
    const { isLoading, deviceDetails, deviceStatus } = useDeviceDetails({
        deviceId,
    });

    if (isLoading || !deviceDetails) {
        return <Spinner />;
    }

    return (
        <Card>
            <CardHeader
                image={
                    <Avatar
                        icon={<PhoneLaptopRegular />}
                        aria-label="Device"
                        badge={{ status: deviceStatus }}>
                        <title>{deviceDetails.status}</title>
                    </Avatar>
                }
                header={
                    <Body1>
                        <b>{deviceDetails.type}</b>
                        {Number.isFinite(
                            deviceDetails.details?.batteryLevel,
                        ) && (
                            <Badge
                                icon={<BatteryChargeRegular />}
                                color="subtle">
                                {deviceDetails.details.batteryLevel}%
                            </Badge>
                        )}
                    </Body1>
                }
                description={
                    <Caption1>
                        Last active at:{' '}
                        {formatDateFromString(deviceDetails.lastActive)}
                    </Caption1>
                }
            />
            <CardPreview className="details-container">
                <div>
                    <Body1Strong>IP: {deviceDetails.details?.ip}</Body1Strong>
                </div>
                <div>
                    <Label>
                        Firmware: {deviceDetails.details?.firmwareVersion}
                    </Label>
                </div>
            </CardPreview>
        </Card>
    );
};
