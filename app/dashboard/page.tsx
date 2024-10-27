import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import TaskManager from "@/app/components/task-manager/TaskManager"
import { getTabs } from "@/app/actions/tabActions"
import { getTasks } from "@/app/actions/taskActions"
import { getTags } from "@/app/actions/tagActions"

import Button from "@/app/components/Button"
import Tester from "@/app/components/Test"
import Image from "next/image"


export default withPageAuthRequired(async function Dashboard() {

    const tabs = await getTabs()
    const tasks = await getTasks()
    const tags = await getTags()

    return (
            <div className="w-screen h-screen border flex flex-col gap-14 justify-end items-center">
                <Image
                    src="./icon.svg"
                    alt="toggle isolation mode"
                    width={100}
                    height={100}
                    className="select-none"
                />
                {/* <Button content="logout" style="outline" size="md" href="/api/auth/logout" />
                <Tester/> */}
                <TaskManager tabList={tabs} taskList={tasks} tagList={tags}/>
                
            </div>
    )
}, { returnTo: "/dashboard" })