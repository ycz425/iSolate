import clsx from "clsx"

interface CheckBoxProps {
    onClick: () => void
}

export default function CheckBox({ onClick }: CheckBoxProps) {
    return (
        <button className={clsx("border border-black h-9 w-9 rounded-full")} onClick={onClick}></button>
    )
}