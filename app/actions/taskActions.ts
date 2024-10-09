"use server"

import { createClient } from "@/utils/supabase/server"
import { getSession } from "@auth0/nextjs-auth0"

// TODO: handle errors and server-side form validation <3 (look at nextjs docs for server action)
// TODO: implement user authorization measures

export async function getTasks(tabId?: number, tagIds?: number[]) {
    const supabase = createClient() // check if service role key is needed
    const { user } = await getSession()
    const {data, error} = await supabase.from("tasks").select("id, tabs(id, name), name, description, deadline, tags(id, name, color)").eq("user_id", user.sub).is("completed", null)

    return data
}

export async function setComplete(taskId: number) {
    const supabase = createClient()
    const { user } = await getSession()
    const date = new Date()
    await supabase.from("tasks").update({completed: date.toISOString()}).eq("user_id", user.sub).eq("id", taskId)
}

export async function addTask(name: string, description?: string, tabId?: number, deadline?: Date) {
    const supabase = createClient()
    const { user } = await getSession()

    await supabase.from("tasks").insert({user_id: user.sub, name: name, description: description, tab_id: tabId, deadline: deadline})
}