import { usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import Toast from '@/components/ui/Toast';

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
      <Toast />
      {children}
    </>
  );
}
