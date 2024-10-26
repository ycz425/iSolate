"use client"

import { Tab as TabInterface, Task as TaskInterface, Tag as TagInterface } from "../../types"
import { useEffect, useState, useRef } from "react"
import Tab from "./Tab"
import Task from "./Task"
import { getTasks } from "@/app/actions/taskActions"

import TagMenu from "./TagMenu"
import TaskModal from "./TaskModal"
import TagPopup from "./TagPopup"
import { getTags } from "@/app/actions/tagActions"

interface TaskManagerProps {
    tabList: TabInterface[],
    taskList: TaskInterface[]
    tagList: TagInterface[]
}

export default function TaskManager({ tabList, taskList, tagList }: TaskManagerProps) {

    const [tabs, setTabs] = useState(tabList)
    const [selectedTab, setSelectedTab] = useState<TabInterface | null>(null)
    const [tasks, setTasks] = useState(taskList)
    const [tags, setTags] = useState(tagList)
    const [selectedTags, setSelectedTags] = useState<number[]>([])

    const [modalTask, setModalTask] = useState<TaskInterface | null>(null)
    const [popupTag, setPopupTag] = useState<TagInterface | null>(null)

    const tagPopupRef = useRef<HTMLFormElement>(null)
    const openTagPopupRef = useRef<HTMLDivElement>(null)

    const onAddTask = () => {
        const date = new Date()
        setModalTask({id: -1, name: "New Task", tabs: selectedTab, description: "", deadline: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`, tags: []})
    }

    const syncTasks = async () => {
        setTasks(await getTasks())
    }

    const syncTaskTags = async () => {
        const tags = await getTags()
        const tasks = await getTasks()
        setTags(tags)
        setTasks(tasks)
    }

    const onTagSelect = (tagId: number) => {
        if (selectedTags.includes(tagId))
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag != tagId))
        else
            setSelectedTags(selectedTags.concat(tagId))
    }

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (popupTag && !tagPopupRef.current?.contains(target) && openTagPopupRef.current != target)
                setPopupTag(null)
        }

        if (popupTag)
            document.addEventListener("mousedown", handleMouseDown)
        else
            document.removeEventListener("mousedown", handleMouseDown)

        return () => {
            document.removeEventListener("mousedown", handleMouseDown)
        }
    }, [popupTag])

    const filteredTasks = tasks.filter(task =>
        (selectedTab == null || task.tabs?.id == selectedTab.id)
        && (selectedTags.length == 0 || task.tags.some(tag => selectedTags.includes(tag.id)))
    )

    return (
        <div className="w-[800px] flex flex-col">
            <div className="w-full h-fit flex overflow-x-scroll no-scrollbar">
                <Tab name="Upcoming" selected={selectedTab == null} onClick={()=>{setSelectedTab(null)}}/>
                {tabs.map((tab) => <Tab key={tab.id} name={tab.name} selected={selectedTab?.id == tab.id} onClick={()=>{setSelectedTab(tab)}}/>)}
            </div>
            <div className="flex h-96">
                <div className="w-36 h-fit min-h-40 my-5 border-r border-neutral-300 flex flex-col items-end pr-5 py-3 gap-3 relative">
                    <TagMenu selectedTags={selectedTags} tagList={tags} onTagClick={onTagSelect} onEditClick={(tag) => setPopupTag(tag)}/>
                    <div
                        className="flex justify-center items-center w-fit h-7 p-2 rounded-full text-xs hover:cursor-pointer relative transition-all bg-neutral-100 hover:bg-neutral-200"
                        onClick={() => {setPopupTag({id: -1, name: "New Tag", color: "none"})}}
                        ref={openTagPopupRef}
                    >
                        ＋ add tag
                    </div>
                    {popupTag &&
                        <TagPopup
                            ref={tagPopupRef}
                            tag={popupTag}
                            onClose={() => {setPopupTag(null)}}
                            sync={syncTaskTags}
                        />}
                </div>
                <div className="flex flex-col py-5 pl-10 pr-5 gap-5 flex-grow items-center overflow-y-scroll no-scrollbar">
                    {filteredTasks.length == 0 &&
                        <h1 className="text-neutral-500">Click the "＋ Add" button to start adding tasks.</h1>
                    }
                    {filteredTasks.map((task) => <Task key={task.id} task={task} onClick={() => {setModalTask(task)}} sync={syncTasks}/>)}
                </div>
                <div className="flex flex-col w-32 items-start pt-3">
                    <button className="flex justify-center items-center h-10 w-fit p-3 rounded-full text-md bg-neutral-100 hover:bg-black hover:text-white transition-all" onClick={onAddTask}>＋ Add Task</button>
                </div>
            </div>
            {modalTask && 
                <TaskModal
                    task={modalTask}
                    tabList={tabList} 
                    defaultTags={selectedTags}
                    tagList={tags}
                    onClose={() => setModalTask(null)}
                    sync={syncTasks}
                />
            }
        </div>
    )
}