'use client'

import * as actions from '@/actions'
import { Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react"
import { ReactNode } from 'react';

export default function HeaderAuth() {
    const { data: session, status } = useSession()

    let authContent: ReactNode;
    if (status === 'loading') {
        authContent = <Spinner />
    } else if (session?.user) {
        authContent = (
            <NavbarItem>
                <Popover placement='bottom-end' showArrow={true}>
                    <PopoverTrigger>
                        <Avatar src={session.user.image || ''} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <form action={actions.signOut} className='p-4'>
                            <Button type='submit' color='warning' variant='flat'>
                                Sign Out
                            </Button>
                        </form>
                    </PopoverContent>
                </Popover>
            </NavbarItem>
        );
    } else {
        authContent = (
            <>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <Button type='submit' color='secondary' variant='bordered'>
                            Sign In
                        </Button>
                    </form>
                </NavbarItem>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <Button type='submit' color='primary' variant='flat'>
                            Sign Up
                        </Button>
                    </form>
                </NavbarItem>
            </>
        );
    }

    return authContent
}