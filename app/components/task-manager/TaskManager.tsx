"use client"

import { Tab as TabInterface, Task as TaskInterface } from "./types"
import { useState, useEffect } from "react"
import Tab from "./Tab"
import Task from "./Task"
import { addTask } from "@/app/actions/taskActions"
import { createClient } from "@/utils/supabase/client"

interface TaskManagerProps {
    tabList: TabInterface[],
    taskList: TaskInterface[]
}

export default function TaskManager({ tabList, taskList }: TaskManagerProps) {
    const supabase = createClient()

    const [tabs, setTabs] = useState(tabList) // do we need to keep states?
    const [selectedTabId, setSelectedTabId] = useState<number | null>(null)

    const [tasks, setTasks] = useState(taskList)

    useEffect(() => {
        
        
    }, [])

    return (
        <div className="w-[800px] h-96 flex flex-col">
            <div className="w-full h-fit flex overflow-x-scroll no-scrollbar">
                <Tab name="Upcoming" selected={selectedTabId == null} onClick={()=>{setSelectedTabId(null)}}/>
                {tabs.map((tab, index) => <Tab key={index} name={tab.name} selected={selectedTabId == tab.id} onClick={()=>{setSelectedTabId(tab.id)}}/>)}
            </div>
            <div className="flex justify-around border py-5">
                <div className="border"></div>
                <div className="flex flex-col gap-5 w-[550px] border">
                    {tasks
                        .filter(task => selectedTabId == null || task.tab_id == selectedTabId)
                        .map((task, index) => <Task key={index} id={task.id} name={task.name}/>)}
                </div>
                <button className="border border-black rounded-lg font-extralight h-fit w-fit text-4xl" onClick={() => {addTask("testAdd")}}>＋</button>
            </div>
            
        </div>
    )
}