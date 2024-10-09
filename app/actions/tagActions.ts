import { createClient } from "@/utils/supabase/server";
import { getSession } from "@auth0/nextjs-auth0";

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