import { signIn, auth } from "@/auth"
 
export default function SignIn() {
    return (
        <form
        action={async () => {
            "use server"
            await signIn("google")
        }}
        >
        <button type="submit" className={"h-16 w-80 rounded-xl text-2xl bg-transparent text-black border border-black"}>Sign in with Google</button>
        </form>
    )
} 