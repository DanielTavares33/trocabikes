import { useState } from 'react';

export function useModal(defaultOpen = false) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return {
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((prev) => !prev),
    };
}