export interface Tab {
    id: number,
    name: string
}

export interface Task {
    id: number,
    tab_id: number,
    name: string,
    description?: string,
    deadline?: Date
}