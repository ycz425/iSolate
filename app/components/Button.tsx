"use client";

import clsx from "clsx"

interface ButtonProps {
    content: string,
    color: "outline" | "colored"
    onClick: () => void
}

export default function Button({ content, color = "colored", onClick }: ButtonProps) {
    return (
        <button className={clsx("h-16 w-80 rounded-xl text-2xl", {
            "bg-transparent text-black border border-black": color == "outline",
            "bg-black text-white": color == "colored"
        })} onClick={onClick}>
            {content}
        </button>
    )
}