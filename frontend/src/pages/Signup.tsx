import { Quote } from "../components/Quote"
import { SignUpForm } from "../components/SignUpForm"

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <SignUpForm/>
        </div>

        <div className="hidden lg:block">
          <Quote />
        </div>
    </div>
  )
}
