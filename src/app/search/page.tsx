import PostList from "@/components/posts/post-list"
import { fetchPostsBySearchTerm } from "@/db/queries/posts"

interface SearchPageProps {
    searchParams: {
        term: string
    }
}

export default function SearchPage({ searchParams: { term } }: SearchPageProps) {
    return <div>
        <h3 className="mb-4">Search keyword: <span className="font-bold">{term}</span></h3>
        <div className="grid grid-cols-4">
            <div className="col-span-3">
                <PostList fetchData={fetchPostsBySearchTerm.bind(null, term)} />
            </div>
        </div>
    </div>
}
