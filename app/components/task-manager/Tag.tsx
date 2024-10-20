import clsx from 'clsx'
import { TextColors, BackgroundColors, BorderColors } from '@/app/color'
import { Tag as TagInterface } from '@/app/types'

interface TagProps {
    onClick?: () => void
    tag: TagInterface
    colored: boolean
}

export default function Tag({ onClick, tag, colored }: TagProps) {
    return (
        <div onClick={onClick} className={clsx(
            "w-20 h-7 text-xs text-ellipsis border rounded-md flex justify-center items-center shrink-0 " + BorderColors[tag.color],
            {
                [TextColors[tag.color]]: !colored,
                ["text-white " + BackgroundColors[tag.color]]: colored,
                "hover:cursor-pointer": onClick
            }
        )}>
            <p className="overflow-hidden text-ellipsis p-3">{tag.name}</p>
        </div>
    )
}