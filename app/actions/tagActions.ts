"use server"

import { createClient } from "@/utils/supabase/server";
import { getSession } from "@auth0/nextjs-auth0";
import { TagFormData } from "../types";

export async function getTags() {
    const supabase = createClient()
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const { data, error } = await supabase.from("tags").select("id, name, color").eq("user_id", session.user.sub)

    if (error)
        throw new Error(`Supabase error: ${error.message}`)

    return data
}

export async function upsertTag({id, name, color}: TagFormData) {
    const supabase = createClient()
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const { error } = await supabase.from("tags").upsert({id: id, user_id: session.user.sub, name: name, color: color}).eq("id", id).eq("user_id", session.user.sub)

    if (error)
        throw new Error(`Supabase error: ${error.message}`)
}

export async function deleteTag(id: number) {
    const supabase = createClient()
    const session = await getSession()

    if (!session)
        throw new Error("User is not authenticated")

    const { error } = await supabase.from("tags").delete().eq("id", id).eq("user_id", session.user.sub)

    if (error)
        throw new Error(`Supabase error: ${error.message}`)
}
