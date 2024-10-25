import { setComplete } from "@/app/actions/taskActions"
import { Task as TaskInterface } from "@/app/types" 
import { BackgroundColors } from "@/app/color"
import clsx from "clsx"
import { useState } from "react"

interface TaskProps {
    task: TaskInterface
    onClick: () => void
    sync: () => void
}

export default function Task({ task, onClick, sync }: TaskProps) {

    const [show, setShow] = useState(true)
    const [checkboxHover, setCheckboxHover] = useState(false)

    const onComplete = (event: React.FormEvent<HTMLDivElement>) => {
        event.stopPropagation()
        setComplete(task.id)
        setShow(false)
    }

    return (
        <div className={clsx(
            "border border-black w-full flex shrink-0 rounded-2xl overflow-hidden items-center px-3 gap-5 hover:cursor-pointer transition-all duration-500",
            {"h-[80px] py-3": show, "h-0 py-0 border-0 -my-2.5 opacity-0" : !show}
        )} onClick={onClick} onTransitionEnd={sync}>
            <div className="flex justify-center items-center h-3/5 w-[32px]">
                <div
                    className="flex justify-center items-center border border-black h-full aspect-square rounded-full"
                    onClick={onComplete}
                    onMouseEnter={() => setCheckboxHover(true)}
                    onMouseLeave={() => setCheckboxHover(false)}
                >
                    <div className={clsx("h-2/3 w-2/3 rounded-full", {"bg-neutral-300": checkboxHover && show, "bg-black": !show})}></div>
                </div>
            </div>
            <div className="flex flex-col w-4/5">
                <p className="text-xl">{task.name}</p>
                <div className="flex flex-row gap-8">
                    {task.tabs ? <p className="text-sm text-neutral-500">{task.tabs.name}</p> : null}
                    <p className="text-sm text-neutral-500">
                        {new Intl.DateTimeFormat("en-US", {dateStyle: "full", timeZone: "UTC"}).format(new Date(task.deadline))}
                    </p>
                </div>
            </div>
            <div className="flex flex-col h-full gap-1">
                {task.tags.map((tag, index)=> <div key={index} className={"rounded-full w-3 h-3 " + (BackgroundColors[tag.color] || "border border-black")}></div>)}
            </div>
        </div>
    )
}