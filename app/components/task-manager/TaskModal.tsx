import { createPortal } from "react-dom";
import { Task, Tab } from "@/app/types";
import { useState } from 'react'
import Button from "../Button"
import Dropdown from "../Dropdown"

interface TaskModalProps {
    task: Task | null
    tabList: Tab[]
}

export default function TaskModal({ task, tabList }: TaskModalProps) {
    const [tabSelection, setTabSelection] = useState(task?.tabs?.id)
    const [name, setName] = useState(task?.name)
    const [description, setDescription] = useState(task?.description)


    const onChange = (value: number) => {
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

    return task && createPortal((
        <div className="absolute inset-0 bg-neutral-500 bg-opacity-50 flex justify-center items-center">
            <div className="w-[600px] h-fit flex flex-col p-10 gap-5 bg-white rounded-2xl">
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
                            options={tabList.map((tab) => { return { name: tab.name, value: tab.id }})}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex flex-col justify-between">
                        <label id="deadline" className="text-xs text-neutral-500">Deadline</label>
                        <input type="datetime-local" aria-labelledby="deadline" className="outline-none border-b border-neutral-300 focus:border-black"/>
                    </div>
                </div>
                <div>
                    <label id="description" className="text-xs text-neutral-500">Description</label>
                    <div
                        className="w-full h-48 text-sm text-neutral-500 border border-neutral-300 p-5 rounded-xl outline-none overflow-y-scroll focus:border-black"
                        contentEditable
                        aria-labelledby="description"
                        onInput={onDescriptionInput}
                    >
                        {task.description}
                    </div>
                </div>
            </div>
        </div>
    ), document.body)
}