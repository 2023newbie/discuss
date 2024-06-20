'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type ProvidersProps = {
    children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <NextUIProvider>{children}</NextUIProvider>
        </SessionProvider>
    );
}
