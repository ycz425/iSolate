"use client"

import { Tab as TabInterface, Task as TaskInterface, Tag as TagInterface } from "../../types"
import { useState } from "react"
import Tab from "./Tab"
import Task from "./Task"
import { getTasks } from "@/app/actions/taskActions"
import { createClient } from "@/utils/supabase/client"
import TagMenu from "./TagMenu"
import TaskModal from "./TaskModal"

interface TaskManagerProps {
    tabList: TabInterface[],
    taskList: TaskInterface[]
    tagList: TagInterface[]
}

export default function TaskManager({ tabList, taskList, tagList }: TaskManagerProps) {
    const supabase = createClient()

    const [tabs, setTabs] = useState(tabList)
    const [selectedTab, setSelectedTab] = useState<TabInterface | null>(null)
    const [tasks, setTasks] = useState(taskList)
    const [selectedTags, setSelectedTags] = useState<number[]>([])

    const [modalTask, setModalTask] = useState<TaskInterface | null>(null)

    const onAddTask = () => {
        const date = new Date()
        setModalTask({id: -1, name: "New Task", tabs: selectedTab, description: "", deadline: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`, tags: []})
    }

    const sync = async () => {
        setTasks(await getTasks())
    }

    const onTagSelect = (tagId: number) => {
        if (selectedTags.includes(tagId))
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag != tagId))
        else
            setSelectedTags(selectedTags.concat(tagId))
    }

    return (
        <div className="w-[800px] flex flex-col">
            <div className="w-full h-fit flex overflow-x-scroll no-scrollbar">
                <Tab name="Upcoming" selected={selectedTab == null} onClick={()=>{setSelectedTab(null)}}/>
                {tabs.map((tab) => <Tab key={tab.id} name={tab.name} selected={selectedTab?.id == tab.id} onClick={()=>{setSelectedTab(tab)}}/>)}
            </div>
            <div className="flex h-96 pt-5">
                <div className=""></div>
                <div className="flex flex-col pt-2.5 px-5 gap-5 flex-grow items-center overflow-y-scroll">
                    {tasks.filter(task => selectedTab == null || task.tabs?.id == selectedTab.id).length == 0 &&
                        <h1 className="text-neutral-500">Click the ＋ button to start adding tasks.</h1>
                    }
                    {tasks
                        .filter(task => (selectedTab == null || task.tabs?.id == selectedTab.id) && (selectedTags.length == 0 || task.tags.some(tag => selectedTags.includes(tag.id))))
                        .map((task) => <Task key={task.id} task={task} onClick={() => {setModalTask(task)}} sync={sync}/>)
                    }
                </div>
                <div className="flex w-32 justify-center">
                    <button className="font-extralight h-10 w-10 rounded-full hover:bg-neutral-100 text-4xl transition-all" onClick={onAddTask}>＋</button>
                </div>
            </div>
            {modalTask && 
                <TaskModal
                    task={modalTask}
                    tabList={tabList} 
                    tagList={tagList}
                    newTask={modalTask.id == -1}
                    onClose={() => setModalTask(null)}
                    sync={sync}
                />
            }
        </div>
    )
}