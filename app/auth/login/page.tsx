import { login } from "./actions"
import AuthForm from "@/app/components/AuthForm"
import Link from "next/link"

export default function LogIn() {
    return (
        <div className="flex flex-col gap-3 items-center">
            <AuthForm formAction={login} buttonText="Log in" formName="Log in"/>
            <Link href="/auth/register">
                Don't have an account? Create an account here.
            </Link>
        </div>
    )
}