import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0"
import TaskManager from "@/app/components/task-manager/TaskManager"
import { getTabs } from "@/app/actions/tabActions"

import Button from "@/app/components/Button"
import Tester from "@/app/components/Test"


export default withPageAuthRequired(async function Dashboard() {

    const {error, data} = await getTabs()

    return (
        (
            <>
                <TaskManager tabList={data}/>
                <Button content="logout" color="outline" href="/api/auth/logout" />
                <Tester/>
            </>
    )
    )
}, { returnTo: "/dashboard" })