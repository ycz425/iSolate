import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import DarkModeContextProvider from "../components/dashboard/DarkModeContextProvider"
import { getTabs } from "@/app/actions/tabActions"
import { getTasks } from "@/app/actions/taskActions"
import { getTags } from "@/app/actions/tagActions"
import DashboardContent from "../components/dashboard/DashboardContent"





export default withPageAuthRequired(async function Dashboard() {

    const tabs = await getTabs()
    const tasks = await getTasks()
    const tags = await getTags()

    return (
        <DarkModeContextProvider>
            <DashboardContent tabs={tabs} tasks={tasks} tags={tags}/>
        </DarkModeContextProvider>
    )
}, { returnTo: "/dashboard" })