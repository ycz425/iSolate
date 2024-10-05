import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0"
import Button from "@/app/components/Button"
import Tester from "@/app/components/Test"


export default withPageAuthRequired(async function Dashboard() {

    return (
        (
            <>
                <p>
                    hi
                </p>
                <Button content="logout" color="outline" href="/api/auth/logout" />
                <Tester/>
            </>
    )
    )
}, { returnTo: "/dashboard" })