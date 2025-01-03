"use server"

import { createClient } from "@/utils/supabase/server"
import { getSession } from "@auth0/nextjs-auth0"
import { Task, TaskFormData } from "../types" 

export async function getTasks() {
    const supabase = createClient() // check if service role key is needed
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const {data, error} = await supabase.from("tasks").select("id, tabs(id, name), name, description, deadline, tags(id, name, color)").eq("user_id", session.user.sub).is("completed", null).order("deadline").order("created_at")

    if (error)
        throw new Error(`Supabase error: ${error.message}`)

    return data as unknown as Task[]
    
}


export async function upsertTask({ id, name, tab, description, deadline, tags }: TaskFormData) {
    const supabase = createClient()
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const { data, error: error1 } = await supabase.from("tasks").upsert({id: id, user_id: session.user.sub, name: name, tab_id: tab, description: description, deadline: deadline}).eq("id", id).eq("user_id", session.user.sub).select()
    if (error1)
        throw new Error(`Supabase error: ${error1.message}`)

    const { error: error2 } = await supabase.from("task_tag").delete().eq("task_id", data[0].id).not("tag_id", "in", `(${tags.toString()})`)
    if (error2)
        throw new Error(`Supabase error: ${error2.message}`)

    const {error: error3} = await supabase.from("task_tag").upsert(tags.map((tagId) => { return {"task_id": data[0].id, "tag_id": tagId} }))
    if (error3)
        throw new Error(`Supabase error: ${error3.message}`)
}


export async function deleteTask(id: number) {
    const supabase = createClient()
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const { error } = await supabase.from("tasks").delete().eq("id", id).eq("user_id", session.user.sub)
    if (error)
        throw new Error(`Supabase error: ${error.message}`)
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