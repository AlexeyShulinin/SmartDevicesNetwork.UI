import { useState } from 'react';

type UseModelReturnType = {
    isOpen: boolean;
    toggle: () => void;
};

export const useModal = (): UseModelReturnType => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return {
        isOpen,
        toggle,
    };
};
