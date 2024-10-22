import { z, ZodType } from 'zod'

export type Color = "red" | "blue"

export interface Tab {
    id: number,
    name: string
}

export interface Tag {
    id: number,
    name: string,
    color: Color
}

export interface Task {
    id: number,
    name: string,
    tabs: Tab | null,
    description: string,
    deadline: string
    tags: Tag[]
}

export type TaskFormData = {
    id?: number,
    name: string,
    tab: number | null,
    description: string,
    deadline: string,
    tags: number[]
}

export const TaskSchema: ZodType<TaskFormData> = z
    .object({
        id: z.union([z.number(), z.undefined()]),
        name: z.string().min(1, {message: "Task name is required"}),
        tab: z.union([z.number().positive(), z.null()]),
        description: z.string(),
        deadline: z.string().min(1, {message: "Deadline date is invalid"}),
        tags: z.array(z.number().positive())
    })
