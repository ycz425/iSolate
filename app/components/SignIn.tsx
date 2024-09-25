import { signIn, auth } from "@/auth"
import Image from "next/image"
 
export default function SignIn() {
    return (
        <form
        action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/dashboard" })
        }}
        >
            <button type="submit" className={"h-fit w-fit rounded-xl text-2xl bg-transparent text-black border border-black flex flex-row px-6 py-5 gap-5 items-center"}>
                <Image src="/images/google-icon.svg" alt="Sign up with Google" width={40} height={40}/>
                Sign in with Google
            </button>
        </form>
    )
} 