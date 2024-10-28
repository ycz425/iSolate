interface DropdownProps {
    labelledBy: string,
    options: { name: string, value?: number}[],
    defaultValue?: number
    onChange: (value: string) => void
}

export default function Dropdown({ labelledBy, options, defaultValue, onChange }: DropdownProps) {
    return (
          <select
              aria-labelledby={labelledBy}
              className="border-b border-neutral-300 w-full text-lg outline-none focus:border-black hover:cursor-pointer"
              onChange={(event) => onChange(event.target.value)}
              defaultValue={defaultValue}
          >
              {options.map((option) => <option key={option.value} value={option.value}>{option.name}</option>)}
          </select>
    )
}