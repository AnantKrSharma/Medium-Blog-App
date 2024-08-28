import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { Skeleton } from "../components/Skeleton";
import { useAllBlogs } from "../hooks/useAllBlogs"

export const AllBlogs = () => {
    const {loading, blogs} = useAllBlogs();
    
    return (
    <div>
        <Appbar/> 

        <div className="flex justify-center items-center p-5">    
            { loading ? 
                <div className="[&>*]:my-10">
                    <Skeleton /> 
                    <Skeleton /> 
                    <Skeleton /> 
                </div>
                :
                <div className="max-w-5xl">
                    {blogs.map( (blog) => <BlogCard id={blog.id}
                                                    author={blog.author.name || "Anonymous"}
                                                    title={blog.title}
                                                    content={blog.content}
                                                    publishedDate="20 feb 2020"
                                                    key={blog.id}
                                           />
                    )}
                </div>
            }
        </div>
    </div>
    )
}
