import { ForwardedRef, forwardRef, useState } from "react"
import { Color, Tag, TagFormData, TagSchema } from "@/app/types"
import { BackgroundColors, BackgroundColorsLight, BorderColors, TextColors } from "@/app/color"
import { useForm, useWatch } from "react-hook-form"
import Button from "../Button"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { deleteTag, upsertTag } from "@/app/actions/tagActions"

interface TagPopupProps {
    tag: Tag
    onClose: () => void
    sync: () => void
}

export default forwardRef(({ tag, onClose, sync }: TagPopupProps, ref: ForwardedRef<HTMLFormElement>) => {
    const colors: Color[] = ["fuchsia", "pink", "rose", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple"]
    const [pending, setPending] = useState(false)

    const { getValues, setValue, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            id: tag.id != -1 ? tag.id : undefined,
            name: tag.name,
            color: tag.color
        } as TagFormData,
        resolver: zodResolver(TagSchema)
    })
    const watch = useWatch({control: control, name: "color"})

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key == "Enter") {
            event.preventDefault()
            const target = event.target as HTMLElement
            target.blur()
        }
    }

    const onNameInput = (event: React.FormEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement
        setValue("name", target.innerHTML)
    }

    const onSave = async (data: TagFormData) => {
        setPending(true)
        await upsertTag(data)
        await sync()
        onClose()
        setPending(false)
    }

    const onDelete = async (tagId: number) => {
        setPending(true)
        await deleteTag(tagId)
        await sync()
        onClose()
        setPending(false)
    }

    return (
        <form ref={ref} onSubmit={handleSubmit(onSave)} className={`flex flex-col h-fit w-44 p-3 border bg-white rounded-xl shadow-md gap-3 absolute left-3/4 top-0 ${BorderColors[getValues().color]} ${BackgroundColorsLight[getValues().color]}`}>
            <div
                className={`outline-none text-md border-b h-fit overflow-hidden text-nowrap ${TextColors[getValues().color]} ${BorderColors[getValues().color]}`}
                contentEditable
                suppressContentEditableWarning
                onKeyDown={onKeyDown}
                onInput={onNameInput}
            >
                {tag.name}
            </div>
            {errors.name && <p className="text-red-500 text-xs -mt-3">{errors.name.message}</p>}
            <div className={"flex flex-row flex-wrap gap-2 border-b pb-3 " + BorderColors[getValues().color]}>
                {colors.map((color, index) => 
                    <div
                        key={index}
                        className={clsx(
                            "h-4 w-4 rounded-full hover:cursor-pointer " + BackgroundColors[color],
                            {"ring-2 ring-offset-2": color == getValues().color}
                        )}
                        onClick={() => setValue("color", color)}>
                    </div>
                )}
            </div>
            {errors.color && <p className="text-red-500 text-xs -my-3">{errors.color.message}</p>}
            <div className={"flex justify-end gap-2"}>
                <Button content={tag.id == -1 ? "add" : "save"} style="colored" size="sm" type="submit"/>
                {tag.id != -1 && <Button content="delete" style="colored" color="red" size="sm" type="button" onClick={() => {onDelete(tag.id)}}/>}
            </div>
            {pending && <div className="absolute bg-white opacity-50 w-full h-full top-0 left-0 rounded-xl "></div>}
        </form>
    )
})