import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0"


export default withPageAuthRequired(async function Dashboard() {
    const { user } = await getSession()
    return (
        user && (
            <p>
                hi
            </p>
    )
    )
}, { returnTo: "/dashboard" })