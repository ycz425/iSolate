"use server"

import { createClient } from "@supabase/supabase-js"
import { getSession } from "@auth0/nextjs-auth0"
import { revalidatePath } from "next/cache"

// TODO: handle errors

export async function getTasks(tabId?: number, tagIds?: number[]) {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!) // check if service role key is needed
    const { user } = await getSession()
    const {data, error} = await supabase.from("tasks").select("id, tab_id, name, description, deadline").is("completed", null)

    return data
}

export async function setComplete(taskId: number) {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const { user } = await getSession()
    const date = new Date()
    await supabase.from("tasks").update({completed: date.toISOString()}).eq("user_id", user.sub).eq("id", taskId)
}

export async function addTask(name: string, description?: string, tabId?: number, deadline?: Date) {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const { user } = await getSession()

    await supabase.from("tasks").insert({user_id: user.sub, name: name, description: description, tab_id: tabId, deadline: deadline})
}