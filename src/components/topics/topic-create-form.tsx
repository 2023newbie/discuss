'use client'

import {
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Input,
    Textarea,
} from '@nextui-org/react';
import { useFormState } from 'react-dom';

import SubmitButton from '../common/form-button';
import * as actions from '@/actions';

export default function TopicCreateForm() {
    const [formState, action] = useFormState(actions.createTopic, {});

    return (
        <Popover placement='left-start'>
            <PopoverTrigger>
                <Button color='primary'>Add Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <h3 className='mt-4 font-semibold text-xl'>Create a Topic</h3>
                <form className='flex flex-col gap-4 p-4 w-80' action={action}>
                    <div>
                        <Input
                            name='title'
                            label='Title'
                            labelPlacement='outside'
                            placeholder='Title'
                            isInvalid={!!formState.title}
                            errorMessage={formState.title?.join(', ')}
                        />
                    </div>
                    <div>
                        <Textarea
                            name='description'
                            label='Description'
                            labelPlacement='outside'
                            placeholder='Describe your topic'
                            isInvalid={!!formState.description}
                            errorMessage={formState.description?.join(', ')}
                        />
                    </div>

                    {formState._general && <p className='p-2 bg-red-200 border border-red-400 rounded'>{formState._general.join(', ')}</p>}

                    <SubmitButton>Submit</SubmitButton>
                </form>
            </PopoverContent>
        </Popover>
    );
}
