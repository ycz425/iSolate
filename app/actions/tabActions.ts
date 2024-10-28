"use server"

import { getSession } from "@auth0/nextjs-auth0" // do we need to protect server actions?
import { createClient } from "@/utils/supabase/server"
import { TabFormData } from "../types"

export async function getTabs() {
    const supabase = createClient() // check if service role key is needed
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const { data, error } = await supabase.from("tabs").select("id, name").eq("user_id", session.user.sub).order("created_at")

    if (error)
        throw new Error(`Supabase error: ${error.message}`)

    return data
}

export async function upsertTab({id, name}: TabFormData) {
    const supabase = createClient()
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const { data, error } = await supabase.from("tabs").upsert({id: id, user_id: session.user.sub, name: name}).eq("id", id).eq("user_id", session.user.sub).select()

    if (error)
        throw new Error(`Supabase error: ${error.message}`)

    return data
}

export async function deleteTab(id: number) {
    const supabase = createClient()
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const { error } = await supabase.from("tabs").delete().eq("id", id).eq("user_id", session.user.sub)

    if (error)
        throw new Error(`Supabase error: ${error.message}`)
}
