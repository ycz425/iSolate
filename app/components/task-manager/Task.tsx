import CheckBox from "./CheckBox"
import { setComplete } from "@/app/actions/taskActions"
import { Task as TaskInterface } from "@/app/types" 
import { BackgroundColors } from "@/app/color"

export default function Task({ id, name, tabs, description, deadline, tags }: TaskInterface) {
    const color = "#ff5735"
    return (
        <div className="border border-black h-[80px] w-full flex rounded-2xl items-center p-3 gap-5">
            <CheckBox onClick={() => {setComplete(id)}}/>
            <div className="flex flex-col w-4/5">
                <p className="text-xl">{name}</p>
                <div className="flex flex-row gap-8">
                    {tabs ? <p className="text-sm text-neutral-500">{tabs.name}</p> : null}
                    {deadline ? <p className="text-sm text-neutral-500">
                        {new Intl.DateTimeFormat("en-US", {dateStyle: "full"}).format(new Date(deadline))}
                    </p> : null}
                </div>
            </div>
            <div className="flex flex-col h-full gap-1">
                {tags.map((tag, index)=> <div key={index} className={"rounded-full w-3 h-3 " + (BackgroundColors[tag.color] || "border border-black")}></div>)}
            </div>
        </div>
    )
}