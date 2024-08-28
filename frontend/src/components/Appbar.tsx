import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between items-center px-10 py-2">
        <div>
            <Link to={'/blogs'}>
                <img src="/logo.png" alt="logo" className="h-11 w-44"/>
            </Link>
        </div>
        
        <div className="flex justify-center items-center gap-5 p-3 [&>*]:m-0">
            <Link to={'/publish'}>
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-xl px-3 py-3">
                    New Blog +
                </button>
            </Link>

            <Avatar name="Anant" size="big"/>
        </div>
    </div>
} 
