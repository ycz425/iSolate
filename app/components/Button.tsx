"use client";

import clsx from "clsx"
import { useRouter } from "next/navigation"
import { Color } from "../types";
import { TextColors, BorderColors, BackgroundColors} from "../color";

interface ButtonProps {
    type?: "button" | "submit" | "reset"
    content: string,
    color?: Color,
    style: "colored" | "outline"
    size: "lg" | "md" | "sm"
    href?: string
    onClick?: () => void
}

export default function Button({ type, content, color, style, size, href, onClick }: ButtonProps) {
    const router = useRouter()

    return (
        href ? <a className={clsx("flex rounded-xl items-center justify-center hover:cursor-pointer", {
            "bg-transparent text-black border border-black": !color && style == "outline",
            "bg-black text-white": !color && style == "colored",
            ["bg-transparent " + TextColors[color!] + " border " + BorderColors[color!]]: color && style == "outline",
            [BackgroundColors[color!] + " text-white"]: color && style == "colored",
            "h-16 w-80 text-2xl rounded-xl": size == "lg",
            "h-9 w-20 rounded-xl": size == "md",
            "h-6 w-12 text-sm rounded-md": size == "sm"
        })} href={href} onClick={onClick}>
            {content}
        </a> :
        <button type={type} className={clsx("flex items-center justify-center hover:cursor-pointer", {
            "bg-transparent text-black border border-black": !color && style == "outline",
            "bg-black text-white": !color && style == "colored",
            ["bg-transparent " + TextColors[color!] + " border " + BorderColors[color!]]: color && style == "outline",
            [BackgroundColors[color!] + " text-white"]: color && style == "colored",
            "h-16 w-80 text-2xl rounded-xl": size == "lg",
            "h-9 w-20 rounded-xl": size == "md",
            "h-6 w-14 text-xs rounded-md": size == "sm"
        })}  onClick={onClick}>
            {content}
        </button>
    )
}