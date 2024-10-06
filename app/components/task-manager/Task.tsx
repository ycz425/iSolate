import CheckBox from "./CheckBox"
import { setComplete } from "@/app/actions/taskActions"

interface TaskProps {
    id: number
    name: string,
    tab?: string,
    description?: string,
    deadline?: Date
}

export default function Task({ id, name, tab, description, deadline }: TaskProps) {
    return (
        <div className="border border-black h-20 w-[550px] flex rounded-xl text-2xl items-center p-5 gap-5">
            <CheckBox onClick={() => {setComplete(id)}}/>
            {name}
        </div>
    )
}