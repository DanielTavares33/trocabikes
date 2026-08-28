import type { Auth } from '@/types/auth';

interface Flash {
  success?: string;
  error?: string;
  message?: string;
  status?: string;
}

declare module '@inertiajs/core' {
  export interface InertiaConfig {
    flashDataType: Flash;
    sharedPageProps: {
      name: string;
      auth: Auth;
      sidebarOpen: boolean;
      [key: string]: unknown;
    };
  }
}
