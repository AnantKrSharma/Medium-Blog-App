import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = ({ newBlog = true }: {newBlog?: boolean | true}) => {
    const navigate = useNavigate();

    return <div className="border-b flex justify-between items-center px-10 py-2 bg-orange-50">
        <div>
            <Link to={'/blogs'}>
                <img src="/logo.png" alt="logo" className="h-11 w-44"/>
            </Link>
        </div>
        
        <div className="flex justify-center items-center gap-5 p-3 [&>*]:m-0">
            <button className="bg-slate-500 p-[9px] text-lg font-semibold text-white rounded-lg hover:bg-slate-700"
                    onClick={() => { 
                        localStorage.removeItem('token') 
                        navigate('/signin')
                    }}
            >
                Logout
            </button>

            {newBlog ?
                    <Link to={'/publish'}>
                        <button type="button" className="focus:outline-none text-white bg-yellow-700 hover:bg-amber-900 focus:ring-4 focus:ring-green-300 font-medium rounded-full px-3 py-3">
                            New Blog +
                        </button>
                    </Link>
                   : 
                    null
            }

            <Avatar name="Anant" size="big"/>
        </div>
    </div>
} 
