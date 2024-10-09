export interface Tab {
    id: number,
    name: string
}

export interface Task {
    id: number,
    tab_id: number | null,
    name: string,
    description: string | null,
    deadline: string | null
}

export interface Tag {
    id: number,
    name: string,
    color: string
}