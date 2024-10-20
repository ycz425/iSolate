import { Tag as TagInterface } from "@/app/types"
import Tag from "./Tag"
import { forwardRef } from 'react'
import { ForwardedRef } from "react"

interface TagMenuProps {
    taskTags: TagInterface[],
    tagList: TagInterface[],
    onTagClick: (tagId: number) => void
}

export default forwardRef(({ taskTags, tagList, onTagClick }: TagMenuProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
            <div ref={ref} className="border border-neutral-300 flex flex-col w-fit h-fit max-h-48 rounded-xl p-3 gap-2 shadow-md bg-white absolute">
                <div className="flex flex-col w-fit h-fit overflow-y-scroll gap-2">
                    {tagList.map((tag, index) => <Tag key={index} tag={tag} colored={taskTags.some(taskTag => taskTag.id == tag.id)} onClick={() => {onTagClick(tag.id)}}/>)}
                </div>
            </div>
    )
})