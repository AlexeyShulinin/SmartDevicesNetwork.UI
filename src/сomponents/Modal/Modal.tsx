import React, { ReactNode } from 'react';
import {
    Button,
    DialogActions,
    DialogBody,
    DialogSurface,
    DialogTitle,
    DialogTrigger,
} from '@fluentui/react-components';
import { Dialog, DialogContent } from '@fluentui/react';

interface IModalProps {
    header: string;
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal: React.FC<IModalProps> = ({
    header,
    isOpen,
    children,
    onClose,
}) => {
    return (
        <Dialog hidden={!isOpen}>
            <DialogSurface>
                <DialogTitle>{header}</DialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogBody>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" onClick={onClose}>
                                Close
                            </Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    );
};
