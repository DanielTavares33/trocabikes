import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { X } from 'lucide-react';

const toastOptions = {
    duration: 4000,
    style: {
        fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, sans-serif",
        fontSize: '16px',
        fontWeight: '500',
        backgroundColor: '#FFFFFF',
        color: '#fafaf9',
        borderRadius: '12px',
        padding: '16px 16px',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },
    success: {
        duration: 4000,
        iconTheme: {
            primary: '#16a34a',
            secondary: '#dcfce7',
        },
        style: {
            fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, sans-serif",
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: '#FFFFFF',
            color: '#16a34a',
            borderRadius: '12px',
            padding: '16px 16px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        },
    },
    error: {
        duration: 5000,
        iconTheme: {
            primary: '#dc2626',
            secondary: '#fef2f2',
        },
        style: {
            fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, sans-serif",
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: '#FFFFFF',
            color: '#dc2626',
            borderRadius: '12px',
            padding: '16px 16px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        },
    },
};

export default function Toast() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={toastOptions}
        >
            {(t) => (
                <ToastBar toast={t}>
                {({ icon, message }) => (
                    <>
                    {icon}
                    {message}
                    {t.type !== 'loading' && (
                        <button onClick={() => toast.dismiss(t.id)}>
                            <X width={16} height={16} className="text-text-subtle" />
                        </button>
                    )}
                    </>
                )}
                </ToastBar>
            )}
        </Toaster>
    );
}
