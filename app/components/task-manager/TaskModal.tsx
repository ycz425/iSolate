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
            <div className="w-[600px] h-[400px] flex flex-col p-10 gap-5 bg-white rounded-2xl">
                <div
                    className="text-3xl h-10 text-nowrap overflow-hidden border-b border-neutral-300 focus:border-black outline-none"
                    contentEditable
                    suppressContentEditableWarning
                    onKeyDown={onKeyDown}
                    onInput={onNameInput}
                >
                    {task.name}
                </div>
                <div className="flex gap-10">
                    <Dropdown
                        options={tabList.map((tab) => { return { name: tab.name, value: tab.id }})}
                        onChange={onChange}
                    />
                    <input type="date" className="outline-none border-b border-neutral-300 focus:border-black"/>
                </div>
                <div
                    className="w-full h-48 text-sm text-neutral-500 border border-neutral-300 p-5 rounded-xl outline-none overflow-y-scroll focus:border-black"
                    contentEditable
                    onInput={onDescriptionInput}
                >
                    {task.description}
                </div>
            </div>
        </div>
    ), document.body)
}