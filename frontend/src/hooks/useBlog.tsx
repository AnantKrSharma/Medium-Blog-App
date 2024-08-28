import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export type BlogType = {
    id: string,
    title: string,
    content: string,
    published: boolean,
    author: {
        name: string
    }
}  

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogType>({
        id: '',
        title: '',
        content: '',
        published: false,
        author: {
            name: ''
        },
    })

    useEffect(() => {
        async function fetchBlog(){
            try {
                const response = await fetch(`${BACKEND_URL}/api/v1/blog/get/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json();
    
                setBlog(data.blog);
            } 
            catch (error: any) {
                toast.error(error.message);    
            }
            finally{
                setLoading(false);
            }
        }

        fetchBlog();
    }, [id])

    return {
        loading,
        blog
    }
}
