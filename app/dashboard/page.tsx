import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0"


export default withPageAuthRequired(async function Dashboard() {
    const { user } = await getSession()
    return (
        user && (
            <div className="h-screen flex items-center justify-center border">
                <p>Hello {user.name}!</p>
                <a href="/api/auth/logout">Logout</a>
            </div>
        )
    )
}, { returnTo: "/dashboard" })