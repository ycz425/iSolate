import { createClient } from "@/utils/supabase/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function getTags() {
    const supabase = createClient()
    const { user } = await getSession()
    const { data, error } = await supabase.from("tags").select("id, name, color").eq("user_id", user.sub)

    return data
}