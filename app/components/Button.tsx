"use client";

import clsx from "clsx"
import { useRouter } from "next/navigation"

interface ButtonProps {
    content: string,
    color: "outline" | "colored",
    href?: string
}

export default function Button({ content, color, href }: ButtonProps) {
    const router = useRouter()

    return (
        <a className={clsx("h-16 w-80 flex rounded-xl text-2xl items-center justify-center", {
            "bg-transparent text-black border border-black": color == "outline",
            "bg-black text-white": color == "colored"
        })} href={href}>
            {content}
        </a>
    )
}