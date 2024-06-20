import Link from 'next/link';
import PostShow from '@/components/posts/post-show';
import CommentList from '@/components/comments/comment-list';
import CommentCreateForm from '@/components/comments/comment-create-form';
import paths from '@/paths';
import { Suspense } from 'react';
import { Skeleton } from '@nextui-org/react';
import PostShowLoading from '@/components/posts/post-show-loading';

interface PostShowPageProps {
    params: {
        slug: string;
        postId: string;
    };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
    const { slug, postId } = params;

    return (
        <div className='space-y-3'>
            <Link
                className='underline decoration-solid'
                href={paths.topicShow(slug)}>
                {'< '}Back to {slug}
            </Link>
            <Suspense
                fallback={<PostShowLoading />}>
                <PostShow postId={postId} />
            </Suspense>
            <CommentCreateForm postId={postId} startOpen />
            <Suspense
                fallback={
                    <div className='max-w-[300px] w-full flex items-center gap-3'>
                        <div>
                            <Skeleton className='flex rounded-full w-12 h-12' />
                        </div>
                        <div className='w-full flex flex-col gap-2'>
                            <Skeleton className='h-3 w-3/5 rounded-lg' />
                            <Skeleton className='h-3 w-4/5 rounded-lg' />
                        </div>
                    </div>
                }>
                <CommentList postId={postId} />
            </Suspense>
        </div>
    );
}
