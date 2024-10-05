import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { createClient } from "@supabase/supabase-js"

export async function getTabs() {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const session = await getSession()
    const {data, error} = await supabase.from("tabs").select().eq("user_id", session!.user.user_id)

    console.log(data)

    return {error: error, data: data}
}