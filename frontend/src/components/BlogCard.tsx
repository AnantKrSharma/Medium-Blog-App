import { Link} from "react-router-dom";

type BlogCardProps = {
    id: string,
    author: string;
    title: string;
    content: string;
    publishedDate: string
}

export const BlogCard = ({id, author, title, content, publishedDate}: BlogCardProps) => {

    return (
    <Link to={`/blog/${id}`}>
        <div className="flex justify-between items-center border rounded-xl my-4 p-4 gap-4 max-w-[810px] cursor-pointer">
            <div className="max-w-lg p-2">
                <div className="flex items-center text-md gap-2">
                    <Avatar name={author} />
                    
                    <div>
                        {author}
                    </div>

                    <div className="flex flex-col justify-center">
                        <Circle />
                    </div>
                    
                    <div className="text-gray-400 text-sm">
                        {publishedDate}
                    </div>
                </div>
                
                <div className="my-4 max-w-[430px] text-justify">
                    <div className="text-2xl font-bold my-2">
                        {title}
                    </div>
                    <div className="text-sm text-gray-500">
                        {content.slice(0,150)} {content.length > 150 ? "..." : ""}    
                    </div>
                </div>
                
                <div className="text-sm text-gray-500">
                    {Math.ceil(content.length / 100)} minute(s) read
                </div>
            </div>

            <div className="rounded-lg">
                <img className="h-48 w-48 rounded-lg" src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg" alt="" />
            </div>
        </div>
    </Link>
    )
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {name[0]}
    </span>
</div>
}
