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
import clsx from "clsx"
import { deleteTab, getTabs, upsertTab } from "@/app/actions/tabActions"

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

    const [loading, setLoading] = useState(false)
    const [triggerEffect, setTriggerEffect] = useState(false)

    const tagPopupRef = useRef<HTMLFormElement>(null)
    const tabBarRef = useRef<HTMLDivElement>(null)

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

    const syncTaskTabs = async () => {
        const tabs = await getTabs()
        const tasks = await getTasks()
        setTabs(tabs)
        setTasks(tasks)
    }

    const onTagSelect = (tagId: number) => {
        if (selectedTags.includes(tagId))
            setSelectedTags(selectedTags.filter(selectedTag => selectedTag != tagId))
        else
            setSelectedTags(selectedTags.concat(tagId))
    }

    const onAddNewTab = async () => {
        setLoading(true)
        const data = await upsertTab({name: "New Tab"})
        setTabs(await getTabs())
        setSelectedTab(data[0])
        setTriggerEffect(!triggerEffect)
        setLoading(false)
    }

    const onDeleteTab = async (tab: TabInterface) => {
        setLoading(true)
        await deleteTab(tab.id)
        await syncTaskTabs()
        setSelectedTab(null)
        if (tabBarRef.current)
            tabBarRef.current.scrollLeft = 0
        setLoading(false)
    }

    useEffect(() => {
        if (tabBarRef.current)
            tabBarRef.current.scrollLeft = tabBarRef.current.scrollWidth
    }, [triggerEffect])

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (popupTag && !tagPopupRef.current?.contains(target))
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
        <div className="w-[800px] flex flex-col left-1/2 -translate-x-1/2 bottom-0 absolute">
            <div ref={tabBarRef} className="w-full h-fit flex overflow-x-scroll no-scrollbar transition-all">
                <Tab tab={{id: -1, name: "Upcoming"}} selected={selectedTab == null} onClick={()=>{setSelectedTab(null)}}/>
                {
                    tabs.map((tab) => <Tab
                        key={tab.id}
                        tab={tab}
                        selected={selectedTab?.id == tab.id}
                        editable
                        onClick={() => {setSelectedTab(tab)}}
                        onDelete={() => {onDeleteTab(tab)}}
                        sync={syncTaskTabs}/>)
                }
                <div className="border-b-[1.5px] border-neutral-300 flex-grow"></div>
            </div>
            <div className="flex flex-row-reverse h-96">
                <div className="flex flex-col h-full w-full py-7 pl-10 pr-5 gap-5 items-center overflow-y-scroll no-scrollbar">
                    {filteredTasks.length == 0 &&
                        <h1 className="text-neutral-500">Press "+ Add new task" to start adding tasks.</h1>
                    }
                    {filteredTasks.map((task) => <Task key={task.id} task={task} onClick={() => {setModalTask(task)}} sync={syncTasks}/>)}
                </div>
                <div className="w-44 h-full my-5 border-r border-neutral-300 flex flex-col items-end py-3 gap-4">
                    <div className="flex flex-col w-full items-start border-b border-neutral-300">
                        <button
                            className="p-3 w-full text-start text-neutral-500 border-t border-neutral-300 text-sm hover:bg-neutral-100 transition-all"
                            onClick={onAddNewTab}
                        >
                            ＋ Add new tab
                        </button>
                        <button 
                            className="p-3 w-full text-start text-neutral-500 border-t border-neutral-300 text-sm hover:bg-neutral-100 transition-all"
                            onClick={onAddTask}
                        >
                                ＋ Add new task
                        </button>
                        <button
                            className="p-3 w-full text-start text-neutral-500 border-t border-neutral-300 text-sm hover:bg-neutral-100 transition-all"
                            onClick={() => {setPopupTag({id: -1, name: "New Tag", color: "none"})}}
                        >
                            ＋ Add new tag
                        </button>
                    </div>
                    <div className="w-full relative">
                        <TagMenu selectedTags={selectedTags} tagList={tags} onTagClick={onTagSelect} onEditClick={(tag) => setPopupTag(tag)}/>
                        {popupTag &&
                            <TagPopup
                                ref={tagPopupRef}
                                tag={popupTag}
                                onClose={() => {setPopupTag(null)}}
                                removeSelection={(id) => {setSelectedTags(selectedTags.filter(tagId => tagId != id))}}
                                sync={syncTaskTags}
                            />}
                    </div>
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
            {loading && <div className="w-full h-full bg-white absolute opacity-50"></div>}
        </div>
    )
}