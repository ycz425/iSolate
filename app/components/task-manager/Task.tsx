import CheckBox from "./CheckBox"
import { setComplete } from "@/app/actions/taskActions"
import { Task as TaskInterface } from "@/app/types" 
import { BackgroundColors } from "@/app/color"

interface TaskProps {
    task: TaskInterface
}

export default function Task({ task }: TaskProps) {
    return (
        <div className="border border-black h-[80px] w-full flex rounded-2xl items-center p-3 gap-5">
            <CheckBox onClick={() => {setComplete(task.id)}}/>
            <div className="flex flex-col w-4/5">
                <p className="text-xl">{task.name}</p>
                <div className="flex flex-row gap-8">
                    {task.tabs ? <p className="text-sm text-neutral-500">{task.tabs.name}</p> : null}
                    {task.deadline ? <p className="text-sm text-neutral-500">
                        {new Intl.DateTimeFormat("en-US", {dateStyle: "full"}).format(new Date(task.deadline))}
                    </p> : null}
                </div>
            </div>
            <div className="flex flex-col h-full gap-1">
                {task.tags.map((tag, index)=> <div key={index} className={"rounded-full w-3 h-3 " + (BackgroundColors[tag.color] || "border border-black")}></div>)}
            </div>
        </div>
    )
}