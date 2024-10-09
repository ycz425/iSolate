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
    description: string | null,
    deadline: string | null
    tags: Tag[]
}

