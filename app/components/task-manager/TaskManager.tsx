"use client"

import { Tab as TabInterface, Task as TaskInterface, Tag as TagInterface } from "../../types"
import { useState, useEffect } from "react"
import Tab from "./Tab"
import Task from "./Task"
import { getTasks } from "@/app/actions/taskActions"
import { createClient } from "@/utils/supabase/client"
import TaskModal from "./TaskModal"

interface TaskManagerProps {
    tabList: TabInterface[],
    taskList: TaskInterface[]
    tagList: TagInterface[]
}

export default function TaskManager({ tabList, taskList, tagList }: TaskManagerProps) {
    const supabase = createClient()

    const [tabs, setTabs] = useState(tabList)
    const [selectedTabId, setSelectedTabId] = useState<number | null>(null)
    const [tasks, setTasks] = useState(taskList)

    const [modalTask, setModalTask] = useState<TaskInterface | null>(null)

    const onAddTask = () => {
        setModalTask({id: -1, name: "New Task", tabs: null, description: null, deadline: new Date().toISOString(), tags: []})
    }

    useEffect(() => {
        const channel = supabase.channel("realtime")
            .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, async () => {
                setTasks(await getTasks())
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return (
        <div className="w-[800px] flex flex-col">
            <div className="w-full h-fit flex overflow-x-scroll no-scrollbar">
                <Tab name="Upcoming" selected={selectedTabId == null} onClick={()=>{setSelectedTabId(null)}}/>
                {tabs.map((tab, index) => <Tab key={index} name={tab.name} selected={selectedTabId == tab.id} onClick={()=>{setSelectedTabId(tab.id)}}/>)}
            </div>
            <div className="flex justify-around h-96 pt-5">
                <div className=""></div>
                <div className="flex flex-col gap-5 w-[550px] overflow-y-scroll">
                    {tasks
                        .filter(task => selectedTabId == null || task.tabs?.id == selectedTabId)
                        .map((task, index) => <Task key={index} task={task} onClick={() => {setModalTask(task)}}/>)
                    }
                </div>
                <button className="border-black rounded-lg font-extralight h-fit w-fit text-4xl" onClick={onAddTask}>＋</button>
            </div>
            {modalTask && 
                <TaskModal
                    task={modalTask}
                    tabList={tabList} 
                    tagList={tagList}
                    newTask={modalTask.id == -1}
                    onClose={() => {setModalTask(null)}}
                />
            }
        </div>
    )
}