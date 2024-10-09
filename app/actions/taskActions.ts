"use server"

import { createClient } from "@/utils/supabase/server"
import { getSession } from "@auth0/nextjs-auth0"
import { Task } from "../types" 

export async function getTasks(tabId?: number, tagIds?: number[]) {
    const supabase = createClient() // check if service role key is needed
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const {data, error} = await supabase.from("tasks").select("id, tabs(id, name), name, description, deadline, tags(id, name, color)").eq("user_id", session.user.sub).is("completed", null)

    if (error)
        throw new Error(`Supabase error: ${error.message}`)

    return data as unknown as Task[]
    
}

export async function setComplete(taskId: number) {
    const supabase = createClient()
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const { error } = await supabase.from("tasks").update({completed: new Date().toISOString()}).eq("user_id", session.user.sub).eq("id", taskId)

    if (error)
        throw new Error(`Supabase error: ${error.message}`)
}

// TODO: server-side form validation <3 (look at nextjs docs for server action)
export async function addTask(name: string, description?: string, tabId?: number, deadline?: Date) {
    const supabase = createClient()
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const { error } = await supabase.from("tasks").insert({user_id: session.user.sub, name: name, description: description, tab_id: tabId, deadline: deadline})

    if (error)
        throw new Error(`Supabase error: ${error.message}`)
}