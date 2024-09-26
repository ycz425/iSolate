"use client";

import clsx from "clsx"
import { useRouter } from "next/navigation"

interface ButtonProps {
    content: string,
    color: "outline" | "colored",
    onClick?: string | (() => void)
    formAction?: ((formData: FormData) => void | Promise<void>)
}

export default function Button({ content, color, onClick, formAction }: ButtonProps) {
    const router = useRouter()

    const handleClick = () => {
        if (typeof onClick == "string")
            router.push(onClick)
        else if (typeof onClick == "function")
            onClick()
    }

    return (
        <button className={clsx("h-16 w-80 rounded-xl text-2xl", {
            "bg-transparent text-black border border-black": color == "outline",
            "bg-black text-white": color == "colored"
        })} onClick={handleClick} formAction={formAction}>
            {content}
        </button>
    )
}