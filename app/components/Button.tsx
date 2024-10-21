"use client";

import clsx from "clsx"
import { useRouter } from "next/navigation"
import { Color } from "../types";
import { TextColors, BorderColors, BackgroundColors} from "../color";

interface ButtonProps {
    content: string,
    color?: Color,
    style: "colored" | "outline"
    size: "lg" | "md"
    href?: string
    onClick?: () => void
}

export default function Button({ content, color, style, size, href, onClick }: ButtonProps) {
    const router = useRouter()

    return (
        <a className={clsx("flex rounded-xl items-center justify-center hover:cursor-pointer", {
            "bg-transparent text-black border border-black": !color && style == "outline",
            "bg-black text-white": !color && style == "colored",
            ["bg-transparent " + TextColors[color!] + " border " + BorderColors[color!]]: color && style == "outline",
            [BackgroundColors[color!] + " text-white"]: color && style == "colored",
            "h-16 w-80 text-2xl": size == "lg",
            "h-9 w-20 ": size == "md"
        })} href={href} onClick={onClick}>
            {content}
        </a>
    )
}