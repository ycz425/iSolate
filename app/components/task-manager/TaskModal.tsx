import { createPortal } from "react-dom";
import { Task, Tab, Tag as TagInterface, TaskFormData, TaskSchema } from "@/app/types";
import { useState, useEffect, useRef } from 'react'
import Button from "../Button"
import Dropdown from "../Dropdown"
import Tag from "./Tag";
import Image from "next/image";
import { upsertTask, deleteTask } from "@/app/actions/taskActions";
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx";
import TagMenu from "./TagMenu";

interface TaskModalProps {
    task: Task
    defaultTags: number[]
    tabList: Tab[]
    tagList: TagInterface[]
    onClose: () => void
    sync: () => void
}

export default function TaskModal({ task, defaultTags, tabList, tagList, onClose, sync }: TaskModalProps) {
    const [showTagMenu, setShowTagMenu] = useState(false)
    const tagMenuRef = useRef<HTMLDivElement>(null)
    const openTagMenuRef = useRef<HTMLImageElement>(null)
    const [pending, setPending] = useState(false)

    const { setValue, handleSubmit, getValues, control, formState: { errors } } = useForm<TaskFormData>({
        defaultValues: {
            "id": task.id != -1 ? task.id : undefined,
            "name": task.name,
            "tab": task.tabs?.id || null,
            "description": task.description,
            "deadline": task.deadline,
            "tags": task.id != -1 ? task.tags.map((tag) => tag.id) : defaultTags
        } as TaskFormData,
        resolver: zodResolver(TaskSchema)
    })
    const watch = useWatch({control: control, name: "tags"})
    
    const onTabChange = (value: number) => {
        if (value == -1)
            setValue("tab", null)
        else
            setValue("tab", Number(value))
    }

    const onNameInput = (event: React.FormEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement
        setValue("name", target.innerText)
    }

    const onNameBlur = (event: React.FormEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement
        target.innerHTML = target.innerHTML.replace(/&nbsp;/g, ' ').trim()
    }

    const onDescriptionInput = (event: React.FormEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement
        setValue("description", target.innerText)
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key == "Enter") {
            const target = event.target as HTMLDivElement
            target.blur()
        }
    }

    const onTagClick = (tagId: number) => {
        if (getValues().tags.some(tag => tag == tagId))
            setValue("tags", getValues().tags.filter(tag => tag != tagId))
        else
            setValue("tags", [...getValues().tags, tagList.find(tag => tag.id == tagId)!.id])
    }

    const onSave = async (data: TaskFormData) => {
        setPending(true)
        await upsertTask(data)
        await sync()
        onClose()
        setPending(false)
    }

    const onDelete = async () => {
        setPending(true)
        await deleteTask(task.id)
        await sync()
        onClose()
        setPending(false)
    }

    const onDeadlineChange = (event: React.FormEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        setValue("deadline", target.value != "" ? new Date(target.value).toISOString(): "")
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
            <form onSubmit={handleSubmit(onSave)} noValidate className="w-[600px] h-[530px] flex flex-col p-5 gap-4 bg-white rounded-2xl">
                <div>
                    <label id="name" className="text-xs text-neutral-500">Task</label>
                    <div
                        className="text-3xl h-10 text-nowrap overflow-hidden border-b border-neutral-300 focus:border-black outline-none"
                        contentEditable
                        aria-labelledby="name"
                        suppressContentEditableWarning
                        onKeyDown={onKeyDown}
                        onInput={onNameInput}
                        onBlur={onNameBlur}
                        spellCheck={false}
                    >
                        {task.name} 
                    </div>
                    <p className="text-xs text-red-600 h-3">{errors.name && errors.name.message}</p>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col w-1/3 justify-start">
                        <label id="category" className="text-xs text-neutral-500">Category</label>
                        <Dropdown
                            labelledBy="category"
                            options={[{name: "None", value: -1}].concat(tabList.map((tab) => { return { name: tab.name, value: tab.id } }))}
                            defaultValue={task.tabs?.id}
                            onChange={onTabChange}
                        />
                    </div>
                    <div className="flex flex-col justify-start">
                        <label id="deadline" className="text-xs text-neutral-500">Deadline</label>
                        <input
                            type="date"
                            aria-labelledby="deadline"
                            onKeyDown={onKeyDown}
                            defaultValue={task.deadline}
                            onChange={onDeadlineChange}
                            className="outline-none border-b border-neutral-300 focus:border-black"
                        />
                        <p className="text-xs text-red-600 h-3">{errors.deadline && errors.deadline.message}</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <label id="tags" className="text-xs text-neutral-500">Tags</label>
                    <div className="flex gap-3 pl-2">
                        <div className="relative">
                            <div className={clsx(
                                "w-8 h-8 flex justify-center items-center rounded-full hover:cursor-pointer transition-all",
                                {"bg-neutral-200": showTagMenu, "hover:bg-neutral-100": !showTagMenu}
                            )} onClick={() => setShowTagMenu(!showTagMenu)}>
                                <Image
                                    ref={openTagMenuRef}
                                    src="/images/edit.svg"
                                    alt="edit tags"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            {showTagMenu &&
                                <div ref={tagMenuRef} className="border border-neutral-300 flex flex-col w-28 h-fit max-h-48 rounded-xl py-2 px-3 gap-2 shadow-md bg-white absolute top-full">
                                    <TagMenu selectedTags={getValues().tags} tagList={tagList} onTagClick={onTagClick}/>
                                </div>
                            }
                        </div>
                        <div className="h-8 w-fit items-center flex gap-2 overflow-x-scroll no-scrollbar">
                            {
                                tagList
                                    .filter(tag => getValues().tags.some(tagId => tag.id == tagId))
                                    .map((tag, index) => <Tag key={index} tag={tag} colored={false}/>)
                            }
                        </div>
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
                    <Button type="button" content="Cancel" style="outline" size="md" onClick={onClose}/>
                    <Button type="submit" content={task.id == -1 ? "Create" : "Save"} style="colored" size="md"/>
                    {task.id != -1 && <Button type="button" content="Delete" style="colored" color="red" size="md" onClick={onDelete}/>}
                </div>
            </form>
            {pending && <div className="bg-white opacity-50 rounded-2xl w-[600px] h-[525px] absolute"></div>}
        </div>
    ), document.body)
}