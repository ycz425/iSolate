import { BackgroundColors } from "@/app/color";
import { Tag as TagInterface } from "@/app/types";
import { useState } from "react";
import Tag from "./Tag";
import clsx from "clsx";

interface MiniTagProps {
    tag: TagInterface
    show: boolean
}

export default function MiniTag({ tag, show }: MiniTagProps) {
    const [showDetail, setShowDetail] = useState(false)

    return (
        <div>
            <div
                className={clsx("rounded-full transition-all duration-500 " + BackgroundColors[tag.color], {"w-0 h-0": !show, "w-3 h-3": show})}
                onMouseEnter={() => setShowDetail(true)}
                onMouseLeave={() => setShowDetail(false)}
            />
            <div className={clsx("absolute -translate-y-5 translate-x-4", {"hidden": !showDetail})}>
                <Tag tag={tag} colored={true}/>
            </div>
        </div>

    )
}