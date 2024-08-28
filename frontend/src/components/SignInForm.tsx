import { SigninBodyInput } from "@100xanant/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { LabelledInput } from "./Input";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export const SignInForm = () => {
  const navigate = useNavigate();

  const [postInput, setPostInput] = useState<SigninBodyInput>({
    email: '',
    password: ''
  })
  
  async function handleSignIn(){
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postInput)
      })
      const data = await response.json();

      if(data.error){
        throw new Error(data.error)
      }
      if(data.message){
        toast.success(data.message)
      }

      localStorage.setItem('token', data.jwt)
      navigate('/blogs')

    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">

        <div className="flex flex-col gap-6">
            
            <div className="flex flex-col items-center px-10">
                <div className="text-4xl font-bold">
                  Sign in to your account
                </div>
                
                <div className="text-md text-gray-500">
                      Don't have an account ?
                      <Link to={"/signup"} className="underline underline-offset-2 hover:text-blue-400 pl-2">
                        Sign Up
                      </Link>
                </div>
            </div>
            
            <div>
              
              <LabelledInput label="Enter email :" placeholder="example@gmail.com" type="text"
                            onChange={(e) => {  
                              setPostInput({
                                ...postInput,
                                email: e.target.value
                              })
                            }}
              />
              
              <LabelledInput label="Enter password :" placeholder="Enter a strong password" type="password"
                            onChange={(e) => {  
                              setPostInput({
                                ...postInput,
                                password: e.target.value
                              })
                            }}
              />

              <button type="button" className="mt-2 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:border-gray-700"
                      onClick={handleSignIn}
              > Sign In
              </button>
            </div>

        </div>

    </div>
  )
}
