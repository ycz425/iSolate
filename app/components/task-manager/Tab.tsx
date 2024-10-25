import clsx from "clsx"

interface TabProps {
    name: string,
    selected: boolean,
    onClick: () => void
}

export default function Tab({ name, selected, onClick }: TabProps) {
    return (
        <button
            className={clsx(
                "h-10 w-40 flex shrink-0 justify-center items-end text-lg border-b-[1.5px] transition-all",
                {"border-black": selected, "border-neutral-300 hover:bg-neutral-100": !selected})
            }
            onClick={onClick}
        >
            {name}
        </button>
    )
}