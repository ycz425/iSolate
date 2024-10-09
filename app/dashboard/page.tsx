import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0"
import TaskManager from "@/app/components/task-manager/TaskManager"
import { getTabs } from "@/app/actions/tabActions"
import { getTasks } from "@/app/actions/taskActions"
import { getTags } from "@/app/actions/tagActions"

import Button from "@/app/components/Button"
import Tester from "@/app/components/Test"


export default withPageAuthRequired(async function Dashboard() {

    const tabs = await getTabs()
    const tasks = await getTasks()
    const tags = await getTags()

    return (
            <>
                <TaskManager tabList={tabs} taskList={tasks} tagList={tags}/>
                <Button content="logout" color="outline" href="/api/auth/logout" />
                <Tester/>
            </>
    )
}, { returnTo: "/dashboard" })