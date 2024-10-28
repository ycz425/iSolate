import { Tag as TagInterface } from "@/app/types"
import Tag from "./Tag"
import { useState } from "react"
import clsx from "clsx"
import Image from "next/image"

interface TagMenuProps {
    selectedTags: number[],
    tagList: TagInterface[],
    onTagClick: (tagId: number) => void
    onEditClick?: (tag: TagInterface) => void
}

export default function TagMenu({ selectedTags, tagList, onTagClick, onEditClick }: TagMenuProps) {

    const [hoveredTagId, setHoveredTagId] = useState<number | null>(null)
    return (
        <div className="flex flex-col items-center w-full h-fit max-h-48 overflow-y-scroll gap-2 no-scrollbar">
            {tagList.map((tag) => onEditClick ? 
                <div
                    key={tag.id}
                    className="flex pr-5 justify-end gap-1 w-full"
                    onMouseEnter={() => {setHoveredTagId(tag.id)}}
                    onMouseLeave={() => {setHoveredTagId(null)}}
                >
                    {hoveredTagId == tag.id &&
                        <div className="w-7 h-7 flex justify-center items-center rounded-full hover:bg-neutral-100 hover:cursor-pointer select-none transition-all" onClick={() => {onEditClick(tag)}}>
                            <Image
                                src="/images/edit.svg"
                                alt={`edit ${tag.name} tag`}
                                width={15}
                                height={15}
                            />
                        </div>
                    }
                    <Tag tag={tag} colored={selectedTags.some(selectedTag => selectedTag == tag.id)} onClick={() => {onTagClick(tag.id)}}/>
                </div>
                : <Tag key={tag.id} tag={tag} colored={selectedTags.some(selectedTag => selectedTag == tag.id)} onClick={() => {onTagClick(tag.id)}}/>
            )}
            {tagList.length == 0 && <h1 className="text-neutral-500 text-center text-xs">No tags available</h1>}
        </div>
    )
}