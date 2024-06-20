'use client';

import { useFormState } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Textarea, Button } from '@nextui-org/react';
import FormButton from '@/components/common/form-button';
import * as actions from '@/actions';

interface CommentCreateFormProps {
    postId: string;
    parentId?: string;
    startOpen?: boolean;
}

export default function CommentCreateForm({
    postId,
    parentId,
    startOpen,
}: CommentCreateFormProps) {
    const [open, setOpen] = useState(startOpen);
    const ref = useRef<HTMLFormElement | null>(null);
    const [formState, action] = useFormState(
        actions.createComment.bind(null, { postId, parentId }),
        {}
    );

    useEffect(() => {
        if (formState.success) {
            ref.current?.reset();
            if (!startOpen) setOpen(false);
        }
    }, [formState, startOpen]);

    const form = (
        <form action={action} ref={ref}>
            <div className='space-y-2 px-1'>
                <Textarea
                    name='content'
                    label='Reply'
                    placeholder='Enter your comment'
                    isInvalid={!!formState.content}
                    errorMessage={formState.content?.join(', ')}
                />

                {formState._general ? (
                    <div className='p-2 bg-red-200 border rounded border-red-400'>
                        {formState._general?.join(', ')}
                    </div>
                ) : null}

                <div className='flex gap-4'>
                    <FormButton>Create Comment</FormButton>
                    <Button variant='light' onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    );

    return (
        <div className={open ? '!mt-8' : ''}>
            {!open && (
                <Button
                    className='mb-4'
                    size='md'
                    variant='light'
                    onClick={() => setOpen(!open)}>
                    Reply
                </Button>
            )}
            {open && form}
        </div>
    );
}
