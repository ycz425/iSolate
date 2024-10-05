import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { createClient } from "@supabase/supabase-js"

export async function getTabs() {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const { user } = await getSession()
    const {data, error} = await supabase.from("tabs").select("id, name").eq("user_id", user.sub)

    return {error: error, data: data}
}