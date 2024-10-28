"use client"

import Image from "next/image"
import Quote from "./Quote"
import TaskManager from "@/app/components/dashboard/task-manager/TaskManager"
import { Tab, Tag, Task } from "@/app/types"

interface DashboardContentProps {
    tabs: Tab[]
    tasks: Task[]
    tags: Tag[]
}

export default function DashboardContent({ tabs, tasks, tags}: DashboardContentProps) {
    return (
        <div className="w-screen h-screen bg-white relative">
            <Quote/>
            <div className="w-[100px] h-[100px] absolute left-1/2 -translate-x-1/2 top-1/4 flex justify-center items-center group">
                <Image
                    src="./icon.svg"
                    alt="toggle isolation mode"
                    width={100}
                    height={100}
                    className="select-none group-hover:w-[95px] transition-all"
                />
            </div>
            {/* <Button content="logout" style="outline" size="md" href="/api/auth/logout" /> */}
            <TaskManager tabList={tabs} taskList={tasks} tagList={tags}/>
        </div>
    )
}