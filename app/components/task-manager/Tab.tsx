import clsx from "clsx"

interface TabProps {
    name: string,
    selected: boolean,
    onClick: () => void
}

export default function Tab({ name, selected, onClick }: TabProps) {
    return (
        <button className={clsx("h-10 w-40 flex shrink-0 justify-center items-end text-lg border-b", {"border-black": selected})} onClick={onClick}>
            {name}
        </button>
    )
}