'use client'

import { Button, Spinner } from "@nextui-org/react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export default function FormButton({ children }: { children: ReactNode }) {
    const { pending } = useFormStatus();

    return (
        <Button type='submit' disabled={pending} isLoading={pending}>
            {children}
        </Button>
    );
}