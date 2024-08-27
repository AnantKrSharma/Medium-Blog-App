import { Quote } from "../components/Quote"
import { SignInForm } from "../components/SignInForm"

export const Signin = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <SignInForm/>
        </div>

        <div className="hidden lg:block">
          <Quote />
        </div>
    </div>
  )
}
