import { Tag as TagInterface } from "@/app/types"
import Tag from "./Tag"

interface TagMenuProps {
    selectedTags: number[],
    tagList: TagInterface[],
    onTagClick: (tagId: number) => void
}

export default function TagMenu({ selectedTags, tagList, onTagClick }: TagMenuProps) {

    return (
        <div className="flex flex-col p-3 w-full h-fit overflow-y-scroll gap-2">
            {tagList.map((tag) => <Tag key={tag.id} tag={tag} colored={selectedTags.some(selectedTag => selectedTag == tag.id)} onClick={() => {onTagClick(tag.id)}}/>)}
        </div>
    )
}