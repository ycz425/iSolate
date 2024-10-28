"use client"

import Image from "next/image"
import Quote from "./Quote"
import TaskManager from "@/app/components/dashboard/task-manager/TaskManager"
import { Tab, Tag, Task } from "@/app/types"
import { useDarkModeContext } from "./DarkModeContextProvider"
import clsx from "clsx"

interface DashboardContentProps {
    tabs: Tab[]
    tasks: Task[]
    tags: Tag[]
}

export default function DashboardContent({ tabs, tasks, tags}: DashboardContentProps) {

    const { darkMode, toggleDarkMode } = useDarkModeContext()

    return (
        <div className={clsx("w-screen h-screen relative", {"bg-white": !darkMode, "bg-black": darkMode})}>
            <Quote/>
            <div
                className="w-[100px] h-[100px] absolute left-1/2 rounded-2xl -translate-x-1/2 top-1/4 flex justify-center items-center group hover:cursor-pointer"
                onClick={() => {toggleDarkMode()}}
            >
                <Image
                    src="./icon.svg"
                    alt="toggle isolation mode"
                    width={100}
                    height={100}
                    className="select-none group-hover:w-[95px] rounded-2xl transition-all"
                />
            </div>
            {/* <Button content="logout" style="outline" size="md" href="/api/auth/logout" /> */}
            <TaskManager tabList={tabs} taskList={tasks} tagList={tags}/>
        </div>
    )
}