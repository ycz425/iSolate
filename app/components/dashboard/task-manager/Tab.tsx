import clsx from "clsx"
import { Tab as TabInterface } from "@/app/types"
import { upsertTab } from "@/app/actions/tabActions"
import { useState } from "react"

interface TabProps {
    tab: TabInterface,
    selected: boolean,
    editable?: boolean,
    onClick: () => void
    onDelete?: () => void
    sync?: () => void
}

export default function Tab({tab, selected, editable = false, onClick, onDelete = () => {}, sync = () => {} }: TabProps) {

    const [focused, setFocused] = useState(false)

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement
        if (event.key == "Enter") {
            event.preventDefault()
            target.blur()
        }
    }

    const onBlur = async (event: React.FormEvent<HTMLDivElement>) => {
        setFocused(false)
        const target = event.target as HTMLDivElement
        target.innerHTML = target.innerHTML.replace(/&nbsp;/g, ' ').trim()
        target.scrollLeft = 0
        if (target.innerHTML != "") {
            await upsertTab({id: tab.id, name: target.innerHTML})
            await sync()
        } else {
            target.innerHTML = tab.name
        }
    }

    return (
        <div
            className={clsx(
                "h-10 w-40 flex shrink-0 items-end text-lg border-b-[1.5px] px-3 transition-all relative",
                {"border-black cursor-auto": selected && editable, "border-black cursor-default select-none": selected && !editable, "border-neutral-300 hover:border-neutral-400 cursor-pointer": !selected})
            }
            onClick={onClick}
            onKeyDown={onKeyDown}
            spellCheck={false}
        >
            <p
                className={clsx("w-full text-center justify-self-center outline-none overflow-hidden text-nowrap", {"text-ellipsis": !focused})}
                suppressContentEditableWarning contentEditable={selected && editable}
                onBlur={onBlur}
                onFocus={() => {setFocused(true)}}
            >
                {tab.name}
            </p>
            {selected && tab.id != -1 && <button className="flex justify-center items-center rounded-md w-5 h-5 text-neutral-300 transition-all absolute top-1/3 end-2 hover:bg-neutral-100 hover:text-neutral-500" onClick={onDelete}>×</button>}
        </div>
    )
}