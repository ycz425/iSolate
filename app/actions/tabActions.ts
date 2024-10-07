"use server"

import { getSession } from "@auth0/nextjs-auth0" // do we need to protect server actions?
import { createClient } from "@/utils/supabase/server"

export async function getTabs() {
    const supabase = createClient() // check if service role key is needed
    const { user } = await getSession()
    const {data, error} = await supabase.from("tabs").select("id, name").eq("user_id", user.sub)

    return data
}
