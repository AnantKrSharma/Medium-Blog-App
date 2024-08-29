import { CreateBlogInput } from "@100xanant/medium-common";
import { Appbar } from "../components/Appbar"
import { useState } from "react";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router-dom";

export const NewBlog = () => {
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<CreateBlogInput>({
        title: '',
        content: ''
    });
    const navigate = useNavigate();

    const handleClick = async () =>{
        try {
            if(blog.title.length == 0 || blog.content.length == 0){
                throw new Error("Enter valid title and content.");
            }

            setLoading(true);
            const res = await fetch(`${BACKEND_URL}/api/v1/blog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(blog)
            })
    
            const data = await res.json();
    
            if(data.error){
                throw new Error(data.error)
            }
            if(data.message){
                toast.success(data.message);
            }

            navigate(`/blog/${data.id}`)

        } catch (error: any) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    return <div>
        <Appbar newBlog={false}/>
        
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-5 mt-10 max-w-screen-lg">
                <input type="text" className="w-full bg-gray-50 border border-gray-300 rounded-lg text-3xl text-gray-400 p-4 focus:ring outline-none"
                       placeholder="Title"
                       onChange={(e) => {
                            setBlog({
                                ...blog,
                                title: e.target.value
                            })
                       }}
                />

                <textarea name="" id="" cols={110} rows={10} className="border bg-gray-50 text-gray-400 rounded-lg outline-none focus:ring p-4 text-lg" 
                          placeholder="Write an article.."
                          onChange={(e) => {
                            setBlog({
                                ...blog,
                                content: e.target.value
                            })
                          }}
                />

                <div className="w-full">
                    <button className="border bg-blue-500 text-white text-lg font-semibold py-3 px-5 rounded-xl hover:bg-blue-700 min-w-36"
                            onClick={handleClick}
                    >
                        {loading ? <Spinner /> : "Publish blog"}
                    </button>
                </div>
            </div>
        </div>
        
    </div>
}
