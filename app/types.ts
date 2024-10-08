export interface Tab {
    id: number,
    name: string
}

export interface Task {
    id: number,
    tab_id: number | null,
    name: string,
    description: string | null,
    deadline: Date | null
}