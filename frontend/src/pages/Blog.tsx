import { useParams } from "react-router-dom";
import { Avatar } from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";
import { BlogType, useBlog } from "../hooks/useBlog"
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const {id} = useParams();
  const {loading, blog} = useBlog({id: String(id)});

  return (
    <div className="">
      <Appbar />
      
      <div className="p-10 mx-auto max-w-screen-xl">
        {loading ? 
              <Skeleton />
              :
              <FullBlog key={blog.id} 
                        blog={blog}
              />
        }
      </div>
    </div>
  )
}


export const FullBlog = ({ blog }: { blog: BlogType }) => {
  return (
    <div className="grid grid-cols-11 w-full">
        <div className="flex flex-col gap-2 col-span-8 p-7 rounded-xl border">
            <div className="text-5xl font-bold rounded-xl w-fit">{blog.title}</div>
            <div className="text-gray-400">10 Feb 2024</div>
            <div className="">{blog.content}</div>
        </div>

        <div className="flex flex-col gap-2 col-start-10 col-span-3 p-4 rounded-xl">
            <div className="text-gray-500">Author</div>

            <div className="flex items-center gap-2">
              <Avatar name={blog.author.name || "/"}/>
              <div className="text-gray-700">
                {blog.author.name || "Anonymous"}
              </div>
            </div>
        </div>
    </div>
  )
}
