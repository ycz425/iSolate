"use client"

import { Tab as TabInterface, Task as TaskInterface } from "./types"
import { useState } from "react"
import Tab from "./Tab"
import Task from "./Task"

interface TaskManagerProps {
    tabList: TabInterface[],
    taskList: TaskInterface[]
}

export default function TaskManager({ tabList, taskList }: TaskManagerProps) {
    const [tabs, setTabs] = useState(tabList) // do we need to keep states?
    const [selectedTabId, setSelectedTabId] = useState<number | null>(null)

    const [tasks, setTasks] = useState(taskList)

    return (
        <div className="w-[800px] h-96 flex flex-col items-center gap-5">
            <div className="w-full h-fit flex overflow-x-scroll no-scrollbar">
                <Tab name="Upcoming" selected={selectedTabId == null} onClick={()=>{setSelectedTabId(null)}}/>
                {tabs.map((tab, index) => <Tab key={index} name={tab.name} selected={selectedTabId == tab.id} onClick={()=>{setSelectedTabId(tab.id)}}/>)}
            </div>
            {tasks
                .filter(task => selectedTabId == null || task.tab_id == selectedTabId)
                .map((task, index) => <Task key={index} id={task.id} name={task.name}/>)}
        </div>
    )
}