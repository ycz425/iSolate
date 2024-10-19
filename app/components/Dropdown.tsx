interface DropdownProps {
    options: { name: string, value: number}[],
    onChange: (value: any) => void
}

export default function Dropdown({ options, onChange }: DropdownProps) {
    return (
          <select className="border-b border-neutral-300 w-1/3 text-lg outline-none focus:border-black hover:cursor-pointer" onChange={(event) => onChange(event.target.value)}>
            {options.map((option) => <option key={option.value} value={option.value}>{option.name}</option>)}
          </select>
      )
}