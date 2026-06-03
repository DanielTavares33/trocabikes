import { Toaster } from 'react-hot-toast';

const toastOptions = {
    duration: 4000,
    style: {
        fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, sans-serif",
        fontSize: '14px',
        fontWeight: '500',
        backgroundColor: '#18181b',
        color: '#fafaf9',
        borderRadius: '4px',
        padding: '12px 16px',
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
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: '#dcfce7',
            color: '#16a34a',
            borderRadius: '4px',
            padding: '12px 16px',
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
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            borderRadius: '4px',
            padding: '12px 16px',
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
        />
    );
}