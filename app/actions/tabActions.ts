"use server"

import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0" // do we need to protect server actions?
import { createClient } from "@supabase/supabase-js"

export async function getTabs() {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!) // check if service role key is needed
    const { user } = await getSession()
    const {data, error} = await supabase.from("tabs").select("id, name").eq("user_id", user.sub)

    return data
}
