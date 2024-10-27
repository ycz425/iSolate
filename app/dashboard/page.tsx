import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import TaskManager from "@/app/components/task-manager/TaskManager"
import { getTabs } from "@/app/actions/tabActions"
import { getTasks } from "@/app/actions/taskActions"
import { getTags } from "@/app/actions/tagActions"


import Image from "next/image"
import Quote from "../components/Quote"


export default withPageAuthRequired(async function Dashboard() {

    const tabs = await getTabs()
    const tasks = await getTasks()
    const tags = await getTags()

    return (
            <div className="w-screen h-screen relative">
                <Quote/>
                <Image
                    src="./icon.svg"
                    alt="toggle isolation mode"
                    width={100}
                    height={100}
                    className="select-none absolute left-1/2 -translate-x-1/2 top-1/4"
                />
                {/* <Button content="logout" style="outline" size="md" href="/api/auth/logout" />
                <Tester/> */}
                <TaskManager tabList={tabs} taskList={tasks} tagList={tags}/>
                
            </div>
    )
}, { returnTo: "/dashboard" })