import PostCreateForm from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
import { Divider } from "@nextui-org/react";

interface ParticularTopicPageProps {
    params: {
        slug: string;
    };
}

export default async function ParticularTopicPage({
    params: { slug },
}: ParticularTopicPageProps) {
    await new Promise(r => setTimeout(r, 2000))

    return (
        <div className='grid grid-cols-4 gap-12 p-4'>
            <div className='col-span-3'>
                <h1 className='text-2xl font-bold mb-2'>{slug}</h1>
                <Divider className="mb-6" />
                <PostList fetchData={fetchPostsByTopicSlug.bind(null, slug)} />
            </div>

            <div>
                <PostCreateForm slug={slug} />
            </div>
        </div>
    );
}
