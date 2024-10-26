import { Tag as TagInterface } from "@/app/types"
import Tag from "./Tag"
import { forwardRef } from 'react'
import { ForwardedRef } from "react"

interface TagPopupProps {
    selectedTags: number[],
    tagList: TagInterface[],
    onTagClick: (tagId: number) => void
}

export default forwardRef(({ selectedTags, tagList, onTagClick }: TagPopupProps, ref: ForwardedRef<HTMLDivElement>) => {

    return (
                <div ref={ref} className="border border-neutral-300 flex flex-col w-fit h-fit max-h-48 rounded-xl p-3 gap-2 shadow-md bg-white absolute">
                    <div className="flex flex-col w-fit h-fit overflow-y-scroll gap-2">
                        {tagList.map((tag) => <Tag key={tag.id} tag={tag} colored={selectedTags.some(selectedTag => selectedTag == tag.id)} onClick={() => {onTagClick(tag.id)}}/>)}
                    </div>
                </div>
    )
})