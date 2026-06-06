import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeOnBackdrop?: boolean;
    closeOnEsc?: boolean;
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
};

export default function Modal({
    isOpen,
    onClose,
    children,
    title,
    size = 'md',
    closeOnBackdrop = true,
    closeOnEsc = true,
}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && closeOnEsc) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, closeOnEsc, onClose]);

    useEffect(() => {
        if (isOpen && dialogRef.current) {
            dialogRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/50 animate-in fade-in duration-200"
                onClick={closeOnBackdrop ? onClose : undefined}
                aria-hidden="true"
            />

            <dialog
                ref={dialogRef}
                open={isOpen}
                className={cn(
                    'relative w-full bg-white rounded-xl shadow-2xl animate-in zoom-in-95 fade-in duration-200',
                    sizeClasses[size]
                )}
                aria-labelledby={title ? 'modal-title' : undefined}
            >
                {title && (
                    <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
                        <h2 id="modal-title" className="text-lg font-semibold text-text">
                            {title}
                        </h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg p-1 text-text-subtle transition-colors hover:bg-stone-100 hover:text-text"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>
                )}

                <div className="p-6">{children}</div>
            </dialog>
        </div>,
        document.body
    );
}