import { createPortal } from "react-dom";
import { Task, Tab, Tag as TagInterface } from "@/app/types";
import { useState, useEffect, useRef } from 'react'
import Button from "../Button"
import Dropdown from "../Dropdown"
import Tag from "./Tag";
import TagMenu from "./TagMenu";
import Image from "next/image";
import { formatForInput } from "@/utils/formatDate";
import { upsertTask, deleteTask } from "@/app/actions/taskActions";

interface TaskModalProps {
    task: Task
    tabList: Tab[]
    tagList: TagInterface[]
    onClose: () => void
    newTask: boolean
}

export default function TaskModal({ task, tabList, tagList, onClose, newTask }: TaskModalProps) {
    const [tabSelection, setTabSelection] = useState(task.tabs?.id || null)
    const [name, setName] = useState(task.name)
    const [description, setDescription] = useState(task.description)
    const [tags, setTags] = useState(task.tags || [])
    const [deadline, setDeadline] = useState(task.deadline)
    const [showTagMenu, setShowTagMenu] = useState(false)

    const tagMenuRef = useRef<HTMLDivElement>(null)
    const openTagMenuRef = useRef<HTMLImageElement>(null)

    const onTabChange = (value: number) => {
        if (value == -1)
            setTabSelection(null)
        else
            setTabSelection(value)
    }

    const onNameInput = (event: React.FormEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement
        setName(target.innerText)
    }

    const onDescriptionInput = (event: React.FormEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement
        target.innerText != "" ? setDescription(target.innerText) : setDescription(null)
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key == "Enter") {
            const target = event.target as HTMLDivElement
            target.blur()
        }
    }

    const onTagClick = (tagId: number) => {
        if (tags?.some(tag => tag.id == tagId))
            setTags(tags.filter(tag => tag.id != tagId))
        else
            setTags([...tags, tagList.find(tag => tag.id == tagId) as TagInterface])
    }

    const onSave = async () => {
        await upsertTask(task.id != -1 ? task.id : undefined, name, tabSelection, description, deadline, tags.map((tag) => tag.id))
        onClose()
    }

    const onDelete = async () => {
        await deleteTask(task.id)
        onClose()
    }

    const onDeadlineChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        setDeadline(new Date(target.value).toISOString())
        console.log(deadline)
    }

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (showTagMenu && !tagMenuRef.current?.contains(target) && target != openTagMenuRef.current)
                setShowTagMenu(false)
        }

        if (showTagMenu)
            document.addEventListener("mousedown", handleMouseDown)
        else
            document.removeEventListener("mousedown", handleMouseDown)
    
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        }

    }, [showTagMenu])

    return createPortal((
        <div className="absolute inset-0 bg-neutral-500 bg-opacity-50 flex justify-center items-center">
            <form className="w-[600px] h-fit flex flex-col p-5 gap-4 bg-white rounded-2xl">
                <div>
                    <label id="name" className="text-xs text-neutral-500">Task</label>
                    <div
                        className="text-3xl h-10 text-nowrap overflow-hidden border-b border-neutral-300 focus:border-black outline-none"
                        contentEditable
                        aria-labelledby="name"
                        suppressContentEditableWarning
                        onKeyDown={onKeyDown}
                        onInput={onNameInput}
                    >
                        {task.name} 
                    </div>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col w-1/3 justify-between">
                        <label id="category" className="text-xs text-neutral-500">Category</label>
                        <Dropdown
                            labelledBy="category"
                            options={[{name: "None", value: -1}].concat(tabList.map((tab) => { return { name: tab.name, value: tab.id } }))}
                            defaultValue={task.tabs?.id}
                            onChange={onTabChange}
                        />
                    </div>
                    <div className="flex flex-col justify-between">
                        <label id="deadline" className="text-xs text-neutral-500">Deadline</label>
                        <input
                            type="date"
                            aria-labelledby="deadline"
                            onKeyDown={onKeyDown}
                            defaultValue={formatForInput(task.deadline)}
                            onChange={onDeadlineChange}
                            className="outline-none border-b border-neutral-300 focus:border-black"
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <label id="tags" className="text-xs text-neutral-500">Tags</label>
                    <div className="flex gap-3 pl-2">
                        <Image
                            ref={openTagMenuRef}
                            src="/images/edit.svg"
                            alt="edit tags"
                            width={20}
                            height={20}
                            className="hover:cursor-pointer"
                            onClick={() => setShowTagMenu(!showTagMenu)}
                        />
                        <div className="h-8 w-fit items-center flex gap-2 overflow-x-scroll no-scrollbar">
                            {
                                tagList
                                    .filter(tag => tags.some(taskTag => tag.id == taskTag.id))
                                    .map((tag, index) => <Tag key={index} tag={tag} colored={false}/>)
                            }
                        </div>
                    </div>
                    <div>
                        {showTagMenu &&
                            <div className="absolute">
                                <TagMenu ref={tagMenuRef} taskTags={tags} tagList={tagList} onTagClick={onTagClick}/>
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <label id="description" className="text-xs text-neutral-500">Description</label>
                    <div
                        className="w-full h-48 text-sm text-neutral-500 border border-neutral-300 p-3 rounded-xl outline-none overflow-y-scroll focus:border-black"
                        contentEditable
                        suppressContentEditableWarning
                        aria-labelledby="description"
                        onInput={onDescriptionInput}
                    >
                        {task.description}
                    </div>
                </div>
                <div className="flex justify-end gap-1">
                    <Button content="Cancel" style="outline" size="md" onClick={onClose}/>
                    <Button content={newTask ? "Create" : "Save"} style="colored" size="md" onClick={onSave}/>
                    {!newTask && <Button content="Delete" style="colored" color="red" size="md" onClick={onDelete}/>}
                </div>
            </form>
        </div>
    ), document.body)
}