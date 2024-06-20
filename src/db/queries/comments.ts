export type { Comment } from '@prisma/client';
import { cache } from 'react';
import { db } from '..';

// export type CommentWithAuthor = Comment & {
//     user: {
//         name: string | null
//         image: string | null
//     }
// }

export type CommentWithAuthor = Awaited<
    ReturnType<typeof fetchCommentsByPostId>
>[number];

export const fetchCommentsByPostId = cache((postId: string) => {
    console.log('Making a query!');

    return db.comment.findMany({
        where: { postId },
        include: {
            user: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
    });
});
