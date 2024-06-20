'use server';

import type { Topic } from '@prisma/client';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';

const createTopicSchema = z.object({
    title: z
        .string()
        .min(3)
        .regex(/^[a-z-]+$/, {
            message: 'Must be lowercase letters or dashes without spaces.',
        }),
    description: z.string().min(10),
});

type CreateTopicType = {
    title?: string[];
    description?: string[];
    _general?: string[];
};

export async function createTopic(
    prevState: CreateTopicType,
    formData: FormData
): Promise<CreateTopicType> {
    await new Promise(r => setTimeout(r, 2000));

    const title = formData.get('title');
    const description = formData.get('description');

    const result = createTopicSchema.safeParse({ title, description });

    if (!result.success) {
        const error = result.error.flatten().fieldErrors;
        return error;
    }

    const session = await auth();
    if (!session || !session.user) {
        return {
            _general: ['You must be signed in to create topic.'],
        };
    }

    let topic: Topic;

    try {
        topic = await db.topic.create({
            data: {
                slug: title as string,
                description: description as string,
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                _general: [error.message]
            }
        } else {
            return {
                _general: ['Something went wrong!']
            }
        }
    }

    revalidatePath('/');
    redirect(paths.topicShow(topic.slug));
}
