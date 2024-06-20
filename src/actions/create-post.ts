'use server';

import type { Post, Topic } from '@prisma/client';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

type CreatePostType = {
    title?: string[];
    content?: string[];
    _general?: string[];
};

export async function createPost(
    slug: string,
    prevState: CreatePostType,
    formData: FormData
): Promise<CreatePostType> {
    await new Promise(r => setTimeout(r, 2000));

    const title = formData.get('title');
    const content = formData.get('content');

    const result = createPostSchema.safeParse({ title, content });

    if (!result.success) {
        const error = result.error.flatten().fieldErrors;
        return error;
    }

    let post: Post;

    try {
        const session = await auth();
        if (!session || !session.user)
            throw new Error('You must be signed in to create post.');

        const topic = await db.topic.findFirst({
            where: { slug: slug },
        });

        if (!topic) throw new Error('Cannot find topic.');

        post = await db.post.create({
            data: {
                title: title as string,
                content: content as string,
                userId: session.user.id,
                topicId: topic.id,
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                _general: [error.message],
            };
        }
        return {
            _general: ['Something went wrong!'],
        };
    }

    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));
}
