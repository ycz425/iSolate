import { signup } from "./actions"
import AuthForm from "@/app/components/AuthForm"
import Link from "next/link"

export default function SignUp() {
    return(
        <div className="flex flex-col gap-3 items-center">
            <AuthForm formAction={signup} confirmPassword={true} buttonText="Create an account" formName="Sign up"/>
            <Link href="/auth/login">
                Already have an account? Log in here.
            </Link>
        </div>
    )
}