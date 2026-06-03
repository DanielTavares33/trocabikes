import { usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Layout({
    children,
}: {
    readonly children: React.ReactNode;
}) {
    const { flash } = usePage();

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
        </>
    );
}
