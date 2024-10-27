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
        <div
            onClick={onClick}
            className={clsx(
                "w-20 h-7 text-xs border rounded-md flex justify-center items-center shrink-0 transition-all select-none " + BorderColors[tag.color],
                {
                    [TextColors[tag.color]]: !colored,
                    ["text-white " + BackgroundColors[tag.color]]: colored,
                    "hover:cursor-pointer": onClick
                }
            )}
        >
            <p className="overflow-hidden text-nowrap text-ellipsis px-1" spellCheck={false}>{tag.name}</p>
        </div>
    )
}