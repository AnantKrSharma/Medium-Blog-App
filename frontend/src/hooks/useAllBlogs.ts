import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

interface BlogType {
    id: string,
    title: string,
    content: string,
    published: boolean,
    author: {
        name: string
    }
}

export const useAllBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        async function fetchBlogs(){
            try {
                const response = await fetch(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();

                setBlogs(data.allBlogs);
            } 
            catch (error: any) {
                toast.error(error.message)
            }
            finally{
                setLoading(false);
            }
        }

        fetchBlogs();
    }, [])

    return {
        loading,
        blogs
    }
}
